/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Classes for all types of procedure events.
 * @author fenichel@google.com (Rachel Fenichel)
 */
'use strict';

goog.provide('Blockly.Events.ProcedureBase');
goog.provide('Blockly.Events.ProcedureCreate');
goog.provide('Blockly.Events.ProcedureDelete');
goog.provide('Blockly.Events.ProcedureRename');

goog.require('Blockly.Events');
goog.require('Blockly.Events.Abstract');
goog.require('Blockly.utils.object');


/**
 * Abstract class for a procedure event.
 * @param {Blockly.ProcedureModel} procedure The procedure this event corresponds
 *     to.
 * @extends {Blockly.Events.Abstract}
 * @constructor
 */
Blockly.Events.ProcedureBase = function(procedure) {
  Blockly.Events.ProcedureBase.superClass_.constructor.call(this);

  /**
   * The procedure id for the procedure this event pertains to.
   * @type {string}
   */
  this.procedureId = procedure.getId();
  this.workspaceId = procedure.workspace.id;
};
Blockly.utils.object.inherits(Blockly.Events.ProcedureBase, Blockly.Events.Abstract);

/**
 * Encode the event as JSON.
 * @return {!Object} JSON representation.
 */
Blockly.Events.ProcedureBase.prototype.toJson = function() {
  var json = Blockly.Events.ProcedureBase.superClass_.toJson.call(this);
  json['procedureId'] = this.procedureId;
  return json;
};

/**
 * Decode the JSON event.
 * @param {!Object} json JSON representation.
 */
Blockly.Events.ProcedureBase.prototype.fromJson = function(json) {
  Blockly.Events.ProcedureBase.superClass_.toJson.call(this);
  this.procedureId = json['procedureId'];
};

/**
 * Class for a procedure creation event.
 * @param {Blockly.ProcedureModel} procedure The created procedure.
 *     Null for a blank event.
 * @extends {Blockly.Events.ProcedureBase}
 * @constructor
 */
Blockly.Events.ProcedureCreate = function(procedure) {
  if (!procedure) {
    return;  // Blank event to be populated by fromJson.
  }
  Blockly.Events.ProcedureCreate.superClass_.constructor.call(this, procedure);
  this.procedureType = procedure.type;
  this.procedureName = procedure.name;
};
Blockly.utils.object.inherits(Blockly.Events.ProcedureCreate, Blockly.Events.ProcedureBase);

/**
 * Type of this event.
 * @type {string}
 */
Blockly.Events.ProcedureCreate.prototype.type = Blockly.Events.VAR_CREATE;

/**
 * Encode the event as JSON.
 * @return {!Object} JSON representation.
 */
Blockly.Events.ProcedureCreate.prototype.toJson = function() {
  var json = Blockly.Events.ProcedureCreate.superClass_.toJson.call(this);
  json['procedureType'] = this.procedureType;
  json['procedureName'] = this.procedureName;
  return json;
};

/**
 * Decode the JSON event.
 * @param {!Object} json JSON representation.
 */
Blockly.Events.ProcedureCreate.prototype.fromJson = function(json) {
  Blockly.Events.ProcedureCreate.superClass_.fromJson.call(this, json);
  this.procedureType = json['procedureType'];
  this.procedureName = json['procedureName'];
};

/**
 * Run a procedure creation event.
 * @param {boolean} forward True if run forward, false if run backward (undo).
 */
Blockly.Events.ProcedureCreate.prototype.run = function(forward) {
  var workspace = this.getEventWorkspace_();
  if (forward) {
    workspace.createProcedure(this.procedureName, this.procedureType, this.procedureId);
  } else {
    workspace.deleteProcedureById(this.procedureId);
  }
};

/**
 * Class for a procedure deletion event.
 * @param {Blockly.ProcedureModel} procedure The deleted procedure.
 *     Null for a blank event.
 * @extends {Blockly.Events.ProcedureBase}
 * @constructor
 */
Blockly.Events.ProcedureDelete = function(procedure) {
  if (!procedure) {
    return;  // Blank event to be populated by fromJson.
  }
  Blockly.Events.ProcedureDelete.superClass_.constructor.call(this, procedure);
  this.procedureType = procedure.type;
  this.procedureName = procedure.name;
};
Blockly.utils.object.inherits(Blockly.Events.ProcedureDelete, Blockly.Events.ProcedureBase);

/**
 * Type of this event.
 * @type {string}
 */
Blockly.Events.ProcedureDelete.prototype.type = Blockly.Events.VAR_DELETE;

/**
 * Encode the event as JSON.
 * @return {!Object} JSON representation.
 */
Blockly.Events.ProcedureDelete.prototype.toJson = function() {
  var json = Blockly.Events.ProcedureDelete.superClass_.toJson.call(this);
  json['procedureType'] = this.procedureType;
  json['procedureName'] = this.procedureName;
  return json;
};

/**
 * Decode the JSON event.
 * @param {!Object} json JSON representation.
 */
Blockly.Events.ProcedureDelete.prototype.fromJson = function(json) {
  Blockly.Events.ProcedureDelete.superClass_.fromJson.call(this, json);
  this.procedureType = json['procedureType'];
  this.procedureName = json['procedureName'];
};

/**
 * Run a procedure deletion event.
 * @param {boolean} forward True if run forward, false if run backward (undo).
 */
Blockly.Events.ProcedureDelete.prototype.run = function(forward) {
  var workspace = this.getEventWorkspace_();
  if (forward) {
    workspace.deleteProcedureById(this.procedureId);
  } else {
    workspace.createProcedure(this.procedureName, this.procedureType, this.procedureId);
  }
};

/**
 * Class for a procedure rename event.
 * @param {Blockly.ProcedureModel} procedure The renamed procedure.
 *     Null for a blank event.
 * @param {string} newName The new name the procedure will be changed to.
 * @extends {Blockly.Events.ProcedureBase}
 * @constructor
 */
Blockly.Events.ProcedureRename = function(procedure, newName) {
  if (!procedure) {
    return;  // Blank event to be populated by fromJson.
  }
  Blockly.Events.ProcedureRename.superClass_.constructor.call(this, procedure);
  this.oldName = procedure.name;
  this.newName = newName;
};
Blockly.utils.object.inherits(Blockly.Events.ProcedureRename, Blockly.Events.ProcedureBase);

/**
 * Type of this event.
 * @type {string}
 */
Blockly.Events.ProcedureRename.prototype.type = Blockly.Events.VAR_RENAME;

/**
 * Encode the event as JSON.
 * @return {!Object} JSON representation.
 */
Blockly.Events.ProcedureRename.prototype.toJson = function() {
  var json = Blockly.Events.ProcedureRename.superClass_.toJson.call(this);
  json['oldName'] = this.oldName;
  json['newName'] = this.newName;
  return json;
};

/**
 * Decode the JSON event.
 * @param {!Object} json JSON representation.
 */
Blockly.Events.ProcedureRename.prototype.fromJson = function(json) {
  Blockly.Events.ProcedureRename.superClass_.fromJson.call(this, json);
  this.oldName = json['oldName'];
  this.newName = json['newName'];
};

/**
 * Run a procedure rename event.
 * @param {boolean} forward True if run forward, false if run backward (undo).
 */
Blockly.Events.ProcedureRename.prototype.run = function(forward) {
  var workspace = this.getEventWorkspace_();
  if (forward) {
    workspace.renameProcedureById(this.procedureId, this.newName);
  } else {
    workspace.renameProcedureById(this.procedureId, this.oldName);
  }
};
