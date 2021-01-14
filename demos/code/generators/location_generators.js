Blockly.Lua.getVarNameOfBlock = function(block){
  var variable = Blockly.Lua.variableDB_.variableMap_.getVariableById(block.getFieldValue('VAR')) || '';
  var variableName;
  if(variable){
    variableName = variable.name;
    variableName = Blockly.Names.prototype.safeName_.call(this, variableName);//解决中文问题
  }else{
    console.error('变量id有误');
  }
  return variableName;
}

Blockly.Lua['new_location'] = function(block) {
  var input_location_name = block.getFieldValue('NAME');
  text_location_name = Blockly.Names.prototype.safeName_.call(this, input_location_name);
  var value_location_x = Blockly.Lua.valueToCode(block, 'location_x', Blockly.Lua.ORDER_ATOMIC);
  var value_location_y = Blockly.Lua.valueToCode(block, 'location_y', Blockly.Lua.ORDER_ATOMIC);
  var value_location_z = Blockly.Lua.valueToCode(block, 'location_z', Blockly.Lua.ORDER_ATOMIC);
  var value_location_yaw = Blockly.Lua.valueToCode(block, 'location_yaw', Blockly.Lua.ORDER_ATOMIC);
  var value_location_pitch = Blockly.Lua.valueToCode(block, 'location_pitch', Blockly.Lua.ORDER_ATOMIC);
  var value_location_roll = Blockly.Lua.valueToCode(block, 'location_roll', Blockly.Lua.ORDER_ATOMIC);
  var value_location_config = Blockly.Lua.valueToCode(block, 'location_config', Blockly.Lua.ORDER_ATOMIC);
  var value_location_ex1 = Blockly.Lua.valueToCode(block, 'location_ex1', Blockly.Lua.ORDER_ATOMIC);
  var value_location_ex2 = Blockly.Lua.valueToCode(block, 'location_ex2', Blockly.Lua.ORDER_ATOMIC);
  var value_location_ex3 = Blockly.Lua.valueToCode(block, 'location_ex3', Blockly.Lua.ORDER_ATOMIC);
  // TODO: Assemble Lua into code variable.
  var code = '--' + input_location_name + '\n' +
             text_location_name + ' = ' + 'Location.New()\n' +
             text_location_name + '.X ' + ' = ' + value_location_x + '\n' +
             text_location_name + '.Y' + ' = ' + value_location_y + '\n'+
             text_location_name + '.Z' + ' = ' + value_location_z + '\n' +
             text_location_name + '.Yaw' + ' = ' + value_location_yaw + '\n' +
             text_location_name + '.Pitch' + ' = ' + value_location_pitch + '\n' + 
             text_location_name + '.Roll' + ' = ' + value_location_roll + '\n' + 
             text_location_name + '.Config' + ' = ' + value_location_config + '\n' +
             text_location_name + '.Ext1' + ' = ' + value_location_ex1 + '\n' +
             text_location_name + '.Ext2' + ' = ' + value_location_ex2 + '\n' +
             text_location_name + '.Ext3' + ' = ' + value_location_ex3 + '\n';
  return code;
};

Blockly.Lua['get_location'] = function(block) {
  var text_location_name = Blockly.Lua.getVarNameOfBlock(block);
  // TODO: Assemble Lua into code variable.
  var code = text_location_name;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Lua.ORDER_NONE];
};

Blockly.Lua['get_location_member'] = function(block) {
  var dropdown_location_member = block.getFieldValue('location_member');
  var text_location_name = Blockly.Lua.getVarNameOfBlock(block);
  // TODO: Assemble Lua into code variable.
  var code = text_location_name + '.' + dropdown_location_member;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Lua.ORDER_NONE];
};

Blockly.Lua['set_location'] = function(block) {
  var text_location_name = Blockly.Lua.getVarNameOfBlock(block);
  var value_location_value = Blockly.Lua.valueToCode(block, 'location_value', Blockly.Lua.ORDER_NONE);
  // TODO: Assemble Lua into code variable.
  var code = text_location_name + '.x ' + ' = ' + value_location_value + '.x\n' +
           text_location_name + '.y' + ' = ' + value_location_value + '.y\n' +
           text_location_name + '.z' + ' = ' + value_location_value + '.z\n' +
           text_location_name + '.yaw' + ' = ' + value_location_value + '.yaw\n' +
           text_location_name + '.pitch' + ' = ' + value_location_value + '.pitch\n' +
           text_location_name + '.roll' + ' = ' + value_location_value + '.roll\n' +
           text_location_name + '.config' + ' = ' + value_location_value + '.config\n' +
           text_location_name + '.ext1' + ' = ' + value_location_value + '.ext1\n' +
           text_location_name + '.ext2' + ' = ' + value_location_value + '.ext2\n' +
           text_location_name + '.ext3' + ' = ' + value_location_value + '.ext3\n';
           // text_location_name + '.zclearance' + ' = ' + value_location_value + '.zclearance\n' +
           // text_location_name + '.zworld' + ' = ' + value_location_value + '.zworld\n';
  return code;
};

Blockly.Lua['change_location_member'] = function(block) {
  var dropdown_location_member = block.getFieldValue('location_member');
  // var text_location_name = block.getFieldValue('VAR');
  var text_location_name = Blockly.Lua.getVarNameOfBlock(block);
  var value_location_member_value = Blockly.Lua.valueToCode(block, 'location_member_value', Blockly.Lua.ORDER_ATOMIC);
  // TODO: Assemble Lua into code variable.
  var code = text_location_name + '.' + dropdown_location_member + ' = ' + value_location_member_value + '\n';
  return code;
};