// by zjie 2020年11月16日19:09:10
'use strict';

goog.provide('Blockly.ThreadMap');

goog.require('Blockly.Events');
goog.require('Blockly.Events.ThreadCreate');
goog.require('Blockly.Events.ThreadDelete');
goog.require('Blockly.Events.ThreadRename');
goog.require('Blockly.Msg');
goog.require('Blockly.utils');
goog.require('Blockly.utils.object');
goog.require('Blockly.ThreadModel');



Blockly.ThreadMap = function(workspace) {

  this.threadMap_ = Object.create(null);

  this.workspace = workspace;
};

Blockly.ThreadMap.prototype.clear = function() {
  this.threadMap_ = Object.create(null);
};



/* End functions for renaming variables. */

/**
 * Create a variable with a given name, optional type, and optional ID.
 * @param {string} name The name of the thread. This must be unique across
 *     variables and threads.

 * @param {?string=} opt_id The unique ID of the thread. This will default to
 *     a UUID.
 * @return {!Blockly.VariableModel} The newly created thread.
 */
Blockly.ThreadMap.prototype.createThread = function(name,
     opt_id, opt_type) {
  opt_type = opt_type || 'thread_noreturn';
  var thread = this.getThread(name);
  if (thread) {
    if (opt_id && thread.getId() != opt_id) {
      throw Error('thread "' + name + '" is already in use and its id is "' +
          thread.getId() + '" which conflicts with the passed in ' +
          'id, "' + opt_id + '".');
    }
    // The variable already exists and has the same ID.
    return thread;
  }
  var id = opt_id || Blockly.utils.genUid();
  thread = new Blockly.ThreadModel(this.workspace, name, id);
  this.threadMap_[opt_type] = this.threadMap_[opt_type] || [];
  var threads = this.threadMap_[opt_type];
  threads.push(thread);
 
  this.threadMap_[opt_type] = threads;

  return thread;
};

Blockly.ThreadMap.prototype.renameThread = function(thread, newName) {
  var type = thread.type;
  var conflictVar = this.getThread(newName, type);
  var blocks = this.workspace.getAllBlocks(false);
  Blockly.Events.setGroup(true);
  try {
    // The IDs may match if the rename is a simple case change (name1 -> Name1).
    if (!conflictVar || conflictVar.getId() == thread.getId()) {
      Blockly.Events.fire(new Blockly.Events.ThreadRename(thread, newName));
      thread.name = newName;
      for (var i = 0; i < blocks.length; i++) {
        blocks[i].updateThreadName(thread);
      }
    } else {
      // this.renameVariableWithConflict_(variable, newName, conflictVar, blocks);
    }
  } finally {
    Blockly.Events.setGroup(false);
  }
};

/**
 * Delete a thread.
 * @param {!Blockly.VariableModel} thread Variable to delete.
 */
Blockly.ThreadMap.prototype.deleteThread = function(thread) {
  //TODO
};

/**
 * Delete a variables by the passed in ID and all of its uses from this
 * workspace. May prompt the user for confirmation.
 * @param {string} id ID of variable to delete.
 */
Blockly.VariableMap.prototype.deleteThreadById = function(id) {
  var thread = this.getThreadById(id);
 //TOOD
};


/* End functions for variable deletion. */

/**
 * Find the variable by the given name and type and return it.  Return null if
 *     it is not found.
 * @param {string} name The name to check for.
 * @param {?string=} opt_type The type of the variable.  If not provided it
 *     defaults to the empty string, which is a specific type.
 * @return {Blockly.ThreadModel} The thread with the given name, or null if
 *     it was not found.
 */
Blockly.ThreadMap.prototype.getThread = function(name, opt_type) {
  var type = opt_type || 'thread_noreturn';
  var list = this.threadMap_[type];
  if (list) {
    for (var j = 0, thread; (thread = list[j]); j++) {
      if (Blockly.Names.equals(thread.name, name)) {
        return thread;
      }
    }
  }
  return null;
};

/**
 * Find the thread by the given ID and return it. Return null if it is not
 *     found.
 * @param {string} id The ID to check for.
 * @return {Blockly.VariableModel} The thread with the given ID.
 */
Blockly.ThreadMap.prototype.getThreadById = function(id) {
  var keys = Object.keys(this.threadMap_);
  for (var i = 0; i < keys.length; i++ ) {
    var key = keys[i];
    for (var j = 0, thread; (thread = this.threadMap_[key][j]); j++) {
      if (thread.getId() == id) {
        return thread;
      }
    }
  }
  return null;
};


/**
 * Return all variables of all types.
 * @return {!Array.<!Blockly.VariableModel>} List of variable models.
 */
Blockly.VariableMap.prototype.getAllVariables = function() {
  var all_variables = [];
  for (var key in this.variableMap_) {
    all_variables = all_variables.concat(this.variableMap_[key]);
  }
  return all_variables;
};

/**
 * Returns all of the thread names of all types.
 * @return {!Array<string>} All of the thread names of all types.
 */
Blockly.ThreadMap.prototype.getAllThreadNames = function() {
  var allNames = [];
  for (var key in this.threadMap_) {
    var threads = this.threadMap_[key];
    for (var i = 0, thread; (thread = threads[i]); i++) {
      allNames.push(thread.name);
    }
  }
  return allNames;
};


Blockly.ThreadMap.prototype.getAllThreadsByType = function(type) {
  type = type || 'thread_noreturn';
  return this.threadMap_[type];
};
