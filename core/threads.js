/**
 * zjie 2020年11月25日17:57:07
 */
'use strict';

/**
 * @name Blockly.Threads
 * @namespace
 */
goog.provide('Blockly.Threads');

goog.require('Blockly.Blocks');
goog.require('Blockly.constants');
goog.require('Blockly.Events');
goog.require('Blockly.Events.BlockChange');
goog.require('Blockly.Field');
goog.require('Blockly.Msg');
goog.require('Blockly.Names');
goog.require('Blockly.utils.xml');
goog.require('Blockly.Workspace');
goog.require('Blockly.Xml');


/**
 * Constant to separate thread names from variables and generated functions
 * when running generators.
 * @deprecated Use Blockly.PROCEDURE_CATEGORY_NAME
 */
Blockly.THREAD_CATEGORY_NAME = 'THREAD';
Blockly.Threads.NAME_TYPE = Blockly.THREAD_CATEGORY_NAME;

/**
 * The default argument for a threads_mutatorarg block.
 * @type {string}
 */
Blockly.Threads.DEFAULT_ARG = 'x';

/**
 * Thread block type.
 * @typedef {{
 *    getThreadCall: function():string,
 *    renameThread: function(string,string),
 *    getThreadDef: function():!Array
 * }}
 */
Blockly.Threads.ThreadBlock;


Blockly.Threads.allThreads = function(root) {
  var blocks = root.getAllBlocks(false);
  var threadsReturn = [];
  var threadsNoReturn = [];
  for (var i = 0; i < blocks.length; i++) {
    if (blocks[i].type !== 'state_def' && blocks[i].getThreadDef) {
      var threadBlock = /** @type {!Blockly.Threads.ThreadBlock} */ (
        blocks[i]);
      var tuple = threadBlock.getThreadDef();
      if (tuple) {
        if (tuple[2]) {
          threadsReturn.push(tuple);
        } else {
          threadsNoReturn.push(tuple);
        }
      }
    }
  }
  threadsNoReturn.sort(Blockly.Threads.procTupleComparator_);
  threadsReturn.sort(Blockly.Threads.procTupleComparator_);
  return [threadsNoReturn, threadsReturn];
};

Blockly.Threads.getThreadsOfNoReturn = function(workspace){
  var blocks = workspace.getAllBlocks(false);
  var threadsNoReturn = [];
  for (var i = 0; i < blocks.length; i++) {
    if ( blocks[i].getThreadDef) {
      var threadBlock = /** @type {!Blockly.Threads.ThreadBlock} */ (
        blocks[i]);
      var tuple = threadBlock.getThreadDef();
      if (tuple) {
        if (!tuple[2]) { // 没有return
          threadsNoReturn.push(threadBlock);
        } 
      }
    }
  }
  return threadsNoReturn;
}

/**
 * Comparison function for case-insensitive sorting of the first element of
 * a tuple.
 * @param {!Array} ta First tuple.
 * @param {!Array} tb Second tuple.
 * @return {number} -1, 0, or 1 to signify greater than, equality, or less than.
 * @private
 */
Blockly.Threads.procTupleComparator_ = function(ta, tb) {
  return ta[0].toLowerCase().localeCompare(tb[0].toLowerCase());
};

/**
 * Ensure two identically-named threads don't exist.
 * Take the proposed thread name, and return a legal name i.e. one that
 * is not empty and doesn't collide with other threads.
 * @param {string} name Proposed thread name.
 * @param {!Blockly.Block} block Block to disambiguate.
 * @return {string} Non-colliding name.
 */
Blockly.Threads.findLegalName = function(name, block) {
  if (block.isInFlyout) {
    // Flyouts can have multiple threads called 'do something'.
    return name;
  }
  name = name || Blockly.Msg['UNNAMED_KEY'] || 'unnamed';
  while (!Blockly.Threads.isLegalName_(name, block.workspace, block)) {
    // Collision with another thread.
    var r = name.match(/^(.*?)(\d+)$/);
    if (!r) {
      name += '2';
    } else {
      name = r[1] + (parseInt(r[2], 10) + 1);
    }
  }
  return name;
};

/**
 * Does this thread have a legal name?  Illegal names include names of
 * threads already defined.
 * @param {string} name The questionable name.
 * @param {!Blockly.Workspace} workspace The workspace to scan for collisions.
 * @param {Blockly.Block=} opt_exclude Optional block to exclude from
 *     comparisons (one doesn't want to collide with oneself).
 * @return {boolean} True if the name is legal.
 * @private
 */
Blockly.Threads.isLegalName_ = function(name, workspace, opt_exclude) {
  return !Blockly.Threads.isNameUsed(name, workspace, opt_exclude);
};

/**
 * Return if the given name is already a thread name.
 * @param {string} name The questionable name.
 * @param {!Blockly.Workspace} workspace The workspace to scan for collisions.
 * @param {Blockly.Block=} opt_exclude Optional block to exclude from
 *     comparisons (one doesn't want to collide with oneself).
 * @return {boolean} True if the name is used, otherwise return false.
 */
Blockly.Threads.isNameUsed = function(name, workspace, opt_exclude) {
  var blocks = workspace.getAllBlocks(false);
  // Iterate through every block and check the name.
  for (var i = 0; i < blocks.length; i++) {
    if (blocks[i] == opt_exclude) {
      continue;
    }
    if (blocks[i].getThreadDef) {
      var threadBlock = /** @type {!Blockly.Threads.ThreadBlock} */ (
        blocks[i]);
      var procName = threadBlock.getThreadDef();
      if (Blockly.Names.equals(procName[0], name)) {
        return true;
      }
    }
  }
  return false;
};

/**
 * Rename a thread.  Called by the editable field.
 * @param {string} name The proposed new name.
 * @return {string} The accepted name.
 * @this {Blockly.Field}
 */
Blockly.Threads.rename = function(name) {
  // Strip leading and trailing whitespace.  Beyond this, all names are legal.
  name = name.trim();

  var legalName = Blockly.Threads.findLegalName(name,
      /** @type {!Blockly.Block} */ (this.getSourceBlock()));
  var oldName = this.getValue();
  if (oldName != name && oldName != legalName) {
    // Rename any callers.
    var blocks = this.getSourceBlock().workspace.getAllBlocks(false);
    for (var i = 0; i < blocks.length; i++) {
      if (blocks[i].renameThread) {
        var threadBlock = /** @type {!Blockly.Threads.ThreadBlock} */ (
          blocks[i]);
        threadBlock.renameThread(
            /** @type {string} */ (oldName), legalName);
      }
    }

    //更新threadMap
    if(this.workspace_){
      var thread = this.workspace_.threadMap_.getThread(oldName);
      if(thread){
        thread.name = name;
      }
    }
  }
  return legalName;
};

/**
 * Construct the blocks required by the flyout for the thread category.
 * @param {!Blockly.Workspace} workspace The workspace containing threads.
 * @return {!Array.<!Element>} Array of XML block elements.
 */
Blockly.Threads.flyoutCategory = function(workspace) {
  var xmlList = [];
  var block = Blockly.utils.xml.createElement('block');
  block.setAttribute('type', 'threads_def');
  block.setAttribute('gap', 16);
  var nameField = Blockly.utils.xml.createElement('field');
  nameField.setAttribute('name', 'NAME');
  nameField.appendChild(Blockly.utils.xml.createTextNode('new Thread'));
  block.appendChild(nameField);
  xmlList.push(block); 

 
  if(Blockly.Blocks['thread_opr'] && workspace.threadMap_.getAllThreadsByType().length){
    var block = Blockly.utils.xml.createElement('block');
    block.setAttribute('type', 'thread_opr');
    block.setAttribute('gap', 16);
    xmlList.push(block);
  }

  return xmlList;
};

/**
 * Updates the thread mutator's flyout so that the arg block is not a
 * duplicate of another arg.
 * @param {!Blockly.Workspace} workspace The thread mutator's workspace. This
 *     workspace's flyout is what is being updated.
 * @private
 */
Blockly.Threads.updateMutatorFlyout_ = function(workspace) {
  var usedNames = [];
  var blocks = workspace.getBlocksByType('threads_mutatorarg', false);
  for (var i = 0, block; (block = blocks[i]); i++) {
    usedNames.push(block.getFieldValue('NAME'));
  }

  var xml = Blockly.utils.xml.createElement('xml');
  var argBlock = Blockly.utils.xml.createElement('block');
  argBlock.setAttribute('type', 'threads_mutatorarg');
  var nameField = Blockly.utils.xml.createElement('field');
  nameField.setAttribute('name', 'NAME');
  var argValue = Blockly.Variables.generateUniqueNameFromOptions(
      Blockly.Threads.DEFAULT_ARG, usedNames);
  var fieldContent = Blockly.utils.xml.createTextNode(argValue);

  nameField.appendChild(fieldContent);
  argBlock.appendChild(nameField);
  xml.appendChild(argBlock);

  workspace.updateToolbox(xml);
};

/**
 * Listens for when a thread mutator is opened. Then it triggers a flyout
 * update and adds a mutator change listener to the mutator workspace.
 * @param {!Blockly.Events.Abstract} e The event that triggered this listener.
 * @package
 */
Blockly.Threads.mutatorOpenListener = function(e) {
  if (e.type != Blockly.Events.UI || e.element != 'mutatorOpen' ||
      !e.newValue) {
    return;
  }
  var workspaceId = /** @type {string} */ (e.workspaceId);
  var block = Blockly.Workspace.getById(workspaceId)
      .getBlockById(e.blockId);
  var type = block.type;
  if (type != 'threads_defnoreturn' && type != 'threads_defreturn') {
    return;
  }
  var workspace = block.mutator.getWorkspace();
  Blockly.Threads.updateMutatorFlyout_(workspace);
  workspace.addChangeListener(Blockly.Threads.mutatorChangeListener_);
};

/**
 * Listens for changes in a thread mutator and triggers flyout updates when
 * necessary.
 * @param {!Blockly.Events.Abstract} e The event that triggered this listener.
 * @private
 */
Blockly.Threads.mutatorChangeListener_ = function(e) {
  if (e.type != Blockly.Events.BLOCK_CREATE &&
      e.type != Blockly.Events.BLOCK_DELETE &&
      e.type != Blockly.Events.BLOCK_CHANGE) {
    return;
  }
  var workspaceId = /** @type {string} */ (e.workspaceId);
  var workspace = /** @type {!Blockly.WorkspaceSvg} */
      (Blockly.Workspace.getById(workspaceId));
  Blockly.Threads.updateMutatorFlyout_(workspace);
};

/**
 * Find all the callers of a named thread.
 * @param {string} name Name of thread.
 * @param {!Blockly.Workspace} workspace The workspace to find callers in.
 * @return {!Array.<!Blockly.Block>} Array of caller blocks.
 */
Blockly.Threads.getCallers = function(name, workspace) {
  var callers = [];
  var blocks = workspace.getAllBlocks(false);
  // Iterate through every block and check the name.
  for (var i = 0; i < blocks.length; i++) {
    if (blocks[i].getThreadCall) {
      var threadBlock = /** @type {!Blockly.Threads.ThreadBlock} */ (
        blocks[i]);
      var procName = threadBlock.getThreadCall();
      // Thread name may be null if the block is only half-built.
      if (procName && Blockly.Names.equals(procName, name)) {
        callers.push(blocks[i]);
      }
    }
  }
  return callers;
};

/**
 * When a thread definition changes its parameters, find and edit all its
 * callers.
 * @param {!Blockly.Block} defBlock Thread definition block.
 */
Blockly.Threads.mutateCallers = function(defBlock) {
  var oldRecordUndo = Blockly.Events.recordUndo;
  var threadBlock = /** @type {!Blockly.Threads.ThreadBlock} */ (
    defBlock);
  var name = threadBlock.getThreadDef()[0];
  var xmlElement = defBlock.mutationToDom(true);
  var callers = Blockly.Threads.getCallers(name, defBlock.workspace);
  for (var i = 0, caller; (caller = callers[i]); i++) {
    var oldMutationDom = caller.mutationToDom();
    var oldMutation = oldMutationDom && Blockly.Xml.domToText(oldMutationDom);
    caller.domToMutation(xmlElement);
    var newMutationDom = caller.mutationToDom();
    var newMutation = newMutationDom && Blockly.Xml.domToText(newMutationDom);
    if (oldMutation != newMutation) {
      // Fire a mutation on every caller block.  But don't record this as an
      // undo action since it is deterministically tied to the thread's
      // definition mutation.
      Blockly.Events.recordUndo = false;
      Blockly.Events.fire(new Blockly.Events.BlockChange(
          caller, 'mutation', null, oldMutation, newMutation));
      Blockly.Events.recordUndo = oldRecordUndo;
    }
  }
};

/**
 * Find the definition block for the named thread.
 * @param {string} name Name of thread.
 * @param {!Blockly.Workspace} workspace The workspace to search.
 * @return {Blockly.Block} The thread definition block, or null not found.
 */
Blockly.Threads.getDefinition = function(name, workspace) {
  // Assume that a thread definition is a top block.
  var blocks = workspace.getTopBlocks(false);
  for (var i = 0; i < blocks.length; i++) {
    if (blocks[i].getThreadDef) {
      var threadBlock = /** @type {!Blockly.Threads.ThreadBlock} */ (
        blocks[i]);
      var tuple = threadBlock.getThreadDef();
      if (tuple && Blockly.Names.equals(tuple[0], name)) {
        return blocks[i];
      }
    }
  }
  return null;
};
