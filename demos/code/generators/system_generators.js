'use strict';

Blockly.Lua['system_start'] = function (block) {
    // TODO: Assemble Lua into code variable.
    var code = 'System.Start()\n';
    return code;
};

Blockly.Lua['system_abort'] = function (block) {
    // TODO: Assemble Lua into code variable.
    var field_abort_type = block.getFieldValue('abort_type');
    if (field_abort_type == '1') {
        var code = 'System.Abort(1)\n';
    } else {
        var code = 'System.Abort()\n';
    }
    var code = 'System.Abort()\n';
    return code;
};

Blockly.Lua['system_stop'] = function (block) {
    var value_robot_index = Blockly.Lua.valueToCode(block, 'robot_index', Blockly.Lua.ORDER_ATOMIC);
    // TODO: Assemble Lua into code variable.
    var code = 'System.Stop(' + value_robot_index + ')\n';
    return code;
};

Blockly.Lua['system_pause'] = function (block) {
    var value_robot_index = Blockly.Lua.valueToCode(block, 'robot_index', Blockly.Lua.ORDER_ATOMIC);
    // TODO: Assemble Lua into code variable.
    var code = 'System.Pause(' + value_robot_index + ')\n';
    return code;
};

Blockly.Lua['system_continue'] = function (block) {
    var value_robot_index = Blockly.Lua.valueToCode(block, 'robot_index', Blockly.Lua.ORDER_ATOMIC);
    // TODO: Assemble Lua into code variable.
    var code = 'System.Continue(' + value_robot_index + ')\n';
    return code;
};

Blockly.Lua['system_retry'] = function (block) {
    var value_robot_index = Blockly.Lua.valueToCode(block, 'robot_index', Blockly.Lua.ORDER_ATOMIC);
    // TODO: Assemble Lua into code variable.
    var code = 'System.Retry(' + value_robot_index + ')\n';
    return code;
};

Blockly.Lua['system_speed_get'] = function (block) {
    // TODO: Assemble Lua into code variable.
    var code = 'System.Speed()';
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.Lua.ORDER_NONE];
};

Blockly.Lua['system_speed_set'] = function (block) {
    var number_speed_value = block.getFieldValue('speed_value');
    // TODO: Assemble Lua into code variable.
    var code = 'System.Speed(' + number_speed_value + ')\n';
    return code;
};

Blockly.Lua['system_login'] = function (block) {
    var dropdown_access_value = block.getFieldValue('access_value');
    // TODO: Assemble Lua into code variable.
    var code = 'System.Login(' + dropdown_access_value + ')\n';
    return code;
};

Blockly.Lua['system_logout'] = function (block) {
    var code = 'System.Logout()\n';
    return code;
};

Blockly.Lua['system_clear_variables'] = function (block) {
    // TODO: Assemble Lua into code variable.
    var code = 'System.ClearVariables()\n';
    return code;
};

Blockly.Lua['system_clear_error'] = function (block) {
    // TODO: Assemble Lua into code variable.
    var code = 'System.ClearError()\n';
    return code;
};

Blockly.Lua['system_auto_set'] = function (block) {
    var dropdown_auto_type = block.getFieldValue('mode_type');
    // TODO: Assemble Lua into code variable.
    if (dropdown_auto_type == 'type_0') {
        var type = '0';
    } else {
        var type = '1';
    }
    var code = 'System.Auto(' + type + ')\n';
    return code;
};

Blockly.Lua['system_auto_get'] = function (block) {
    // TODO: Assemble Lua into code variable.
    var code = 'System.Auto()\n';
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.Lua.ORDER_NONE];
};