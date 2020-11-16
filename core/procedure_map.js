// by zjie 2020年11月16日19:09:10
'use strict';

goog.provide('Blockly.ProcedureMap');

goog.require('Blockly.Events');

goog.require('Blockly.Msg');
goog.require('Blockly.utils');
goog.require('Blockly.utils.object');


Blockly.ProcedureMap = function(workspace) {

  this.procedureMap_ = Object.create(null);

  this.workspace = workspace;
};

Blockly.VariableMap.prototype.clear = function() {
  this.procedureMap_ = Object.create(null);
};



/* End functions for renaming variables. */

/**
 * Create a variable with a given name, optional type, and optional ID.
 * @param {string} name The name of the procedure. This must be unique across
 *     variables and procedures.

 * @param {?string=} opt_id The unique ID of the procedure. This will default to
 *     a UUID.
 * @return {!Blockly.VariableModel} The newly created procedure.
 */
Blockly.VariableMap.prototype.createProcedure = function(name,
     opt_id) {
  var procedure = this.getProcedure(name);
  if (procedure) {
    if (opt_id && procedure.getId() != opt_id) {
      throw Error('procedure "' + name + '" is already in use and its id is "' +
          procedure.getId() + '" which conflicts with the passed in ' +
          'id, "' + opt_id + '".');
    }
    // The variable already exists and has the same ID.
    return procedure;
  }
  if (opt_id && this.getProcedureId(opt_id)) {
    throw Error('procedure id, "' + opt_id + '", is already in use.');
  }
  var id = opt_id || Blockly.utils.genUid();
  procedure = new Blockly.ProcedureModel(this.workspace, name, id); //TODO

  var procedures = this.procedureMap_ || [];
  procedures.push(procedure);
 
  this.procedureMap_ = procedures;

  return procedure;
};

/* Begin functions for procedure deletion. */

/**
 * Delete a procedure.
 * @param {!Blockly.VariableModel} procedure Variable to delete.
 */
Blockly.ProcedureMap.prototype.deleteProcedure = function(procedure) {
  //TODO
};

/**
 * Delete a variables by the passed in ID and all of its uses from this
 * workspace. May prompt the user for confirmation.
 * @param {string} id ID of variable to delete.
 */
Blockly.VariableMap.prototype.deleteProcedureById = function(id) {
  var procedure = this.getProcedureById(id);
 //TOOD
};


/* End functions for variable deletion. */

/**
 * Find the variable by the given name and type and return it.  Return null if
 *     it is not found.
 * @param {string} name The name to check for.
 * @param {?string=} opt_type The type of the variable.  If not provided it
 *     defaults to the empty string, which is a specific type.
 * @return {Blockly.ProcedureModel} The procedure with the given name, or null if
 *     it was not found.
 */
Blockly.ProcedureMap.prototype.getProcedure = function(name, opt_type) {
  var type = opt_type || '';
  var list = this.procedureMap_[type];
  if (list) {
    for (var j = 0, procedure; (procedure = list[j]); j++) {
      if (Blockly.Names.equals(procedure.name, name)) {
        return procedure;
      }
    }
  }
  return null;
};

/**
 * Find the procedure by the given ID and return it. Return null if it is not
 *     found.
 * @param {string} id The ID to check for.
 * @return {Blockly.VariableModel} The procedure with the given ID.
 */
Blockly.ProcedureMap.prototype.getProcedureById = function(id) {
  var keys = Object.keys(this.procedureMap_);
  for (var i = 0; i < keys.length; i++ ) {
    var key = keys[i];
    for (var j = 0, procedure; (procedure = this.procedureMap_[key][j]); j++) {
      if (procedure.getId() == id) {
        return procedure;
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
 * Returns all of the procedure names of all types.
 * @return {!Array<string>} All of the procedure names of all types.
 */
Blockly.ProcedureMap.prototype.getAllProcedureNames = function() {
  var allNames = [];
  for (var key in this.procedureMap_) {
    var procedures = this.procedureMap_[key];
    for (var i = 0, procedure; (procedure = procedures[i]); i++) {
      allNames.push(procedure.name);
    }
  }
  return allNames;
};
