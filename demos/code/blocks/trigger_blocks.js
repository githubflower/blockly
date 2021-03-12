Blockly.Blocks['trigger'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage('/static/blockly/media/trigger.png', 20, 20, null, null, null, {
                background: true,
                rectWidth: 30,
                rectHeight: 30,
                imageX: 5,
                imageY: 5
            }))
            .appendField(Blockly.Msg["TRIGGER_TYPE"])//触发模式
            .appendField(new Blockly.FieldDropdown(
                [
                    [Blockly.Msg["TRIGGER_TYPE_TIME_PERCENT"], "1"], 
                    [Blockly.Msg["TRIGGER_TYPE_TIME"], "2"],
                    [Blockly.Msg["TRIGGER_TYPE_DISTANCE_PERCENT"], "3"],
                    [Blockly.Msg["TRIGGER_TYPE_DISTANCE"], "4"],
                ]
            ), "TRIGGER_TYPE")
            .setAlign(Blockly.ALIGN_LEFT);
            // .setAlign(Blockly.ALIGN_RIGHT);
        this.appendDummyInput()
            .appendField(Blockly.Msg["TRIGGER_RELATIVE"])//触发参考点
            .appendField(
                new Blockly.FieldDropdown(
                    [
                        [Blockly.Msg["TRIGGER_RELATIVE_START_POINT"], "1"], 
                        [Blockly.Msg["TRIGGER_RELATIVE_END_POINT"], "2"],
                        [Blockly.Msg["TRIGGER_RELATIVE_THE_POINT"], "3"],
                    ]
                ), 
                "TRIGGER_RELATIVE"
            )
            // .setCheck(["location", "location_joint"])
            .setAlign(Blockly.ALIGN_RIGHT);
        
        /* this.appendValueInput('TRIGGER_VALUE')
            .appendField(Blockly.Msg['TRIGGER_VALUE_DESC'], 'TRIGGER_VALUE')
            .setAlign(Blockly.ALIGN_RIGHT);
            .setCheck('Number'); */
        this.appendDummyInput()
            .appendField(Blockly.Msg['TRIGGER_VALUE_DESC'])
            .appendField(new Blockly.FieldTextInput(0), "TRIGGER_VALUE")
            .setAlign(Blockly.ALIGN_RIGHT);
        //后续IO管理功能完善后修改为下拉选择IO地址
        this.appendDummyInput()
            .appendField(Blockly.Msg['IO_INDEX_DESC'])
            .appendField(new Blockly.FieldTextInput("DOUT[20001]"), "IO_INDEX")
            .setAlign(Blockly.ALIGN_RIGHT);
        this.appendDummyInput()
            .appendField(Blockly.Msg["TRIGGER_IO_STATUS"])
            .appendField(
                new Blockly.FieldDropdown(
                    [
                        [Blockly.Msg["ON"], '1'],
                        [Blockly.Msg["OFF"], '0'],
                    ]
                ),
                "TRIGGER_IO_STATUS"
            )
            .setAlign(Blockly.ALIGN_RIGHT);
        this.setInputsInline(false);
        this.setOutput(true);
        this.setColour(210);
        this.setTooltip(Blockly.Msg["TRIGGER_TOOLTIP"]);
        this.setHelpUrl("https://www.qkmtech.com");
    }
};