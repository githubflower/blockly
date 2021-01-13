'use strict';

Blockly.Blocks['system_start'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("system start");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(330);
        this.setTooltip("system start function");
        this.setHelpUrl("https://www.qkmtech.com");
    }
};

Blockly.Blocks['system_abort'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("system abort")
            .appendField(new Blockly.FieldDropdown([["Now", "0"], ["Motion Done", "1"]]), "abort_type");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(330);
        this.setTooltip("system abort function");
        this.setHelpUrl("https://www.qkmtech.com");
    }
};

Blockly.Blocks['system_stop'] = {
    init: function () {
        this.appendValueInput("robot_index")
            .appendField("system stop")
            .setCheck("Number")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("index");
        this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(330);
        this.setTooltip("system stop function");
        this.setHelpUrl("https://www.qkmtech.com");
    }
};

Blockly.Blocks['system_pause'] = {
    init: function () {
        this.appendValueInput("robot_index")
            .appendField("system pause")
            .setCheck("Number")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("index");
        this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(330);
        this.setTooltip("system pause function");
        this.setHelpUrl("https://www.qkmtech.com");
    }
};

Blockly.Blocks['system_continue'] = {
    init: function () {
        this.appendValueInput("robot_index")
            .appendField("system continue")
            .setCheck("Number")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("index");
        this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(330);
        this.setTooltip("system continue function");
        this.setHelpUrl("https://www.qkmtech.com");
    }
};

Blockly.Blocks['system_retry'] = {
    init: function () {
        this.appendValueInput("robot_index")
            .appendField("system retry")
            .setCheck("Number")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("index");
        this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(330);
        this.setTooltip("system retry function");
        this.setHelpUrl("https://www.qkmtech.com");
    }
};

Blockly.Blocks['system_speed_get'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("system speed get");
        this.setOutput(true, "Number");
        this.setColour(330);
        this.setTooltip("system speed get function");
        this.setHelpUrl("https://www.qkmtech.com");
    }
};

Blockly.Blocks['system_speed_set'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(Blockly.Msg["SET_SYSTEM_SPEED"]);
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(Blockly.Msg["SYSTEM_SPEED"])
            .appendField(new Blockly.FieldSlider(0), "speed_value")
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(330);
        this.setTooltip("system speed set function");
        this.setHelpUrl("https://www.qkmtech.com");
    }
};

Blockly.Blocks['system_login'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("system login with:");
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(new Blockly.FieldDropdown([["Admin", "0"], ["opertator", "1"], ["user", "2"]]), "access_value")
            .appendField("access");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(330);
        this.setTooltip("system login function");
        this.setHelpUrl("https://www.qkmtech.com");
    }
};

Blockly.Blocks['system_logout'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("system logout");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(330);
        this.setTooltip("system logout function");
        this.setHelpUrl("https://www.qkmtech.com");
    }
};

Blockly.Blocks['system_clear_variables'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("system clear variables");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(330);
        this.setTooltip("system clear variables function");
        this.setHelpUrl("https://www.qkmtech.com");
    }
};

Blockly.Blocks['system_clear_error'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("system clear error");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(330);
        this.setTooltip("system clear error function");
        this.setHelpUrl("https://www.qkmtech.com");
    }
};

Blockly.Blocks['system_auto_set'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("system auto set: ");
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("mode")
            .appendField(new Blockly.FieldDropdown([["manual", "type_0"], ["automatic", "type_1"]]), "mode_type");
        this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(330);
        this.setTooltip("system auto set function");
        this.setHelpUrl("https://www.qkmtech.com");
    }
};

Blockly.Blocks['system_auto_get'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("system auto get: ");
        this.setInputsInline(false);
        this.setOutput(true, "Number");
        this.setColour(330);
        this.setTooltip("system auto get function");
        this.setHelpUrl("https://www.qkmtech.com");
    }
};