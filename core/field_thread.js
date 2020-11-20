/**
 * 一个用于选择某个线程名称的field
 */
'use strict';

goog.provide('Blockly.FieldThread');

goog.require('Blockly.Events');
goog.require('Blockly.Events.BlockChange');
goog.require('Blockly.FieldDropdown');
goog.require('Blockly.fieldRegistry');
goog.require('Blockly.Msg');
goog.require('Blockly.utils');
goog.require('Blockly.utils.object');
goog.require('Blockly.utils.Size');

goog.require('Blockly.Xml');



/**
 * Class for a threadName's dropdown field.
 * @param {?string} threadName The default name for the thread.  If null,
 *     a unique thread name will be generated.
 * @param {Function=} opt_validator A function that is called to validate
 *    changes to the field's value. 

 * @param {Object=} opt_config A map of options used to configure the field.
 *  
 * @extends {Blockly.FieldDropdown}
 * @constructor
 */
Blockly.FieldThread = function(threadName, opt_validator, opt_config) {
  // The FieldDropdown constructor expects the field's initial value to be
  // the first entry in the menu generator, which it may or may not be.
  // Just do the relevant parts of the constructor.

  /**
   * An array of options for a dropdown list,
   * or a function which generates these options.
   * @type {(!Array.<!Array>|
   *    !function(this:Blockly.FieldDropdown): !Array.<!Array>)}
   * @protected
   */
  this.menuGenerator_ = Blockly.FieldThread.dropdownCreate;

  /**
   * The initial variable name passed to this field's constructor, or an
   * empty string if a name wasn't provided. Used to create the initial
   * variable.
   * @type {string}
   */
  this.defaultThreadName = threadName || '';

  /**
   * The size of the area rendered by the field.
   * @type {Blockly.utils.Size}
   * @protected
   * @override
   */
  this.size_ = new Blockly.utils.Size(0, 0);

  opt_config && this.configure_(opt_config);
  opt_validator && this.setValidator(opt_validator);

  /* if (!opt_config) {  // Only do one kind of configuration or the other.
    // do something
  } */
};
Blockly.utils.object.inherits(Blockly.FieldThread, Blockly.FieldDropdown);

/**
 * Construct a FieldThread from a JSON arg object,
 * dereferencing any string table references.
 * @param {!Object} options A JSON object with options (variable,
 *                          variableTypes, and defaultType).
 * @return {!Blockly.FieldThread} The new field instance.
 * @package
 * @nocollapse
 */
Blockly.FieldThread.fromJson = function(options) {
  console.log('需要修改FieldThread.fromJson方法，TODO');
  var threadName = Blockly.utils.replaceMessageReferences(options['thread']);
  return new Blockly.FieldThread(
      threadName, undefined, options);
};

/**
 * The workspace that this variable field belongs to.
 * @type {?Blockly.Workspace}
 * @private
 */
Blockly.FieldThread.prototype.workspace_ = null;

/**
 * Serializable fields are saved by the XML renderer, non-serializable fields
 * are not. Editable fields should also be serializable.
 * @type {boolean}
 */
Blockly.FieldThread.prototype.SERIALIZABLE = true;

Blockly.FieldThread.prototype.initModel = function() {
  if (this.thread_) {
    return; // Initialization already happened.
  }
  var thread;
  var workspace = this.sourceBlock_.workspace.targetWorkspace;
  var threadAry = workspace.threadMap_.getAllThreadsByType('thread_noreturn');
  if(threadAry.length){
    thread = threadAry[0];
  }

  // Don't call setValue because we don't want to cause a rerender.
  this.doValueUpdate_(thread.getId());
};



/**
 * @override
 */
Blockly.FieldThread.prototype.shouldAddBorderRect_ = function() {
  return Blockly.FieldThread.superClass_.shouldAddBorderRect_.call(this);
};

/**
 * Initialize this field based on the given XML.
 * @param {!Element} fieldElement The element containing information about the
 *    variable field's state.
 */
Blockly.FieldThread.prototype.fromXml = function(fieldElement) {
  var id = fieldElement.getAttribute('id');
  // var threadName = fieldElement.textContent;

  this.setValue(id);
};

/**
 * Serialize this field to XML.
 * @param {!Element} fieldElement The element to populate with info about the
 *    field's state.
 * @return {!Element} The element containing info about the field's state.
 */
Blockly.FieldThread.prototype.toXml = function(fieldElement) {
  // Make sure the variable is initialized.

  fieldElement.id = this.thread_.getId();
  fieldElement.textContent = this.thread_.name;
  return fieldElement;
};

/**
 * Get the variable's ID.
 * @return {string} Current variable's ID.
 */
Blockly.FieldThread.prototype.getValue = function() {
  return this.thread_ ? this.thread_.getId() : null;
};



/**
 * Get the text from this field, which is the selected variable's name.
 * @return {string} The selected variable's name, or the empty string if no
 *     variable is selected.
 */
Blockly.FieldThread.prototype.getText = function() {
  return this.thread_ ? this.thread_.name : '';
};

/**
 * Get the variable model for the selected variable.
 * Not guaranteed to be in the variable map on the workspace (e.g. if accessed
 * after the variable has been deleted).
 * @return {Blockly.VariableModel} The selected variable, or null if none was
 *     selected.
 * @package
 */
Blockly.FieldThread.prototype.getThread = function() {
  return this.thread_;
};

/**
 * Gets the validation function for this field, or null if not set.
 * Returns null if the variable is not set, because validators should not
 * run on the initial setValue call, because the field won't be attached to
 * a block and workspace at that point.
 * @return {Function} Validation function, or null.
 */
Blockly.FieldThread.prototype.getValidator = function() {
  // Validators shouldn't operate on the initial setValue call.
  // Normally this is achieved by calling setValidator after setValue, but
  // this is not a possibility with variable fields.
  if (this.thread_) {
    return this.validator_;
  }
  return null;
};

/**
 * Ensure that the id belongs to a valid variable of an allowed type.
 * @param {*=} opt_newValue The id of the new variable to set.
 * @return {?string} The validated id, or null if invalid.
 * @protected
 */
Blockly.FieldThread.prototype.doClassValidation_ = function(opt_newValue) {
  if (opt_newValue === null) {
    return null;
  }
  var newId = /** @type {string} */ (opt_newValue);
 /*  var thread = Blockly.Threads.getThread(
      this.sourceBlock_.workspace, newId);
 */
  var thread = this.sourceBlock_.workspace.threadMap_.getThreadById(newId)
  if (!thread) {
    console.warn('Thread id doesn\'t point to a real thread! ' +
        'ID was ' + newId);
    return null;
  }
  return newId;
};

/**
 * Update the value of this variable field, as well as its variable and text.
 *
 * The variable ID should be valid at this point, but if a variable field
 * validator returns a bad ID, this could break.
 * @param {*} newId The value to be saved.
 * @protected
 */
Blockly.FieldThread.prototype.doValueUpdate_ = function(newId) {
  var workspace =  this.sourceBlock_.workspace.targetWorkspace || this.sourceBlock_.workspace;
  var ary = [];
  var thread;
  
  if(workspace.threadMap_){
    ary = workspace.threadMap_.getAllThreadsByType();
  }
  if(ary.length){
    thread = ary.find(function(item){
      return item.getId() === newId;
    })
    if(thread){
      this.thread_ = thread;
    }
  }else{
    console.log('threadMap_中无数据。');
  }

  Blockly.FieldThread.superClass_.doValueUpdate_.call(this, newId);
};



/**
 * Refreshes the name of the variable by grabbing the name of the model.
 * Used when a variable gets renamed, but the ID stays the same. Should only
 * be called by the block.
 * @package
 */
Blockly.FieldThread.prototype.refreshThreadName = function() {
  this.forceRerender();
};

/**
 * Return a sorted list of variable names for variable dropdown menus.
 * Include a special option at the end for creating a new variable name.
 * @return {!Array.<!Array>} Array of variable names/id tuples.
 * @this {Blockly.FieldThread}
 */
Blockly.FieldThread.dropdownCreate = function() {
  if (!this.thread_) {
    throw Error('Tried to call dropdownCreate on a thread field with no' +
        ' thread selected.');
  }
  var name = this.getText();
  var threadModelList = [];
  var workspace = this.sourceBlock_.workspace.targetWorkspace || this.sourceBlock_.workspace;
  if (this.sourceBlock_ && this.sourceBlock_.workspace) {
    threadModelList = workspace.threadMap_.getAllThreadsByType();
    threadModelList.sort(Blockly.ThreadModel.compareByName);
  }

  var options = [];
  for (var i = 0; i < threadModelList.length; i++) {
    // Set the UUID as the internal representation of the variable.
    options[i] = [threadModelList[i].name, threadModelList[i].getId()];
  }
  // options.push([Blockly.Msg['RENAME_VARIABLE'], Blockly.RENAME_VARIABLE_ID]);
  /* if (Blockly.Msg['DELETE_VARIABLE']) {
    options.push(
        [
          Blockly.Msg['DELETE_VARIABLE'].replace('%1', name),
          Blockly.DELETE_VARIABLE_ID
        ]
    );
  } */

  return options;
};

/**
 * Handle the selection of an item in the variable dropdown menu.
 * Special case the 'Rename variable...' and 'Delete variable...' options.
 * In the rename case, prompt the user for a new name.
 * @param {!Blockly.Menu} menu The Menu component clicked.
 * @param {!Blockly.MenuItem} menuItem The MenuItem selected within menu.
 * @protected
 */
Blockly.FieldThread.prototype.onItemSelected_ = function(menu, menuItem) {
  var id = menuItem.getValue();
  // this.sourceBlock_.appendDummyInput('KEY')
  // .appendField( new Blockly.FieldDropdown([["private", "private"], ["public", "public"]]), "VALUE" )
  // .appendField(new Blockly.FieldTextInput('method' + i), 'item_key' + i)
  // Handle special cases.
  if (this.sourceBlock_ && this.sourceBlock_.workspace) {
    if (id == Blockly.RENAME_VARIABLE_ID) {
      // Rename variable.
      Blockly.Threads.renameThread(
          this.sourceBlock_.workspace, this.thread_);
      return;
    } else if (id == Blockly.DELETE_VARIABLE_ID) {
      // Delete variable.
      this.sourceBlock_.workspace.deleteThreadById(this.thread_.getId());
      return;
    }
  }
  // Handle unspecial case.
  
  this.setValue(id);
};

// 表示这个field是否和线程相关
Blockly.FieldThread.prototype.referencesThread = function() {
  return true;
};



Blockly.fieldRegistry.register('field_thread', Blockly.FieldThread);
