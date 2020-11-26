// by zjie 2020年11月16日19:09:10
'use strict';

goog.provide('Blockly.StateMap');

goog.require('Blockly.Events');
goog.require('Blockly.Events.StateCreate');
goog.require('Blockly.Events.StateDelete');
goog.require('Blockly.Events.StateRename');
goog.require('Blockly.Msg');
goog.require('Blockly.utils');
goog.require('Blockly.utils.object');
goog.require('Blockly.StateModel');



Blockly.StateMap = function(workspace) {

  this.stateMap_ = Object.create(null);

  this.workspace = workspace;
};

Blockly.StateMap.prototype.clear = function() {
  this.stateMap_ = Object.create(null);
};



/* End functions for renaming variables. */

/**
 * Create a variable with a given name, optional type, and optional ID.
 * @param {string} name The name of the state. This must be unique across
 *     variables and states.

 * @param {?string=} opt_id The unique ID of the state. This will default to
 *     a UUID.
 * @return {!Blockly.VariableModel} The newly created state.
 */
Blockly.StateMap.prototype.createState = function(name,
     opt_id, opt_type) {
  opt_type = opt_type || 'state_def';
  var state = this.getState(name);
  if (state) {
    if (opt_id && state.getId() != opt_id) {
  debugger;
      throw Error('state "' + name + '" is already in use and its id is "' +
          state.getId() + '" which conflicts with the passed in ' +
          'id, "' + opt_id + '".');
    }
    // The variable already exists and has the same ID.
    return state;
  }
  var id = opt_id || Blockly.utils.genUid();
  state = new Blockly.StateModel(this.workspace, name, id);
  this.stateMap_[opt_type] = this.stateMap_[opt_type] || [];
  var states = this.stateMap_[opt_type];
  states.push(state);
 
  this.stateMap_[opt_type] = states;

  return state;
};

Blockly.StateMap.prototype.renameState = function(state, newName) {
  var type = state.type;
  var conflictVar = this.getState(newName, type);
  var blocks = this.workspace.getAllBlocks(false);
  Blockly.Events.setGroup(true);
  try {
    // The IDs may match if the rename is a simple case change (name1 -> Name1).
    if (!conflictVar || conflictVar.getId() == state.getId()) {
      Blockly.Events.fire(new Blockly.Events.StateRename(state, newName));
      state.name = newName;
      for (var i = 0; i < blocks.length; i++) {
        blocks[i].updateStateName(state);
      }
    } else {
      // this.renameVariableWithConflict_(variable, newName, conflictVar, blocks);
    }
  } finally {
    Blockly.Events.setGroup(false);
  }
};

/**
 * Delete a state.
 * @param {!Blockly.VariableModel} state Variable to delete.
 */
Blockly.StateMap.prototype.deleteState = function(state) {
  //TODO
};

/**
 * Delete a variables by the passed in ID and all of its uses from this
 * workspace. May prompt the user for confirmation.
 * @param {string} id ID of variable to delete.
 */
Blockly.VariableMap.prototype.deleteStateById = function(id) {
  var state = this.getStateById(id);
 //TOOD
};


/* End functions for variable deletion. */

/**
 * Find the variable by the given name and type and return it.  Return null if
 *     it is not found.
 * @param {string} name The name to check for.
 * @param {?string=} opt_type The type of the variable.  If not provided it
 *     defaults to the empty string, which is a specific type.
 * @return {Blockly.StateModel} The state with the given name, or null if
 *     it was not found.
 */
Blockly.StateMap.prototype.getState = function(name, opt_type) {
  var type = opt_type || 'state_def';
  var list = this.stateMap_[type];
  if (list) {
    for (var j = 0, state; (state = list[j]); j++) {
      if (Blockly.Names.equals(state.name, name)) {
        return state;
      }
    }
  }
  return null;
};

/**
 * Find the state by the given ID and return it. Return null if it is not
 *     found.
 * @param {string} id The ID to check for.
 * @return {Blockly.VariableModel} The state with the given ID.
 */
Blockly.StateMap.prototype.getStateById = function(id) {
  var keys = Object.keys(this.stateMap_);
  for (var i = 0; i < keys.length; i++ ) {
    var key = keys[i];
    for (var j = 0, state; (state = this.stateMap_[key][j]); j++) {
      if (state.getId() == id) {
        return state;
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
 * Returns all of the state names of all types.
 * @return {!Array<string>} All of the state names of all types.
 */
Blockly.StateMap.prototype.getAllStateNames = function() {
  var allNames = [];
  for (var key in this.stateMap_) {
    var states = this.stateMap_[key];
    for (var i = 0, state; (state = states[i]); i++) {
      allNames.push(state.name);
    }
  }
  return allNames;
};


Blockly.StateMap.prototype.getAllStatesByType = function(type) {
  type = type || 'state_def';
  return this.stateMap_[type];
};

Blockly.StateMap.isNameUsed = function(name, stateMap) {
  var allNames = stateMap.getAllStateNames();
  if(allNames.length){
    var result = allNames.find(function(stateName){
      return Blockly.Names.equals(stateName, name);
    })
    return !!result;
  }
  return false;
};
