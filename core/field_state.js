/**
 * 一个用于选择某个线程名称的field
 */
'use strict';

goog.provide('Blockly.FieldState');

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
 * Class for a stateName's dropdown field.
 * @param {?string} stateName The default name for the state.  If null,
 *     a unique state name will be generated.
 * @param {Function=} opt_validator A function that is called to validate
 *    changes to the field's value. 

 * @param {Object=} opt_config A map of options used to configure the field.
 *  
 * @extends {Blockly.FieldDropdown}
 * @constructor
 */
Blockly.FieldState = function(stateName, opt_validator, opt_config) {
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
  this.menuGenerator_ = Blockly.FieldState.dropdownCreate;

  /**
   * The initial variable name passed to this field's constructor, or an
   * empty string if a name wasn't provided. Used to create the initial
   * variable.
   * @type {string}
   */
  this.defaultStateName = stateName || '';

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
Blockly.utils.object.inherits(Blockly.FieldState, Blockly.FieldDropdown);

/**
 * Construct a FieldState from a JSON arg object,
 * dereferencing any string table references.
 * @param {!Object} options A JSON object with options (variable,
 *                          variableTypes, and defaultType).
 * @return {!Blockly.FieldState} The new field instance.
 * @package
 * @nocollapse
 */
Blockly.FieldState.fromJson = function(options) {
  console.log('需要修改FieldState.fromJson方法，TODO');
  var stateName = Blockly.utils.replaceMessageReferences(options['state']);
  return new Blockly.FieldState(
      stateName, undefined, options);
};

/**
 * The workspace that this variable field belongs to.
 * @type {?Blockly.Workspace}
 * @private
 */
Blockly.FieldState.prototype.workspace_ = null;

/**
 * Serializable fields are saved by the XML renderer, non-serializable fields
 * are not. Editable fields should also be serializable.
 * @type {boolean}
 */
Blockly.FieldState.prototype.SERIALIZABLE = true;

Blockly.FieldState.prototype.initModel = function() {
  if (this.state_) {
    return; // Initialization already happened.
  }
  var state;
  var workspace = this.sourceBlock_.workspace.targetWorkspace;
  var stateAry = workspace.stateMap_.getAllStatesByType('state_def');
  if(stateAry.length){
    state = stateAry[0];
  }

  // Don't call setValue because we don't want to cause a rerender.
  this.doValueUpdate_(state.getId());
};



/**
 * @override
 */
Blockly.FieldState.prototype.shouldAddBorderRect_ = function() {
  return Blockly.FieldState.superClass_.shouldAddBorderRect_.call(this);
};

/**
 * Initialize this field based on the given XML.
 * @param {!Element} fieldElement The element containing information about the
 *    variable field's state.
 */
Blockly.FieldState.prototype.fromXml = function(fieldElement) {
  var id = fieldElement.getAttribute('id');
  var stateName = fieldElement.textContent;

  var state = Blockly.States.getOrCreateState(this.sourceBlock_.workspace, id, stateName);
  this.setValue(id);
};

/**
 * Serialize this field to XML.
 * @param {!Element} fieldElement The element to populate with info about the
 *    field's state.
 * @return {!Element} The element containing info about the field's state.
 */
Blockly.FieldState.prototype.toXml = function(fieldElement) {
  // Make sure the variable is initialized.

  fieldElement.id = this.state_.getId();
  fieldElement.textContent = this.state_.name;
  return fieldElement;
};

/**
 * Get the variable's ID.
 * @return {string} Current variable's ID.
 */
Blockly.FieldState.prototype.getValue = function() {
  return this.state_ ? this.state_.getId() : null;
};



/**
 * Get the text from this field, which is the selected variable's name.
 * @return {string} The selected variable's name, or the empty string if no
 *     variable is selected.
 */
Blockly.FieldState.prototype.getText = function() {
  return this.state_ ? this.state_.name : '';
};

/**
 * Get the variable model for the selected variable.
 * Not guaranteed to be in the variable map on the workspace (e.g. if accessed
 * after the variable has been deleted).
 * @return {Blockly.VariableModel} The selected variable, or null if none was
 *     selected.
 * @package
 */
Blockly.FieldState.prototype.getState = function() {
  return this.state_;
};

/**
 * Gets the validation function for this field, or null if not set.
 * Returns null if the variable is not set, because validators should not
 * run on the initial setValue call, because the field won't be attached to
 * a block and workspace at that point.
 * @return {Function} Validation function, or null.
 */
Blockly.FieldState.prototype.getValidator = function() {
  // Validators shouldn't operate on the initial setValue call.
  // Normally this is achieved by calling setValidator after setValue, but
  // this is not a possibility with variable fields.
  if (this.state_) {
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
Blockly.FieldState.prototype.doClassValidation_ = function(opt_newValue) {
  if (opt_newValue === null) {
    return null;
  }
  var newId = /** @type {string} */ (opt_newValue);
 /*  var state = Blockly.States.getState(
      this.sourceBlock_.workspace, newId);
 */
  var state = this.sourceBlock_.workspace.stateMap_.getStateById(newId)
  if (!state) {
    console.warn('State id doesn\'t point to a real state! ' +
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
Blockly.FieldState.prototype.doValueUpdate_ = function(newId) {
  var workspace =  this.sourceBlock_.workspace.targetWorkspace || this.sourceBlock_.workspace;
  var ary = [];
  var state;
  
  if(workspace.stateMap_){
    ary = workspace.stateMap_.getAllStatesByType();
  }
  if(ary.length){
    state = ary.find(function(item){
      return item.getId() === newId;
    })
    if(state){
      this.state_ = state;
    }
  }else{
    console.log('stateMap_中无数据。');
  }

  Blockly.FieldState.superClass_.doValueUpdate_.call(this, newId);
};



/**
 * Refreshes the name of the variable by grabbing the name of the model.
 * Used when a variable gets renamed, but the ID stays the same. Should only
 * be called by the block.
 * @package
 */
Blockly.FieldState.prototype.refreshStateName = function() {
  this.forceRerender();
};

/**
 * Return a sorted list of variable names for variable dropdown menus.
 * Include a special option at the end for creating a new variable name.
 * @return {!Array.<!Array>} Array of variable names/id tuples.
 * @this {Blockly.FieldState}
 */
Blockly.FieldState.dropdownCreate = function() {
  if (!this.state_) {
    throw Error('Tried to call dropdownCreate on a state field with no' +
        ' state selected.');
  }
  var name = this.getText();
  var stateModelList = [];
  var workspace = this.sourceBlock_.workspace.targetWorkspace || this.sourceBlock_.workspace;
  if (this.sourceBlock_ && this.sourceBlock_.workspace) {
    stateModelList = workspace.stateMap_.getAllStatesByType();
    stateModelList.sort(Blockly.StateModel.compareByName);
  }

  var options = [];
  for (var i = 0; i < stateModelList.length; i++) {
    // Set the UUID as the internal representation of the variable.
    options[i] = [stateModelList[i].name, stateModelList[i].getId()];
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
Blockly.FieldState.prototype.onItemSelected_ = function(menu, menuItem) {
  var id = menuItem.getValue();
  // this.sourceBlock_.appendDummyInput('KEY')
  // .appendField( new Blockly.FieldDropdown([["private", "private"], ["public", "public"]]), "VALUE" )
  // .appendField(new Blockly.FieldTextInput('method' + i), 'item_key' + i)
  // Handle special cases.
  if (this.sourceBlock_ && this.sourceBlock_.workspace) {
    if (id == Blockly.RENAME_VARIABLE_ID) {
      // Rename variable.
      Blockly.States.renameState(
          this.sourceBlock_.workspace, this.state_);
      return;
    } else if (id == Blockly.DELETE_VARIABLE_ID) {
      // Delete variable.
      this.sourceBlock_.workspace.deleteStateById(this.state_.getId());
      return;
    }
  }
  // Handle unspecial case.
  
  this.setValue(id);
};

// 表示这个field是否和线程相关
Blockly.FieldState.prototype.referencesState = function() {
  return true;
};



Blockly.fieldRegistry.register('field_state', Blockly.FieldState);
