'use strict';

Blockly.Blocks['digital_output_set'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(Blockly.Msg["SET_DIGITAL_OUTPUT"]);
        this.appendValueInput("io_index")
            .setCheck("Number")
        this.appendDummyInput()
            .appendField(Blockly.Msg["TO"])
            .appendField(new Blockly.FieldDropdown([[Blockly.Msg["ON"], "state_on"], [Blockly.Msg["OFF"], "state_off"]]), "io_state");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(20);
        this.setTooltip("digital output set function");
        this.setHelpUrl("https://www.qkmtech.com");
    }
};

Blockly.Blocks['digital_iostate_get'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(Blockly.Msg["GET_DIGITAL"])
            .appendField(new Blockly.FieldDropdown([[Blockly.Msg["IN"], "DIN"], [Blockly.Msg["OUT"], "DOUT"]]), "io_mode")
        this.appendValueInput("io_index")
            .setCheck("Number");
        this.setInputsInline(true);
        this.setOutput(true, "null");
        this.setColour(20);
        this.setTooltip("digital input get function");
        this.setHelpUrl("https://www.qkmtech.com");
    }
};

Blockly.Blocks['analog_output_set'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("analog output with:");
        this.appendValueInput("io_index")
            .setCheck("Number")
            .appendField("index");
        this.appendValueInput("io_value")
            .setCheck("Number")
            .appendField("value");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(20);
        this.setTooltip("analog output set function");
        this.setHelpUrl("https://www.qkmtech.com");
    }
};

Blockly.Blocks['analog_input_get'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("analog input with:");
        this.appendValueInput("io_index")
            .setCheck("Number")
            .appendField("index");
        this.appendDummyInput()
            .appendField("get value");
        this.setInputsInline(true);
        this.setOutput(true, "Number");
        this.setColour(20);
        this.setTooltip("analog input get function");
        this.setHelpUrl("https://www.qkmtech.com");
    }
};