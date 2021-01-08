Blockly.Lua['set_user_frame'] = function (block) {
    var text_frame_name = block.getFieldValue('frame_name');
    var value_user_frame_x = Blockly.Lua.valueToCode(block, 'user_frame_x', Blockly.Lua.ORDER_ATOMIC);
    var value_user_frame_y = Blockly.Lua.valueToCode(block, 'user_frame_y', Blockly.Lua.ORDER_ATOMIC);
    var value_user_frame_z = Blockly.Lua.valueToCode(block, 'user_frame_z', Blockly.Lua.ORDER_ATOMIC);
    var value_user_frame_yaw = Blockly.Lua.valueToCode(block, 'user_frame_yaw', Blockly.Lua.ORDER_ATOMIC);
    var value_user_frame_pitch = Blockly.Lua.valueToCode(block, 'user_frame_pitch', Blockly.Lua.ORDER_ATOMIC);
    var value_user_frame_roll = Blockly.Lua.valueToCode(block, 'user_frame_roll', Blockly.Lua.ORDER_ATOMIC);
    // TODO: Assemble Lua into code variable.
    var code = text_frame_name + ' = ' + 'UserFrame.new(' +
        value_user_frame_x + ',' +
        value_user_frame_y + ',' +
        value_user_frame_z + ',' +
        value_user_frame_yaw + ',' +
        value_user_frame_pitch + ',' +
        value_user_frame_roll + ')' + '\n';
    return code;
};

Blockly.Lua['get_user_frame'] = function (block) {
    var text_user_frame_name = block.getFieldValue('user_frame_name');
    // TODO: Assemble Lua into code variable.
    var code = text_user_frame_name;
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.Lua.ORDER_NONE];
};

Blockly.Lua['change_user_frame_member'] = function (block) {
    var dropdown_user_frame_member = block.getFieldValue('user_frame_member');
    var text_user_frame_name = block.getFieldValue('user_frame_name');
    var value_user_frame_member_value = Blockly.Lua.valueToCode(block, 'user_frame_member_value', Blockly.Lua.ORDER_ATOMIC);
    // TODO: Assemble Lua into code variable.
    var code = text_user_frame_name + '.' + dropdown_user_frame_member + ' = ' + value_user_frame_member_value + '\n';
    return code;
};

Blockly.Lua['get_user_frame_member'] = function (block) {
    var dropdown_user_frame_member = block.getFieldValue('user_frame_member');
    var text_user_frame_name = block.getFieldValue('user_frame_name');
    // TODO: Assemble Lua into code variable.
    var code = text_user_frame_name + '.' + dropdown_user_frame_member;
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.Lua.ORDER_NONE];
};