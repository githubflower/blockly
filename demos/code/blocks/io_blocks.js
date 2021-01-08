'use strict';

Blockly.Blocks['digital_output_set'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("digital output with:");
        this.appendValueInput("io_index")
            .setCheck("Number")
            .appendField("index");
        this.appendDummyInput()
            .appendField("set")
            .appendField(new Blockly.FieldDropdown([["on", "state_on"], ["off", "state_off"]]), "io_state");
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
            .appendField("digital")
            .appendField(new Blockly.FieldDropdown([["In", "DIN"], ["Out", "DOUT"]]), "io_mode")
            .appendField("with:");
        this.appendValueInput("io_index")
            .setCheck("Number")
            .appendField("index");
        this.appendDummyInput()
            .appendField("get state");
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