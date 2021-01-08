'use strict';

Blockly.Blocks['new_user_frame'] = {
    init: function () {
        this.appendValueInput("user_frame_x")
            .setCheck("Number")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("new user frame")
            .appendField(new Blockly.FieldTextInput("name"), "frame_name")
            .appendField("with")
            .appendField("x");
        this.appendValueInput("user_frame_y")
            .setCheck("Number")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("y");
        this.appendValueInput("user_frame_z")
            .setCheck("Number")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("z");
        this.appendValueInput("user_frame_yaw")
            .setCheck("Number")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("yaw");
        this.appendValueInput("user_frame_pitch")
            .setCheck("Number")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("pitch");
        this.appendValueInput("user_frame_roll")
            .setCheck("Number")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("roll");
        this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(240);
        this.setTooltip("set user frame function");
        this.setHelpUrl("https://www.qkmtech.com");
    }
};

Blockly.Blocks['get_user_frame'] = {
    init: function () {
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("get  user frame")
            .appendField(new Blockly.FieldTextInput("name"), "user_frame_name");
        this.setOutput(true, "user_frame");
        this.setColour(240);
        this.setTooltip("get user frame function");
        this.setHelpUrl("https://www.qkmtech.com");
    }
};

Blockly.Blocks['change_user_frame_member'] = {
    init: function () {
        this.appendValueInput("user_frame_member_value")
            .setCheck("Number")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("change member")
            .appendField(new Blockly.FieldDropdown([["x", "x"], ["y", "y"], ["z", "z"], ["yaw", "yaw"], ["pitch", "pitch"], ["roll", "roll"]]), "user_frame_member")
            .appendField("of user frame")
            .appendField(new Blockly.FieldTextInput("name"), "user_frame_name")
            .appendField("by");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(240);
        this.setTooltip("change user frame member function");
        this.setHelpUrl("https://www.qkmtech.com");
    }
};

Blockly.Blocks['get_user_frame_member'] = {
    init: function () {
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("get member")
            .appendField(new Blockly.FieldDropdown([["x", "x"], ["y", "y"], ["z", "z"], ["yaw", "yaw"], ["pitch", "pitch"], ["roll", "roll"]]), "user_frame_member")
            .appendField("of user frame")
            .appendField(new Blockly.FieldTextInput("name"), "user_frame_name");
        this.setOutput(true, "Number");
        this.setColour(240);
        this.setTooltip("get user frame member function");
        this.setHelpUrl("https://www.qkmtech.com");
    }
};

Blockly.Blocks['user_frame_delete'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("delete user frame")
            .appendField(new Blockly.FieldTextInput("name"), "user frame_name");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(240);
        this.setTooltip("delete user frame function");
        this.setHelpUrl("https://www.qkmtech.com");
    }
};

Blockly.Blocks['user_frame_print'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("print user frame")
            .appendField(new Blockly.FieldTextInput("name"), "user_frame_name");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(240);
        this.setTooltip("print user frame function");
        this.setHelpUrl("https://www.qkmtech.com");
    }
};