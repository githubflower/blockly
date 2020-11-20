
'use strict';

goog.provide('Blockly.Events.ThreadBase');
goog.provide('Blockly.Events.ThreadCreate');
goog.provide('Blockly.Events.ThreadDelete');
goog.provide('Blockly.Events.ThreadRename');

goog.require('Blockly.Events');
goog.require('Blockly.Events.Abstract');
goog.require('Blockly.utils.object');


/**
 * Abstract class for a thread event.
 * @param {Blockly.ThreadModel} thread The thread this event corresponds
 *     to.
 * @extends {Blockly.Events.Abstract}
 * @constructor
 */
Blockly.Events.ThreadBase = function(thread) {
  Blockly.Events.ThreadBase.superClass_.constructor.call(this);

  /**
   * The thread id for the thread this event pertains to.
   * @type {string}
   */
  this.threadId = thread.getId();
  this.workspaceId = thread.workspace.id;
};
Blockly.utils.object.inherits(Blockly.Events.ThreadBase, Blockly.Events.Abstract);

/**
 * Encode the event as JSON.
 * @return {!Object} JSON representation.
 */
Blockly.Events.ThreadBase.prototype.toJson = function() {
  var json = Blockly.Events.ThreadBase.superClass_.toJson.call(this);
  json['threadId'] = this.threadId;
  return json;
};

/**
 * Decode the JSON event.
 * @param {!Object} json JSON representation.
 */
Blockly.Events.ThreadBase.prototype.fromJson = function(json) {
  Blockly.Events.ThreadBase.superClass_.toJson.call(this);
  this.threadId = json['threadId'];
};

/**
 * Class for a thread creation event.
 * @param {Blockly.ThreadModel} thread The created thread.
 *     Null for a blank event.
 * @extends {Blockly.Events.ThreadBase}
 * @constructor
 */
Blockly.Events.ThreadCreate = function(thread) {
  if (!thread) {
    return;  // Blank event to be populated by fromJson.
  }
  Blockly.Events.ThreadCreate.superClass_.constructor.call(this, thread);
  this.threadType = thread.type;
  this.threadName = thread.name;

};
Blockly.utils.object.inherits(Blockly.Events.ThreadCreate, Blockly.Events.ThreadBase);

/**
 * Type of this event.
 * @type {string}
 */
Blockly.Events.ThreadCreate.prototype.type = Blockly.Events.VAR_CREATE;

/**
 * Encode the event as JSON.
 * @return {!Object} JSON representation.
 */
Blockly.Events.ThreadCreate.prototype.toJson = function() {
  var json = Blockly.Events.ThreadCreate.superClass_.toJson.call(this);
  json['threadType'] = this.threadType;
  json['threadName'] = this.threadName;
  return json;
};

/**
 * Decode the JSON event.
 * @param {!Object} json JSON representation.
 */
Blockly.Events.ThreadCreate.prototype.fromJson = function(json) {
  Blockly.Events.ThreadCreate.superClass_.fromJson.call(this, json);
  this.threadType = json['threadType'];
  this.threadName = json['threadName'];
};

/**
 * Run a thread creation event.
 * @param {boolean} forward True if run forward, false if run backward (undo).
 */
Blockly.Events.ThreadCreate.prototype.run = function(forward) {
  var workspace = this.getEventWorkspace_();
  if (forward) {
    workspace.createThread(this.threadName, this.threadType, this.threadId);
  } else {
    workspace.deleteThreadById(this.threadId);
  }
};

/**
 * Class for a thread deletion event.
 * @param {Blockly.ThreadModel} thread The deleted thread.
 *     Null for a blank event.
 * @extends {Blockly.Events.ThreadBase}
 * @constructor
 */
Blockly.Events.ThreadDelete = function(thread) {
  if (!thread) {
    return;  // Blank event to be populated by fromJson.
  }
  Blockly.Events.ThreadDelete.superClass_.constructor.call(this, thread);
  this.threadType = thread.type;
  this.threadName = thread.name;
};
Blockly.utils.object.inherits(Blockly.Events.ThreadDelete, Blockly.Events.ThreadBase);

/**
 * Type of this event.
 * @type {string}
 */
Blockly.Events.ThreadDelete.prototype.type = Blockly.Events.VAR_DELETE;

/**
 * Encode the event as JSON.
 * @return {!Object} JSON representation.
 */
Blockly.Events.ThreadDelete.prototype.toJson = function() {
  var json = Blockly.Events.ThreadDelete.superClass_.toJson.call(this);
  json['threadType'] = this.threadType;
  json['threadName'] = this.threadName;
  return json;
};

/**
 * Decode the JSON event.
 * @param {!Object} json JSON representation.
 */
Blockly.Events.ThreadDelete.prototype.fromJson = function(json) {
  Blockly.Events.ThreadDelete.superClass_.fromJson.call(this, json);
  this.threadType = json['threadType'];
  this.threadName = json['threadName'];
};

/**
 * Run a thread deletion event.
 * @param {boolean} forward True if run forward, false if run backward (undo).
 */
Blockly.Events.ThreadDelete.prototype.run = function(forward) {
  var workspace = this.getEventWorkspace_();
  if (forward) {
    workspace.deleteThreadById(this.threadId);
  } else {
    workspace.createThread(this.threadName, this.threadType, this.threadId);
  }
};

/**
 * Class for a thread rename event.
 * @param {Blockly.ThreadModel} thread The renamed thread.
 *     Null for a blank event.
 * @param {string} newName The new name the thread will be changed to.
 * @extends {Blockly.Events.ThreadBase}
 * @constructor
 */
Blockly.Events.ThreadRename = function(thread, newName) {
  if (!thread) {
    return;  // Blank event to be populated by fromJson.
  }
  Blockly.Events.ThreadRename.superClass_.constructor.call(this, thread);
  this.oldName = thread.name;
  this.newName = newName;
};
Blockly.utils.object.inherits(Blockly.Events.ThreadRename, Blockly.Events.ThreadBase);

/**
 * Type of this event.
 * @type {string}
 */
Blockly.Events.ThreadRename.prototype.type = Blockly.Events.VAR_RENAME;

/**
 * Encode the event as JSON.
 * @return {!Object} JSON representation.
 */
Blockly.Events.ThreadRename.prototype.toJson = function() {
  var json = Blockly.Events.ThreadRename.superClass_.toJson.call(this);
  json['oldName'] = this.oldName;
  json['newName'] = this.newName;
  return json;
};

/**
 * Decode the JSON event.
 * @param {!Object} json JSON representation.
 */
Blockly.Events.ThreadRename.prototype.fromJson = function(json) {
  Blockly.Events.ThreadRename.superClass_.fromJson.call(this, json);
  this.oldName = json['oldName'];
  this.newName = json['newName'];
};

/**
 * Run a thread rename event.
 * @param {boolean} forward True if run forward, false if run backward (undo).
 */
Blockly.Events.ThreadRename.prototype.run = function(forward) {
  var workspace = this.getEventWorkspace_();
  if (forward) {
    workspace.renameThreadById(this.threadId, this.newName);
  } else {
    workspace.renameThreadById(this.threadId, this.oldName);
  }
};
