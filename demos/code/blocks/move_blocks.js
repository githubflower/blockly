'use strict';
goog.require('Blockly.FieldButton');
Blockly.Blocks['move_joint'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("move joint with:");
        this.appendValueInput("point_value")
            .setCheck(["location", "location_joint"])
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("point");
        this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(210);
        this.setTooltip("move joint function");
        this.setHelpUrl("https://www.qkmtech.com");
    }
};

Blockly.Blocks['move_line'] = {
    init: function () {
        this.itemCount_ = 1;

        this.appendDummyInput()
            .appendField(new Blockly.FieldImage('/static/blockly/media/move_line.svg', 30, 30, null, null, null, {
                background: true,
                rectWidth: 30,
                rectHeight: 30,
                imageX: 0,
                imageY: 0
            }))
            .appendField(Blockly.Msg["MOVE_LINE"]);
        this.appendValueInput("point_value")
            .setCheck(["location", "location_joint"])
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(Blockly.Msg["LOCATION"]);
        this.appendValueInput("profile_value")
            .setCheck(["profile"])
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(Blockly.Msg["PROFILE"]);
        this.appendDummyInput('blend')
            .appendField(new Blockly.FieldCheckbox(true), 'BLEND')
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(Blockly.Msg["WAIT_FOR_END_OF_MOTION"]);
        
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(
                new Blockly.FieldButton(
                    '\u002B',
                    {
                        class: 'blockly-button',
                        tooltip: Blockly.Msg["ADD_TRIGGER"],
                        clickHandler: function(){
                            if(this.sourceBlock_.mutationToDom){
                                if(this.sourceBlock_.itemCount_ <= 3){
                                    this.sourceBlock_.itemCount_ += 1;
                                }
                                if(this.sourceBlock_.itemCount_ === 4){
                                    this.setDisabled(true);
                                }else{
                                    this.setDisabled(false);
                                }
                                this.sourceBlock_.updateShape_();
                            }
                        }
                    }, 
                ),'ADD_BUTTON'
            )
        this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(210);
        this.setTooltip("move line function");
        this.setHelpUrl("https://www.qkmtech.com");
    },
    mutationToDom: function() {
        var container = Blockly.utils.xml.createElement('mutation');
        container.setAttribute('items', this.itemCount_);
        return container;
    },
    /**
    * Parse XML to restore the list inputs.
    * @param {!Element} xmlElement XML storage element.
    * @this {Blockly.Block}
    */
    domToMutation: function(xmlElement) {
        this.itemCount_ = parseInt(xmlElement.getAttribute('items'), 10);
        this.updateShape_();
    },
    updateShape_: function() {
        // Add new inputs.
        for (var i = 0; i < this.itemCount_; i++) {
            if (!this.getInput('ADD' + i)) {
                var input = this.appendValueInput('ADD' + i)
                    .setAlign(Blockly.ALIGN_RIGHT);
                input.appendField(
                    new Blockly.FieldButton(
                        '\u002d',
                        {
                            class: 'blockly-button',
                            tooltip: Blockly.Msg["DELETE_TRIGGER"],
                            clickHandler: function(){
                                if(this.sourceBlock_.mutationToDom){
                                    if(this.sourceBlock_.itemCount_ > 0){
                                        this.sourceBlock_.itemCount_ -= 1;
                                        var addButtonField = this.sourceBlock_.getField('ADD_BUTTON')
                                        if(addButtonField){
                                            addButtonField.setDisabled(false);
                                        }
                                    }
                                    this.sourceBlock_.updateShape_();
                                }
                            }
                        }, 
                    )
                )
                input.appendField(Blockly.Msg["TRIGGER"] + (i + 1));
                //自动增加一个trigger_block还有问题   后续再完善吧
                // var triggerBlock = this.workspace.newBlock('trigger_block');
                // input.connection.connect(triggerBlock.outputConnection)
            }
        }
        // Remove deleted inputs.
        while (this.getInput('ADD' + i)) {
            this.removeInput('ADD' + i);
            i++;
        }
    }
};

Blockly.Blocks['move_door'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage('/static/blockly/media/move_door.png', 30, 30, null, null, null, {
                background: true,
                rectWidth: 30,
                rectHeight: 30,
                imageX: 0,
                imageY: 0
            }))
            .appendField(Blockly.Msg["MOVE_DOOR"]);
        this.appendValueInput("targetPoint")
            .setCheck(["location", "location_joint"])
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(Blockly.Msg["TARGET_POINT"]);
        this.appendValueInput("rise_height")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(Blockly.Msg["RISE_HEIGHT"]);
        this.appendValueInput('FIRST_TRIGGER')
            .appendField('↑ ' + Blockly.Msg["TRIGGERING"])
            .setAlign(Blockly.ALIGN_RIGHT);
        this.appendValueInput('SECOND_TRIGGER')
            .appendField('↔ ' + Blockly.Msg["TRIGGERING"])
            .setAlign(Blockly.ALIGN_RIGHT);
        this.appendValueInput('THIRD_TRIGGER')
            .appendField('↓ ' + Blockly.Msg["TRIGGERING"])
            .setAlign(Blockly.ALIGN_RIGHT);
        this.appendDummyInput('blend')
            .appendField(new Blockly.FieldCheckbox(true), 'BLEND')
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(Blockly.Msg["WAIT_FOR_END_OF_MOTION"]);
        this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(210);
        this.setTooltip("MOVE_DOOR_TOOLTIP");
        this.setHelpUrl("https://www.qkmtech.com");
    }
};

Blockly.Blocks['move_axis'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("move axis with:");
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("axis")
            .appendField(new Blockly.FieldDropdown([["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"], ["6", "6"], ["7", "7"], ["8", "8"], ["9", "9"]]), "axis_index");
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("angle")
            .appendField(new Blockly.FieldNumber(0, -360, 360, 0.01), "angle_value");
        this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(210);
        this.setTooltip("move axis function");
        this.setHelpUrl("https://www.qkmtech.com");
    }
};

Blockly.Blocks['move_joint_offset'] = {
    init: function () {
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("move joint offset with:");
        this.appendValueInput("x_value")
            .setCheck("Number")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("x");
        this.appendValueInput("y_value")
            .setCheck("Number")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("y");
        this.appendValueInput("z_value")
            .setCheck("Number")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("z");
        this.appendValueInput("piont_value")
            .setCheck(["location", "location_joint"])
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("point");
        this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(210);
        this.setTooltip("move joint offset function");
        this.setHelpUrl("https://www.qkmtech.com");
    }
};

Blockly.Blocks['move_line_offset'] = {
    init: function () {
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("move line offset with:");
        this.appendValueInput("x_value")
            .setCheck("Number")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("x");
        this.appendValueInput("y_value")
            .setCheck("Number")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("y");
        this.appendValueInput("z_value")
            .setCheck("Number")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("z");
        this.appendValueInput("piont_value")
            .setCheck(["location", "location_joint"])
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("point");
        this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(210);
        this.setTooltip("move line offset function");
        this.setHelpUrl("https://www.qkmtech.com");
    }
};

Blockly.Blocks['move_arc'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("move arc with:");
        this.appendValueInput("piont1_value")
            .setCheck(["location", "location_joint"])
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("point1");
        this.appendValueInput("piont2_value")
            .setCheck(["location", "location_joint"])
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("point2");
        this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(210);
        this.setTooltip("move arc function");
        this.setHelpUrl("https://www.qkmtech.com");
    }
};

Blockly.Blocks['move_circle'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("move circle with:");
        this.appendValueInput("piont1_value")
            .setCheck(["location", "location_joint"])
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("point1");
        this.appendValueInput("piont2_value")
            .setCheck(["location", "location_joint"])
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("point2");
        this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(210);
        this.setTooltip("move circle function");
        this.setHelpUrl("https://www.qkmtech.com");
    }
};

Blockly.Blocks['move_jog'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("move jog with:");
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("axis")
            .appendField(new Blockly.FieldDropdown([["X", "X"], ["Y", "Y"], ["Z", "Z"], ["Yaw", "Yaw"], ["Pitch", "Pitch"], ["Roll", "Roll"], ["J1", "J1"], ["J2", "J2"], ["J3", "J3"], ["J4", "J4"], ["J5", "J5"], ["J6", "J6"], ["J7", "J7"], ["J8", "J8"], ["J9", "J9"]]), "axis_index");
        this.appendValueInput("speed_value")
            .setCheck("Number")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("jog speed");
        this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(210);
        this.setTooltip("move jog function");
        this.setHelpUrl("https://www.qkmtech.com");
    }
};

Blockly.Blocks['move_stop_jog'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("move stop jog");
        this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(210);
        this.setTooltip("move stop jog function");
        this.setHelpUrl("https://www.qkmtech.com");
    }
};

Blockly.Blocks['move_trigger'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("move trigger with:");
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("type")
            .appendField(new Blockly.FieldDropdown([["time percentage", "type_t_p"], ["time", "type_t"], ["distance percentage", "type_d_p"], ["distance", "type_d"]]), "type_value");
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("reference position")
            .appendField(new Blockly.FieldDropdown([["start", "r_p_start"], ["end", "r_p_end"], ["specific", "r_p_specific"]]), "reference_position_value");
        this.appendValueInput("distance_value")
            .setCheck("Number")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("distance");
        this.appendValueInput("do_index")
            .setCheck("Number")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("DO index");
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("DO status")
            .appendField(new Blockly.FieldDropdown([["on", "status_on"], ["off", "status_off"]]), "do_status");
        this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(210);
        this.setTooltip("move trigger function");
        this.setHelpUrl("https://www.qkmtech.com");
    }
};

Blockly.Blocks['move_jump'] = {
    init: function () {
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("move jump with:");
        this.appendValueInput("point_value")
            .setCheck(["location", "location_joint"])
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("point");
        this.appendValueInput("height_value")
            .setCheck("Number")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("height");
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("trigger ID1")
            .appendField(new Blockly.FieldDropdown([["1", "1"], ["2", "2"], ["3", "3"]]), "trigger_id1_value");
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("trigger ID2")
            .appendField(new Blockly.FieldDropdown([["1", "1"], ["2", "2"], ["3", "3"]]), "trigger_id2_value");
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("trigger ID3")
            .appendField(new Blockly.FieldDropdown([["1", "1"], ["2", "2"], ["3", "3"]]), "trigger_id3_value");
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("trigger ID4")
            .appendField(new Blockly.FieldDropdown([["1", "1"], ["2", "2"], ["3", "3"]]), "trigger_id4_value");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(210);
        this.setTooltip("move jump function");
        this.setHelpUrl("https://www.qkmtech.com");
    }
};

Blockly.Blocks['move_blend'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("move blend with:");
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("blending mode")
            .appendField(new Blockly.FieldDropdown([["percentage", "mode_1"], ["distance", "mode_2"], ["null", "mode_3"]]), "mode_value");
        this.appendValueInput("blending_value")
            .setCheck("Number")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("value");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(210);
        this.setTooltip("move blend function");
        this.setHelpUrl("https://www.qkmtech.com");
    }
};

Blockly.Blocks['move_wait_for_eom'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("move wait for EOM");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(210);
        this.setTooltip("move wait for EOM function");
        this.setHelpUrl("https://www.qkmtech.com");
    }
};