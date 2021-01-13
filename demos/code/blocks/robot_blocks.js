'use strict';

Blockly.Blocks['robot_power_enable'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("robot power enable with: ");
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("state")
            .appendField(new Blockly.FieldDropdown([["true", "power_enable_on"], ["false", "power_enable_off"]]), "power_enable_state");
        this.appendValueInput("robot_index")
            .setCheck("Number")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("index");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(120);
        this.setTooltip("robot power enable function");
        this.setHelpUrl("https://www.qkmtech.com");
    }
};

Blockly.Blocks['robot_home'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("robot home: with");
        this.appendValueInput("robot_index")
            .setCheck("Number")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("index");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(120);
        this.setTooltip("robot home function");
        this.setHelpUrl("https://www.qkmtech.com");
    }
};

Blockly.Blocks['robot_auto_set'] = {
    init: function () {
        this.appendValueInput("robot_index")
            .appendField("robot auto set")
            .setCheck("Number")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("index");
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(new Blockly.FieldDropdown([["manual mode", "type_0"], ["automatic mode", "type_1"]]), "mode_type");
        this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(120);
        this.setTooltip("robot auto set function");
        this.setHelpUrl("https://www.qkmtech.com");
    }
};

Blockly.Blocks['robot_auto_get'] = {
    init: function () {
        this.appendValueInput("robot_index")
            .appendField("robot auto get")
            .setCheck("Number")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("index");
        this.setInputsInline(false);
        this.setOutput(true, "Number");
        this.setColour(120);
        this.setTooltip("robot auto get function");
        this.setHelpUrl("https://www.qkmtech.com");
    }
};

Blockly.Blocks['robot_brake_set'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("robot brake set with: ");
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("brake")
            .appendField(new Blockly.FieldDropdown([["free", "brake_free"], ["unfree", "brake_unfree"]]), "brake_state");
        this.appendValueInput("robot_index")
            .setCheck("Number")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("index");
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("axis")
            .appendField(new Blockly.FieldDropdown([["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"], ["6", "6"], ["7", "7"], ["8", "8"], ["9", "9"], ["all", "0"]]), "axis_index");
        this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(120);
        this.setTooltip("robot brake set function");
        this.setHelpUrl("https://www.qkmtech.com");
    }
};

Blockly.Blocks['robot_brake_get'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("robot brake state get with: ");
        this.appendValueInput("robot_index")
            .setCheck("Number")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("index");
        this.setOutput(true, "Array");
        this.setColour(120);
        this.setTooltip("robot brake get function");
        this.setHelpUrl("https://www.qkmtech.com");
    }
};

Blockly.Blocks['robot_where'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("robot where with: ");
        this.appendValueInput("robot_index")
            .setCheck("Number")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("index");
        this.setOutput(true, "location");
        this.setColour(120);
        this.setTooltip("robot where function");
        this.setHelpUrl("https://www.qkmtech.com");
    }
};

Blockly.Blocks['robot_where_angle'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("robot where angle with: ");
        this.appendValueInput("robot_index")
            .setCheck("Number")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("index");
        this.setOutput(true, "location_joint");
        this.setColour(120);
        this.setTooltip("robot where angle function");
        this.setHelpUrl("https://www.qkmtech.com");
    }
};

Blockly.Blocks['robot_limit_set'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("robot limit set with:");
        this.appendValueInput("robot_index")
            .setCheck("Number")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("index");
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("axis")
            .appendField(new Blockly.FieldDropdown([["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"], ["6", "6"], ["7", "7"], ["8", "8"], ["9", "9"]]), "axis_index");
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("positive")
            .appendField(new Blockly.FieldAngle(0), "angle_p");
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("nagetive")
            .appendField(new Blockly.FieldAngle(30), "angle_n");
        this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(120);
        this.setTooltip("robot limit set function");
        this.setHelpUrl("https://www.qkmtech.com");
    }
};

Blockly.Blocks['robot_limit_get'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("robot limit get with:");
        this.appendValueInput("robot_index")
            .setCheck("Number")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("index");
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("axis")
            .appendField(new Blockly.FieldDropdown([["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"], ["6", "6"], ["7", "7"], ["8", "8"], ["9", "9"]]), "axis_index");
        this.setInputsInline(false);
        this.setOutput(true, "Array");
        this.setColour(120);
        this.setTooltip("robot limit get function");
        this.setHelpUrl("https://www.qkmtech.com");
    }
};

Blockly.Blocks['robot_frame_set'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("robot frame set with:");
        this.appendValueInput("robot_index")
            .setCheck("Number")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("index");
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("type")
            .appendField(new Blockly.FieldDropdown([["joint", "type_1"], ["world", "type_2"], ["tool", "type_3"], ["user frame", "type_4"]]), "frame_type");
        this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(120);
        this.setTooltip("robot frame set function");
        this.setHelpUrl("https://www.qkmtech.com");
    }
};

Blockly.Blocks['robot_frame_get'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("robot frame get with:");
        this.appendValueInput("robot_index")
            .setCheck("Number")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("index");
        this.setInputsInline(false);
        this.setOutput(true, "Number");
        this.setColour(120);
        this.setTooltip("robot frame get function");
        this.setHelpUrl("https://www.qkmtech.com");
    }
};

Blockly.Blocks['robot_axis_number_get'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("robot axis number get with:");
        this.appendValueInput("robot_index")
            .setCheck("Number")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("index");
        this.setInputsInline(false);
        this.setOutput(true, "Number");
        this.setColour(120);
        this.setTooltip("robot axis number get function");
        this.setHelpUrl("https://www.qkmtech.com");
    }
};

Blockly.Blocks['robot_speed_set'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(Blockly.Msg["SET_ROBOT_SPEED"]);
        this.appendValueInput("robot_index")
            .setCheck("Number")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(Blockly.Msg["ROBOT_INDEX"]);
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(Blockly.Msg["ROBOT_SPEED"])
            .appendField(new Blockly.FieldSlider(0), "speed_value")
        this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(120);
        this.setTooltip("robot speed set function");
        this.setHelpUrl("https://www.qkmtech.com");
    }
};

Blockly.Blocks['robot_speed_get'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("robot speed get with:");
        this.appendValueInput("robot_index")
            .setCheck("Number")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("index");
        this.setInputsInline(false);
        this.setOutput(true, "Number");
        this.setColour(120);
        this.setTooltip("robot speed get function");
        this.setHelpUrl("https://www.qkmtech.com");
    }
};

Blockly.Blocks['robot_state_get'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("robot serve/home/running state get with:");
        this.appendValueInput("robot_index")
            .setCheck("Number")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("index");
        this.setInputsInline(false);
        this.setOutput(true, "Array");
        this.setColour(120);
        this.setTooltip("robot serve/home/running state get function");
        this.setHelpUrl("https://www.qkmtech.com");
    }
};

Blockly.Blocks['robot_jog_mode_set'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("robot jog mode set with:");
        this.appendValueInput("robot_index")
            .setCheck("Number")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("index");
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("mode")
            .appendField(new Blockly.FieldDropdown([["continue", "type_0"], ["step", "type_1"]]), "mode_type");
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("switch")
            .appendField(new Blockly.FieldDropdown([["on", "type_0"], ["off", "type_1"]]), "switch_type");
        this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(120);
        this.setTooltip("robot jog mode set function");
        this.setHelpUrl("https://www.qkmtech.com");
    }
};

Blockly.Blocks['robot_jog_mode_get'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("robot jog mode get with:");
        this.appendValueInput("robot_index")
            .setCheck("Number")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("index");
        this.setInputsInline(false);
        this.setOutput(true, "Array");
        this.setColour(120);
        this.setTooltip("robot jog mode get function");
        this.setHelpUrl("https://www.qkmtech.com");
    }
};

Blockly.Blocks['robot_jog_distance_set'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("robot jog distance set with:");
        this.appendValueInput("robot_index")
            .setCheck("Number")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("index");
        this.appendValueInput("distance_value")
            .setCheck("Number")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("distance");
        this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(120);
        this.setTooltip("robot jog distance set function");
        this.setHelpUrl("https://www.qkmtech.com");
    }
};

Blockly.Blocks['robot_jog_distance_get'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("robot jog distance get with:");
        this.appendValueInput("robot_index")
            .setCheck("Number")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("index");
        this.setInputsInline(false);
        this.setOutput(true, "Number");
        this.setColour(120);
        this.setTooltip("robot jog distance get function");
        this.setHelpUrl("https://www.qkmtech.com");
    }
};

Blockly.Blocks['robot_calibrate_set'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("robot calibrate set with:");
        this.appendValueInput("robot_index")
            .setCheck("Number")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("index");
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("axis")
            .appendField(new Blockly.FieldDropdown([["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"], ["6", "6"], ["7", "7"], ["8", "8"], ["9", "9"]]), "axis_index");
        this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(120);
        this.setTooltip("robot calibrate set function");
        this.setHelpUrl("https://www.qkmtech.com");
    }
};

Blockly.Blocks['robot_tool_set'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("robot tool set with:");
        this.appendValueInput("robot_index")
            .setCheck("Number")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("index");
        this.appendValueInput("tool_name")
            .setCheck("tool")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("tool");
        this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(120);
        this.setTooltip("robot tool set function");
        this.setHelpUrl("https://www.qkmtech.com");
    }
};

Blockly.Blocks['robot_tool_get'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("robot tool get with:");
        this.appendValueInput("robot_index")
            .setCheck("Number")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("index");
        this.setInputsInline(false);
        this.setOutput(true, "tool");
        this.setColour(120);
        this.setTooltip("robot tool get function");
        this.setHelpUrl("https://www.qkmtech.com");
    }
};

Blockly.Blocks['robot_user_frame_set'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("robot user frame set with:");
        this.appendValueInput("robot_index")
            .setCheck("Number")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("index");
        this.appendValueInput("user_frame_name")
            .setCheck("user_frame")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("user frame name");
        this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(120);
        this.setTooltip("robot user frame set function");
        this.setHelpUrl("https://www.qkmtech.com");
    }
};

Blockly.Blocks['robot_user_frame_get'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("robot user frame get with:");
        this.appendValueInput("robot_index")
            .setCheck("Number")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("index");
        this.setInputsInline(false);
        this.setOutput(true, "user_frame");
        this.setColour(120);
        this.setTooltip("robot user frame get function");
        this.setHelpUrl("https://www.qkmtech.com");
    }
};