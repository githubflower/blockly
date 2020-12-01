/**
 * zjie 2020年11月25日17:57:07
 */
'use strict';

/**
 * @name Blockly.States
 * @namespace
 */
goog.provide('Blockly.States');

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
 * Constant to separate state names from variables and generated functions
 * when running generators.
 * @deprecated Use Blockly.PROCEDURE_CATEGORY_NAME
 */
Blockly.States.NAME_TYPE = Blockly.THREAD_CATEGORY_NAME;

/**
 * The default argument for a states_mutatorarg block.
 * @type {string}
 */
Blockly.States.DEFAULT_ARG = 'x';

/**
 * State block type.
 * @typedef {{
 *    getStateCall: function():string,
 *    renameState: function(string,string),
 *    getStateDef: function():!Array
 * }}
 */
Blockly.States.StateBlock;


Blockly.States.allStates = function(root) {
  var blocks = root.getAllBlocks(false);
  var statesReturn = [];
  var statesNoReturn = [];
  for (var i = 0; i < blocks.length; i++) {
    if (blocks[i].getStateDef) {
      var stateBlock = /** @type {!Blockly.States.StateBlock} */ (
        blocks[i]);
      var tuple = stateBlock.getStateDef();
      if (tuple) {
        if (tuple[2]) {
          statesReturn.push(tuple);
        } else {
          statesNoReturn.push(tuple);
        }
      }
    }
  }
  statesNoReturn.sort(Blockly.States.procTupleComparator_);
  statesReturn.sort(Blockly.States.procTupleComparator_);
  return [statesNoReturn, statesReturn];
};

Blockly.States.getStatesOfNoReturn = function(workspace){
  var blocks = workspace.getAllBlocks(false);
  var statesNoReturn = [];
  for (var i = 0; i < blocks.length; i++) {
    if ( blocks[i].getStateDef) {
      var stateBlock = /** @type {!Blockly.States.StateBlock} */ (
        blocks[i]);
      var tuple = stateBlock.getStateDef();
      if (tuple) {
        if (!tuple[2]) { // 没有return
          statesNoReturn.push(stateBlock);
        } 
      }
    }
  }
  return statesNoReturn;
}

/**
 * Comparison function for case-insensitive sorting of the first element of
 * a tuple.
 * @param {!Array} ta First tuple.
 * @param {!Array} tb Second tuple.
 * @return {number} -1, 0, or 1 to signify greater than, equality, or less than.
 * @private
 */
Blockly.States.procTupleComparator_ = function(ta, tb) {
  return ta[0].toLowerCase().localeCompare(tb[0].toLowerCase());
};

/**
 * Ensure two identically-named states don't exist.
 * Take the proposed state name, and return a legal name i.e. one that
 * is not empty and doesn't collide with other states.
 * @param {string} name Proposed state name.
 * @param {!Blockly.Block} block Block to disambiguate.
 * @return {string} Non-colliding name.
 */
Blockly.States.findLegalName = function(name, block) {
  if (block.isInFlyout) {
    // Flyouts can have multiple states called 'do something'.
    return name;
  }
  name = name || Blockly.Msg['UNNAMED_KEY'] || 'unnamed';
  while (!Blockly.States.isLegalName_(name, block.workspace, block)) {
    // Collision with another state.
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
 * Does this state have a legal name?  Illegal names include names of
 * states already defined.
 * @param {string} name The questionable name.
 * @param {!Blockly.Workspace} workspace The workspace to scan for collisions.
 * @param {Blockly.Block=} opt_exclude Optional block to exclude from
 *     comparisons (one doesn't want to collide with oneself).
 * @return {boolean} True if the name is legal.
 * @private
 */
Blockly.States.isLegalName_ = function(name, workspace, opt_exclude) {
  return !Blockly.States.isNameUsed(name, workspace, opt_exclude);
};

/**
 * Return if the given name is already a state name.
 * @param {string} name The questionable name.
 * @param {!Blockly.Workspace} workspace The workspace to scan for collisions.
 * @param {Blockly.Block=} opt_exclude Optional block to exclude from
 *     comparisons (one doesn't want to collide with oneself).
 * @return {boolean} True if the name is used, otherwise return false.
 */
Blockly.States.isNameUsed = function(name, workspace, opt_exclude) {
  var blocks = workspace.getAllBlocks(false);
  // Iterate through every block and check the name.
  for (var i = 0; i < blocks.length; i++) {
    if (blocks[i] == opt_exclude) {
      continue;
    }
    if (blocks[i].getStateDef) {
      var stateBlock = /** @type {!Blockly.States.StateBlock} */ (
        blocks[i]);
      var procName = stateBlock.getStateDef();
      if (Blockly.Names.equals(procName[0], name)) {
        return true;
      }
    }
  }
  return false;
};

/**
 * Rename a state.  Called by the editable field.
 * @param {string} name The proposed new name.
 * @return {string} The accepted name.
 * @this {Blockly.Field}
 */
Blockly.States.rename = function(name) {
  // Strip leading and trailing whitespace.  Beyond this, all names are legal.
  name = name.trim();

  var legalName = Blockly.States.findLegalName(name,
      /** @type {!Blockly.Block} */ (this.getSourceBlock()));
  var oldName = this.getValue();
  if (oldName != name && oldName != legalName) {
    // Rename any callers.
    var blocks = this.getSourceBlock().workspace.getAllBlocks(false);
    for (var i = 0; i < blocks.length; i++) {
      if (blocks[i].renameState) {
        var stateBlock = /** @type {!Blockly.States.StateBlock} */ (
          blocks[i]);
        stateBlock.renameState(
            /** @type {string} */ (oldName), legalName);
      }
    }

    //更新stateMap
    if(this.workspace_){
      var state = this.workspace_.stateMap_.getState(oldName);
      if(state){
        state.name = name;
      }
    }
  }
  return legalName;
};

/**
 * Construct the blocks required by the flyout for the state category.
 * @param {!Blockly.Workspace} workspace The workspace containing states.
 * @return {!Array.<!Element>} Array of XML block elements.
 */
Blockly.States.flyoutCategory = function(workspace) {
  var xmlList = [];
  
  var block = Blockly.utils.xml.createElement('block');
  block.setAttribute('type', 'state_def');
  block.setAttribute('gap', 16);
  var nameField = Blockly.utils.xml.createElement('field');
  nameField.setAttribute('name', 'NAME');
  nameField.appendChild(Blockly.utils.xml.createTextNode('state'));
  block.appendChild(nameField);
  xmlList.push(block); 

  var block = Blockly.utils.xml.createElement('block');
  block.setAttribute('type', 'state_trigger_event');
  block.setAttribute('gap', 16);
  xmlList.push(block);

 var states = workspace.stateMap_.getAllStatesByType();
  if(Blockly.Blocks['state_opr'] && states && states.length){
    var block = Blockly.utils.xml.createElement('block');
    block.setAttribute('type', 'state_opr');
    block.setAttribute('gap', 16);
    xmlList.push(block);
  }

  return xmlList;
};

/**
 * Updates the state mutator's flyout so that the arg block is not a
 * duplicate of another arg.
 * @param {!Blockly.Workspace} workspace The state mutator's workspace. This
 *     workspace's flyout is what is being updated.
 * @private
 */
Blockly.States.updateMutatorFlyout_ = function(workspace) {
  var usedNames = [];
  var blocks = workspace.getBlocksByType('states_mutatorarg', false);
  for (var i = 0, block; (block = blocks[i]); i++) {
    usedNames.push(block.getFieldValue('NAME'));
  }

  var xml = Blockly.utils.xml.createElement('xml');
  var argBlock = Blockly.utils.xml.createElement('block');
  argBlock.setAttribute('type', 'states_mutatorarg');
  var nameField = Blockly.utils.xml.createElement('field');
  nameField.setAttribute('name', 'NAME');
  var argValue = Blockly.Variables.generateUniqueNameFromOptions(
      Blockly.States.DEFAULT_ARG, usedNames);
  var fieldContent = Blockly.utils.xml.createTextNode(argValue);

  nameField.appendChild(fieldContent);
  argBlock.appendChild(nameField);
  xml.appendChild(argBlock);

  workspace.updateToolbox(xml);
};

/**
 * Listens for when a state mutator is opened. Then it triggers a flyout
 * update and adds a mutator change listener to the mutator workspace.
 * @param {!Blockly.Events.Abstract} e The event that triggered this listener.
 * @package
 */
Blockly.States.mutatorOpenListener = function(e) {
  if (e.type != Blockly.Events.UI || e.element != 'mutatorOpen' ||
      !e.newValue) {
    return;
  }
  var workspaceId = /** @type {string} */ (e.workspaceId);
  var block = Blockly.Workspace.getById(workspaceId)
      .getBlockById(e.blockId);
  var type = block.type;
  if (type != 'states_defnoreturn' && type != 'states_defreturn') {
    return;
  }
  var workspace = block.mutator.getWorkspace();
  Blockly.States.updateMutatorFlyout_(workspace);
  workspace.addChangeListener(Blockly.States.mutatorChangeListener_);
};

/**
 * Listens for changes in a state mutator and triggers flyout updates when
 * necessary.
 * @param {!Blockly.Events.Abstract} e The event that triggered this listener.
 * @private
 */
Blockly.States.mutatorChangeListener_ = function(e) {
  if (e.type != Blockly.Events.BLOCK_CREATE &&
      e.type != Blockly.Events.BLOCK_DELETE &&
      e.type != Blockly.Events.BLOCK_CHANGE) {
    return;
  }
  var workspaceId = /** @type {string} */ (e.workspaceId);
  var workspace = /** @type {!Blockly.WorkspaceSvg} */
      (Blockly.Workspace.getById(workspaceId));
  Blockly.States.updateMutatorFlyout_(workspace);
};

/**
 * Find all the callers of a named state.
 * @param {string} name Name of state.
 * @param {!Blockly.Workspace} workspace The workspace to find callers in.
 * @return {!Array.<!Blockly.Block>} Array of caller blocks.
 */
Blockly.States.getCallers = function(name, workspace) {
  var callers = [];
  var blocks = workspace.getAllBlocks(false);
  // Iterate through every block and check the name.
  for (var i = 0; i < blocks.length; i++) {
    if (blocks[i].getStateCall) {
      var stateBlock = /** @type {!Blockly.States.StateBlock} */ (
        blocks[i]);
      var procName = stateBlock.getStateCall();
      // State name may be null if the block is only half-built.
      if (procName && Blockly.Names.equals(procName, name)) {
        callers.push(blocks[i]);
      }
    }
  }
  return callers;
};

/**
 * When a state definition changes its parameters, find and edit all its
 * callers.
 * @param {!Blockly.Block} defBlock State definition block.
 */
Blockly.States.mutateCallers = function(defBlock) {
  var oldRecordUndo = Blockly.Events.recordUndo;
  var stateBlock = /** @type {!Blockly.States.StateBlock} */ (
    defBlock);
  var name = stateBlock.getStateDef()[0];
  var xmlElement = defBlock.mutationToDom(true);
  var callers = Blockly.States.getCallers(name, defBlock.workspace);
  for (var i = 0, caller; (caller = callers[i]); i++) {
    var oldMutationDom = caller.mutationToDom();
    var oldMutation = oldMutationDom && Blockly.Xml.domToText(oldMutationDom);
    caller.domToMutation(xmlElement);
    var newMutationDom = caller.mutationToDom();
    var newMutation = newMutationDom && Blockly.Xml.domToText(newMutationDom);
    if (oldMutation != newMutation) {
      // Fire a mutation on every caller block.  But don't record this as an
      // undo action since it is deterministically tied to the state's
      // definition mutation.
      Blockly.Events.recordUndo = false;
      Blockly.Events.fire(new Blockly.Events.BlockChange(
          caller, 'mutation', null, oldMutation, newMutation));
      Blockly.Events.recordUndo = oldRecordUndo;
    }
  }
};

/**
 * Find the definition block for the named state.
 * @param {string} name Name of state.
 * @param {!Blockly.Workspace} workspace The workspace to search.
 * @return {Blockly.Block} The state definition block, or null not found.
 */
Blockly.States.getDefinition = function(name, workspace) {
  // Assume that a state definition is a top block.
  var blocks = workspace.getTopBlocks(false);
  for (var i = 0; i < blocks.length; i++) {
    if (blocks[i].getStateDef) {
      var stateBlock = /** @type {!Blockly.States.StateBlock} */ (
        blocks[i]);
      var tuple = stateBlock.getStateDef();
      if (tuple && Blockly.Names.equals(tuple[0], name)) {
        return blocks[i];
      }
    }
  }
  return null;
};


Blockly.States.getOrCreateState = function(workspace, id, stateName, stateType){
  var state = Blockly.States.getState(workspace, id, stateName, stateType);
  if (!state) {
    state = Blockly.States.createState_(workspace, id, stateName, stateType);
  }
  return state;
}

Blockly.States.getState = function(workspace, id, stateName, stateType){
  return workspace.stateMap_.getStateById(id);
}

Blockly.States.createState_ = function(workspace, id, stateName, stateType){
  return workspace.stateMap_.createState(stateName, id, stateType);
}