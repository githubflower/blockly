
'use strict';

goog.provide('Blockly.Events.StateBase');
goog.provide('Blockly.Events.StateCreate');
goog.provide('Blockly.Events.StateDelete');
goog.provide('Blockly.Events.StateRename');

goog.require('Blockly.Events');
goog.require('Blockly.Events.Abstract');
goog.require('Blockly.utils.object');


/**
 * Abstract class for a state event.
 * @param {Blockly.StateModel} state The state this event corresponds
 *     to.
 * @extends {Blockly.Events.Abstract}
 * @constructor
 */
Blockly.Events.StateBase = function(state) {
  Blockly.Events.StateBase.superClass_.constructor.call(this);

  /**
   * The state id for the state this event pertains to.
   * @type {string}
   */
  this.stateId = state.getId();
  this.workspaceId = state.workspace.id;
};
Blockly.utils.object.inherits(Blockly.Events.StateBase, Blockly.Events.Abstract);

/**
 * Encode the event as JSON.
 * @return {!Object} JSON representation.
 */
Blockly.Events.StateBase.prototype.toJson = function() {
  var json = Blockly.Events.StateBase.superClass_.toJson.call(this);
  json['stateId'] = this.stateId;
  return json;
};

/**
 * Decode the JSON event.
 * @param {!Object} json JSON representation.
 */
Blockly.Events.StateBase.prototype.fromJson = function(json) {
  Blockly.Events.StateBase.superClass_.toJson.call(this);
  this.stateId = json['stateId'];
};

/**
 * Class for a state creation event.
 * @param {Blockly.StateModel} state The created state.
 *     Null for a blank event.
 * @extends {Blockly.Events.StateBase}
 * @constructor
 */
Blockly.Events.StateCreate = function(state) {
  if (!state) {
    return;  // Blank event to be populated by fromJson.
  }
  Blockly.Events.StateCreate.superClass_.constructor.call(this, state);
  this.stateType = state.type;
  this.stateName = state.name;

};
Blockly.utils.object.inherits(Blockly.Events.StateCreate, Blockly.Events.StateBase);

/**
 * Type of this event.
 * @type {string}
 */
Blockly.Events.StateCreate.prototype.type = Blockly.Events.VAR_CREATE;

/**
 * Encode the event as JSON.
 * @return {!Object} JSON representation.
 */
Blockly.Events.StateCreate.prototype.toJson = function() {
  var json = Blockly.Events.StateCreate.superClass_.toJson.call(this);
  json['stateType'] = this.stateType;
  json['stateName'] = this.stateName;
  return json;
};

/**
 * Decode the JSON event.
 * @param {!Object} json JSON representation.
 */
Blockly.Events.StateCreate.prototype.fromJson = function(json) {
  Blockly.Events.StateCreate.superClass_.fromJson.call(this, json);
  this.stateType = json['stateType'];
  this.stateName = json['stateName'];
};

/**
 * Run a state creation event.
 * @param {boolean} forward True if run forward, false if run backward (undo).
 */
Blockly.Events.StateCreate.prototype.run = function(forward) {
  var workspace = this.getEventWorkspace_();
  if (forward) {
    workspace.createState(this.stateName, this.stateType, this.stateId);
  } else {
    workspace.deleteStateById(this.stateId);
  }
};

/**
 * Class for a state deletion event.
 * @param {Blockly.StateModel} state The deleted state.
 *     Null for a blank event.
 * @extends {Blockly.Events.StateBase}
 * @constructor
 */
Blockly.Events.StateDelete = function(state) {
  if (!state) {
    return;  // Blank event to be populated by fromJson.
  }
  Blockly.Events.StateDelete.superClass_.constructor.call(this, state);
  this.stateType = state.type;
  this.stateName = state.name;
};
Blockly.utils.object.inherits(Blockly.Events.StateDelete, Blockly.Events.StateBase);

/**
 * Type of this event.
 * @type {string}
 */
Blockly.Events.StateDelete.prototype.type = Blockly.Events.VAR_DELETE;

/**
 * Encode the event as JSON.
 * @return {!Object} JSON representation.
 */
Blockly.Events.StateDelete.prototype.toJson = function() {
  var json = Blockly.Events.StateDelete.superClass_.toJson.call(this);
  json['stateType'] = this.stateType;
  json['stateName'] = this.stateName;
  return json;
};

/**
 * Decode the JSON event.
 * @param {!Object} json JSON representation.
 */
Blockly.Events.StateDelete.prototype.fromJson = function(json) {
  Blockly.Events.StateDelete.superClass_.fromJson.call(this, json);
  this.stateType = json['stateType'];
  this.stateName = json['stateName'];
};

/**
 * Run a state deletion event.
 * @param {boolean} forward True if run forward, false if run backward (undo).
 */
Blockly.Events.StateDelete.prototype.run = function(forward) {
  var workspace = this.getEventWorkspace_();
  if (forward) {
    workspace.deleteStateById(this.stateId);
  } else {
    workspace.createState(this.stateName, this.stateType, this.stateId);
  }
};

/**
 * Class for a state rename event.
 * @param {Blockly.StateModel} state The renamed state.
 *     Null for a blank event.
 * @param {string} newName The new name the state will be changed to.
 * @extends {Blockly.Events.StateBase}
 * @constructor
 */
Blockly.Events.StateRename = function(state, newName) {
  if (!state) {
    return;  // Blank event to be populated by fromJson.
  }
  Blockly.Events.StateRename.superClass_.constructor.call(this, state);
  this.oldName = state.name;
  this.newName = newName;
};
Blockly.utils.object.inherits(Blockly.Events.StateRename, Blockly.Events.StateBase);

/**
 * Type of this event.
 * @type {string}
 */
Blockly.Events.StateRename.prototype.type = Blockly.Events.VAR_RENAME;

/**
 * Encode the event as JSON.
 * @return {!Object} JSON representation.
 */
Blockly.Events.StateRename.prototype.toJson = function() {
  var json = Blockly.Events.StateRename.superClass_.toJson.call(this);
  json['oldName'] = this.oldName;
  json['newName'] = this.newName;
  return json;
};

/**
 * Decode the JSON event.
 * @param {!Object} json JSON representation.
 */
Blockly.Events.StateRename.prototype.fromJson = function(json) {
  Blockly.Events.StateRename.superClass_.fromJson.call(this, json);
  this.oldName = json['oldName'];
  this.newName = json['newName'];
};

/**
 * Run a state rename event.
 * @param {boolean} forward True if run forward, false if run backward (undo).
 */
Blockly.Events.StateRename.prototype.run = function(forward) {
  var workspace = this.getEventWorkspace_();
  if (forward) {
    workspace.renameStateById(this.stateId, this.newName);
  } else {
    workspace.renameStateById(this.stateId, this.oldName);
  }
};
