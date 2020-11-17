/**
 * 一个用于选择某个函数名称的field
 */
'use strict';

goog.provide('Blockly.FieldProcedure');

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
 * Class for a procedureName's dropdown field.
 * @param {?string} procedureName The default name for the procedure.  If null,
 *     a unique procedure name will be generated.
 * @param {Function=} opt_validator A function that is called to validate
 *    changes to the field's value. 

 * @param {Object=} opt_config A map of options used to configure the field.
 *  
 * @extends {Blockly.FieldDropdown}
 * @constructor
 */
Blockly.FieldProcedure = function(procedureName, opt_validator, opt_config) {
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
  this.menuGenerator_ = Blockly.FieldProcedure.dropdownCreate;

  /**
   * The initial variable name passed to this field's constructor, or an
   * empty string if a name wasn't provided. Used to create the initial
   * variable.
   * @type {string}
   */
  this.defaultProcedureName = procedureName || '';

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
Blockly.utils.object.inherits(Blockly.FieldProcedure, Blockly.FieldDropdown);

/**
 * Construct a FieldProcedure from a JSON arg object,
 * dereferencing any string table references.
 * @param {!Object} options A JSON object with options (variable,
 *                          variableTypes, and defaultType).
 * @return {!Blockly.FieldProcedure} The new field instance.
 * @package
 * @nocollapse
 */
Blockly.FieldProcedure.fromJson = function(options) {
  console.log('需要修改FieldProcedure.fromJson方法，TODO');
  // var procedureName = Blockly.utils.replaceMessageReferences(options['variable']);
  var procedureName = Blockly.utils.replaceMessageReferences(options['procedure']);
  return new Blockly.FieldProcedure(
      procedureName, undefined, options);
};

/**
 * The workspace that this variable field belongs to.
 * @type {?Blockly.Workspace}
 * @private
 */
Blockly.FieldProcedure.prototype.workspace_ = null;

/**
 * Serializable fields are saved by the XML renderer, non-serializable fields
 * are not. Editable fields should also be serializable.
 * @type {boolean}
 */
Blockly.FieldProcedure.prototype.SERIALIZABLE = true;

Blockly.FieldProcedure.prototype.initModel = function() {
  if (this.procedure_) {
    return; // Initialization already happened.
  }
  var procedure;
  var procedureAry = Blockly.Procedures.getProceduresOfNoReturn(this.sourceBlock_.workspace);
  if(procedureAry.length){
    procedure = procedureAry[0];
  }

  
  // Don't call setValue because we don't want to cause a rerender.
  this.doValueUpdate_(procedure.id);
};

/* Blockly.FieldProcedure.prototype.alreadyExistThisBlock = function(id){
  var workspace = this.sourceBlock_.workspace;
  var existFlag = false;
  var ary = [];
  if(workspace.procedureMap_ && workspace.procedureMap_.procedureMap_ && workspace.procedureMap_.procedureMap_['procedure_noreturn']){
    ary = workspace.procedureMap_.procedureMap_['procedure_noreturn'];
  }
  if(ary.length){
    existFlag = !!ary.find(function(item){
      return item.getId() === id;
    })
  }
  return existFlag;
}; */


/**
 * @override
 */
Blockly.FieldProcedure.prototype.shouldAddBorderRect_ = function() {
  return Blockly.FieldProcedure.superClass_.shouldAddBorderRect_.call(this);
};

/**
 * Initialize this field based on the given XML.
 * @param {!Element} fieldElement The element containing information about the
 *    variable field's state.
 */
Blockly.FieldProcedure.prototype.fromXml = function(fieldElement) {
  var id = fieldElement.getAttribute('id');
  var procedureName = fieldElement.textContent;

  var procedure = Blockly.Procedures.getOrCreateProcedurePackage(
      this.sourceBlock_.workspace, id, procedureName);

  this.setValue(procedure.getId());
};

/**
 * Serialize this field to XML.
 * @param {!Element} fieldElement The element to populate with info about the
 *    field's state.
 * @return {!Element} The element containing info about the field's state.
 */
Blockly.FieldProcedure.prototype.toXml = function(fieldElement) {
  // Make sure the variable is initialized.

  fieldElement.id = this.procedure_.getId();
  fieldElement.textContent = this.procedure_.name;
  return fieldElement;
};

/**
 * Get the variable's ID.
 * @return {string} Current variable's ID.
 */
Blockly.FieldProcedure.prototype.getValue = function() {
  return this.procedure_ ? this.procedure_.getId() : null;
};

/**
 * Get the text from this field, which is the selected variable's name.
 * @return {string} The selected variable's name, or the empty string if no
 *     variable is selected.
 */
Blockly.FieldProcedure.prototype.getText = function() {
  return this.procedure_ ? this.procedure_.name : '';
};

/**
 * Get the variable model for the selected variable.
 * Not guaranteed to be in the variable map on the workspace (e.g. if accessed
 * after the variable has been deleted).
 * @return {Blockly.VariableModel} The selected variable, or null if none was
 *     selected.
 * @package
 */
Blockly.FieldProcedure.prototype.getProcedure = function() {
  return this.procedure_;
};

/**
 * Gets the validation function for this field, or null if not set.
 * Returns null if the variable is not set, because validators should not
 * run on the initial setValue call, because the field won't be attached to
 * a block and workspace at that point.
 * @return {Function} Validation function, or null.
 */
Blockly.FieldProcedure.prototype.getValidator = function() {
  // Validators shouldn't operate on the initial setValue call.
  // Normally this is achieved by calling setValidator after setValue, but
  // this is not a possibility with variable fields.
  if (this.procedure_) {
    return this.procedure_;
  }
  return null;
};

/**
 * Ensure that the id belongs to a valid variable of an allowed type.
 * @param {*=} opt_newValue The id of the new variable to set.
 * @return {?string} The validated id, or null if invalid.
 * @protected
 */
Blockly.FieldProcedure.prototype.doClassValidation_ = function(opt_newValue) {
  if (opt_newValue === null) {
    return null;
  }
  var newId = /** @type {string} */ (opt_newValue);
  var procedure = Blockly.Procedures.getProcedure(
      this.sourceBlock_.workspace, newId);
  if (!procedure) {
    console.warn('Procedure id doesn\'t point to a real procedure! ' +
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
Blockly.FieldProcedure.prototype.doValueUpdate_ = function(newId) {
  var workspace =  this.sourceBlock_.workspace;
  var ary = [];
  var procedure;
  if(workspace.procedureMap_ && workspace.procedureMap_.procedureMap_ && workspace.procedureMap_.procedureMap_['procedure_noreturn']){
    ary = workspace.procedureMap_.procedureMap_['procedure_noreturn'];
  }
  if(ary.length){
    procedure = ary.find(function(item){
      return item.getId() === newId;
    })
    if(procedure){
      this.procedure_ = procedure;
    }
  }else{
    debugger;
    console.log('procedureMap_中无数据。');
  }

  Blockly.FieldProcedure.superClass_.doValueUpdate_.call(this, newId);
};



/**
 * Refreshes the name of the variable by grabbing the name of the model.
 * Used when a variable gets renamed, but the ID stays the same. Should only
 * be called by the block.
 * @package
 */
Blockly.FieldProcedure.prototype.refreshProcedureName = function() {
  this.forceRerender();
};

/**
 * Return a sorted list of variable names for variable dropdown menus.
 * Include a special option at the end for creating a new variable name.
 * @return {!Array.<!Array>} Array of variable names/id tuples.
 * @this {Blockly.FieldProcedure}
 */
Blockly.FieldProcedure.dropdownCreate = function() {
  if (!this.procedure_) {
    throw Error('Tried to call dropdownCreate on a procedure field with no' +
        ' procedure selected.');
  }
  var name = this.getText();
  var variableModelList = [];
  var workspace = this.sourceBlock_.workspace;
  debugger;
  if (this.sourceBlock_ && this.sourceBlock_.workspace) {
    var allProcedures = Blockly.Procedures.allProcedures(workspace);
    
    // Get a copy of the list, so that adding rename and new variable options
    // doesn't modify the workspace's list.
    for (var i = 0; i < variableTypes.length; i++) {
      var variableType = variableTypes[i];
      var variables =
        this.sourceBlock_.workspace.getVariablesOfType(variableType);
      variableModelList = variableModelList.concat(variables);
    }
  }
  variableModelList.sort(Blockly.VariableModel.compareByName);

  var options = [];
  /* for (var i = 0; i < variableModelList.length; i++) {
    // Set the UUID as the internal representation of the variable.
    options[i] = [variableModelList[i].name, variableModelList[i].getId()];
  }
  options.push([Blockly.Msg['RENAME_VARIABLE'], Blockly.RENAME_VARIABLE_ID]);
  if (Blockly.Msg['DELETE_VARIABLE']) {
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
Blockly.FieldProcedure.prototype.onItemSelected_ = function(menu, menuItem) {
  var id = menuItem.getValue();
  // this.sourceBlock_.appendDummyInput('KEY')
  // .appendField( new Blockly.FieldDropdown([["private", "private"], ["public", "public"]]), "VALUE" )
  // .appendField(new Blockly.FieldTextInput('method' + i), 'item_key' + i)
  // Handle special cases.
  if (this.sourceBlock_ && this.sourceBlock_.workspace) {
    if (id == Blockly.RENAME_VARIABLE_ID) {
      // Rename variable.
      Blockly.Procedures.renameProcedure(
          this.sourceBlock_.workspace, this.procedure_);
      return;
    } else if (id == Blockly.DELETE_VARIABLE_ID) {
      // Delete variable.
      this.sourceBlock_.workspace.deleteProcedureById(this.procedure_.getId());
      return;
    }
  }
  // Handle unspecial case.
  this.setValue(id);
};

/**
 * Overrides referencesVariables(), indicating this field refers to a variable.
 * @return {boolean} True.
 * @package
 * @override
 */
Blockly.FieldProcedure.prototype.referencesProcedures = function() {
  return true;
};

Blockly.fieldRegistry.register('field_procedure', Blockly.FieldProcedure);
