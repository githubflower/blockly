
'use strict';

goog.provide('Blockly.StateModel');

goog.require('Blockly.Events');
goog.require('Blockly.Events.StateCreate');
goog.require('Blockly.utils');


/**
 * Class for a variable model.
 * Holds information for the variable including name, ID, and type.
 * @param {!Blockly.Workspace} workspace The variable's workspace.
 * @param {string} name The name of the variable. This must be unique across
 *     variables and states.

 * @param {string=} opt_id The unique ID of the variable. This will default to
 *     a UUID.
 * @constructor
 */
Blockly.StateModel = function(workspace, name, opt_id) {
  /**
   * The workspace the variable is in.
   * @type {!Blockly.Workspace}
   */
  this.workspace = workspace;

  /**
   * The name of the variable, typically defined by the user. It must be
   * unique across all names used for states and variables. It may be
   * changed by the user.
   * @type {string}
   */
  this.name = name;



  /**
   * A unique id for the variable. This should be defined at creation and
   * not change, even if the name changes. In most cases this should be a
   * UUID.
   * @type {string}
   * @private
   */
  this.id_ = opt_id || Blockly.utils.genUid();

  this._name = Blockly.utils.genUname();

  Blockly.Events.fire(new Blockly.Events.StateCreate(this));
};

/**
 * @return {string} The ID for the variable.
 */
Blockly.StateModel.prototype.getId = function() {
  return this.id_;
};

/**
 * A custom compare function for the StateModel objects.
 * @param {Blockly.StateModel} var1 First variable to compare.
 * @param {Blockly.StateModel} var2 Second variable to compare.
 * @return {number} -1 if name of var1 is less than name of var2, 0 if equal,
 *     and 1 if greater.
 * @package
 */
Blockly.StateModel.compareByName = function(var1, var2) {
  var name1 = var1.name.toLowerCase();
  var name2 = var2.name.toLowerCase();
  if (name1 < name2) {
    return -1;
  } else if (name1 == name2) {
    return 0;
  } else {
    return 1;
  }
};
