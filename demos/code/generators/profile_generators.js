Blockly.Lua['new_profile'] = function(block) {
  var input_profile_name = block.getFieldValue('NAME');
  text_profile_name = Blockly.Names.prototype.safeName_.call(this, input_profile_name);
  var value_profile_speed = Blockly.Lua.valueToCode(block, 'profile_speed', Blockly.Lua.ORDER_ATOMIC);
  var value_profile_speed2 = Blockly.Lua.valueToCode(block, 'profile_speed2', Blockly.Lua.ORDER_ATOMIC);
  var value_profile_accel = Blockly.Lua.valueToCode(block, 'profile_accel', Blockly.Lua.ORDER_ATOMIC);
  var value_profile_decel = Blockly.Lua.valueToCode(block, 'profile_decel', Blockly.Lua.ORDER_ATOMIC);
  var value_profile_accel_ramp = Blockly.Lua.valueToCode(block, 'profile_accel_ramp', Blockly.Lua.ORDER_ATOMIC);
  var value_profile_decel_ramp = Blockly.Lua.valueToCode(block, 'profile_decel_ramp', Blockly.Lua.ORDER_ATOMIC);
  var value_profile_inrange = Blockly.Lua.valueToCode(block, 'profile_inrange', Blockly.Lua.ORDER_ATOMIC);
  // var value_profile_type = Blockly.Lua.valueToCode(block, 'profile_type', Blockly.Lua.ORDER_ATOMIC);
  var value_profile_type = block.getFieldValue('PROFILE_TYPE') === 'TRUE' ? 1 : 0;
  // TODO: Assemble Lua into code variable.
  var code = '--' + input_profile_name + '\n' +
             text_profile_name + ' = ' + 'Profile.New()\n' +
             text_profile_name + '.Speed' + ' = ' + value_profile_speed + '\n' +
             text_profile_name + '.Speed2' + ' = ' + value_profile_speed2 + '\n' +
             text_profile_name + '.Accel' + ' = ' + value_profile_accel + '\n' +
             text_profile_name + '.Decel' + ' = ' + value_profile_decel + '\n' +
             text_profile_name + '.AccelRamp' + ' = ' + value_profile_accel_ramp + '\n' +
             text_profile_name + '.DecelRamp' + ' = ' + value_profile_decel_ramp + '\n' +
             text_profile_name + '.InRange' + ' = ' + value_profile_inrange + '\n' +
             text_profile_name + '.Type' + ' = ' + value_profile_type + '\n';
  return code;
};

Blockly.Lua['get_profile'] = function(block) {
  var text_profile_name = Blockly.Lua.getVarNameOfBlock(block);
  // TODO: Assemble Lua into code variable.
  var code = text_profile_name;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Lua.ORDER_NONE];
};

Blockly.Lua['get_profile_member'] = function(block) {
  var dropdown_profile_member = block.getFieldValue('profile_member');
  var text_profile_name = Blockly.Lua.getVarNameOfBlock(block);
  // TODO: Assemble Lua into code variable.
  var code = text_profile_name + '.' + dropdown_profile_member;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Lua.ORDER_NONE];
};

Blockly.Lua['set_profile'] = function(block) {
  var text_profile_name = Blockly.Lua.getVarNameOfBlock(block);
  var value_profile_value = Blockly.Lua.valueToCode(block, 'profile_value', Blockly.Lua.ORDER_NONE);
  // TODO: Assemble Lua into code variable.
  var code = text_profile_name + '.Speed' + ' = ' + value_profile_value + '.Speed\n' +
             text_profile_name + '.Speed2' + ' = ' + value_profile_value + '.Speed2\n' +
             text_profile_name + '.Accel' + ' = ' + value_profile_value + '.Accel\n' +
             text_profile_name + '.Decel' + ' = ' + value_profile_value + '.Decel\n' +
             text_profile_name + '.AccelRamp' + ' = ' + value_profile_value + '.AccelRamp\n' +
             text_profile_name + '.DecelRamp' + ' = ' + value_profile_value + '.DecelRamp\n' +
             text_profile_name + '.InRange' + ' = ' + value_profile_value + '.InRange\n' +
             text_profile_name + '.Type' + ' = ' + value_profile_value + '.Type\n';
  return code;
};

Blockly.Lua['change_profile_member'] = function(block) {
  var dropdown_profile_member = block.getFieldValue('profile_member');
  var text_profile_name = Blockly.Lua.getVarNameOfBlock(block);
  var value_profile_member_value = Blockly.Lua.valueToCode(block, 'profile_member_value', Blockly.Lua.ORDER_ATOMIC);
  // TODO: Assemble Lua into code variable.
  var code = text_profile_name + '.' + dropdown_profile_member + ' = ' + value_profile_member_value + '\n';
  return code;
};

Blockly.Lua['speed_slider'] = function(block) {
  var value = block.getFieldValue('FIELD_SLIDER');
  return [value, Blockly.Lua.ORDER_ATOMIC]
  // return value;
}