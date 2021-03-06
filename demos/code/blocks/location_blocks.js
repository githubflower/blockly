'use strict';
const HELP_URL = 'https://www.qkmtech.com';
Blockly.Blocks['new_location'] = {
    init: function() {
        this.appendValueInput("location_x")
            .appendField(new Blockly.FieldImage('../../../blockly/media/location.svg', 20, 20, null, null, null, {
                background: true, /* 是否启用背景-rect元素实现的遮罩，默认是白色，根据实际需要可扩展此配置 */
                rectWidth: 30,
                rectHeight: 30,
                imageX: 5,
                imageY: 3
            }))
            .setCheck("Number")
            // .appendField(Blockly.Msg['CONTROLS_IF_MSG_ELSEIF'])
            .appendField(Blockly.Msg['NEW_LOCATION'])
            .appendField(new Blockly.FieldTextInput("location", this.validateLocationName), "NAME")
            .appendField(Blockly.Msg['WITH'])
            .appendField("X");
        this.appendValueInput("location_y")
            .setCheck("Number")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("Y");
        this.appendValueInput("location_z")
            .setCheck("Number")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("Z");
        this.appendValueInput("location_yaw")
            .setCheck("Number")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("Yaw");
        this.appendValueInput("location_pitch")
            .setCheck("Number")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("Pitch");
        this.appendValueInput("location_roll")
            .setCheck("Number")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("Roll");
        this.appendValueInput("location_config")
            .setCheck("Number")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("Config");
        this.appendValueInput("location_ex1")
            .setCheck("Number")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("Ex1");
        this.appendValueInput("location_ex2")
            .setCheck("Number")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("Ex2");
        this.appendValueInput("location_ex3")
            .setCheck("Number")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("Ex3");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(290);
        this.setTooltip("new location function");
        this.setHelpUrl("https://www.qkmtech.com");
    },
    validateLocationName: function(name) {
        //如果是拖拽时的一个marker block(代表sourceBlock) 则无需进行校验
        if (this.getSourceBlock().isInsertionMarker()) {
            return name;
        }

        name = name.trim();
        var workspace = this.getSourceBlock().workspace;
        // var variableList = this.getSourceBlock().workspace.getAllVariables();
        var findLeagalName = function(name, block) {
            if (block.isInFlyout) {
                return name;
            }
            name = name || Blockly.Msg['UNNAMED_KEY'] || 'unnamed';
            var existing = Blockly.Variables.nameUsedWithAnyType_(name, workspace);
            while (existing) {
                // Collision with another procedure.
                var r = name.match(/^(.*?)(\d+)$/);
                if (!r) {
                    name += '2';
                } else {
                    name = r[1] + (parseInt(r[2], 10) + 1);
                }
                existing = Blockly.Variables.nameUsedWithAnyType_(name, workspace);
            }
            return name;
        }
        name = findLeagalName(name, this.getSourceBlock());
        var oldName = this.getValue();
        if (oldName != name) {
            var variable = workspace.variableMap_.getVariable(oldName, Blockly.LOCATIONS_TYPE);
            if (variable) {
                var blocks = workspace.getAllBlocks(false);
                for (var i = 0; i < blocks.length; i++) {
                    blocks[i].updateVarName(variable)
                }
                if (variable.getId() === this.getSourceBlock().id) {
                    workspace.renameVariableById(variable.getId(), name);
                }
            }
        }
        return name;
    },
    renameLocation: function(oldName, name, block) {

    }
};

Blockly.Blocks['set_location'] = {
    init: function() {
        this.appendValueInput("location_value")
            .setCheck("location")
            .appendField(Blockly.Msg["SET_LOCATION"])
            .appendField(new Blockly.FieldVariable(''), 'VAR')
            .appendField(Blockly.Msg["TO"]);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(290);
        this.setTooltip("change location function");
        this.setHelpUrl(HELP_URL);
    }
};

Blockly.Blocks['get_location'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(Blockly.Msg["GET_LOCATION"])
            .appendField(new Blockly.FieldVariable(''), 'VAR');
        this.setOutput(true, "location");
        this.setColour(290);
        this.setTooltip("get location function");
        this.setHelpUrl(HELP_URL);
    },
    /*renameLocation: function(oldName, newName, newBlock) {
        var fieldVariable = this.getField('field_variable');
        if (Blockly.Names.equals(oldName, fieldVariable.selectedOption_[0])) {
            var variableId = fieldVariable.getValue();
            var variable = this.workspace.variableMap_.getVariableById(variableId);
            if (variableId === newBlock.id) {
                this.workspace.variableMap_.renameVariable(variable, newName);
                fieldVariable.getOptions(false);
                fieldVariable.doValueUpdate_(variable.getId());
            }
        }
    }*/
};



Blockly.Blocks['get_location_member'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(Blockly.Msg["GET_LOCATION_PROPERTY"])
            .appendField(new Blockly.FieldVariable(''), 'VAR')
            .appendField('.')
            .appendField(new Blockly.FieldDropdown([
                ["X", "x"],
                ["Y", "y"],
                ["Z", "z"],
                ["Yaw", "yaw"],
                ["Pitch", "pitch"],
                ["Roll", "roll"],
                ["Config", "config"],
                ["Ext1", "ext1"],
                ["Ext2", "ext2"],
                ["Ext3", "ext3"],
                // ["ZClearance", "zclearance"],
                // ["ZWorld", "zworld"]
            ]), "location_member")
            // .appendField(Blockly.Msg["OF"])
        this.setOutput(true, null);
        this.setColour(290);
        this.setTooltip("get location function");
        this.setHelpUrl(HELP_URL);
    }
};


Blockly.Blocks['change_location_member'] = {
    init: function() {
        this.appendValueInput("location_member_value")
            .setCheck("Number")
            .appendField(Blockly.Msg["SET_LOCATION_PROPERTY"])
            .appendField(new Blockly.FieldVariable(''), 'VAR')
            .appendField('.')
            .appendField(new Blockly.FieldDropdown([
                ["X", "x"],
                ["Y", "y"],
                ["Z", "z"],
                ["Yaw", "yaw"],
                ["Pitch", "pitch"],
                ["Roll", "roll"],
                ["Config", "config"],
                ["Ext1", "ext1"],
                ["Ext2", "ext2"],
                ["Ext3", "ext3"],
                // ["ZClearance", "zclearance"],
                // ["ZWorld", "zworld"]
            ]), "location_member")
            .appendField(Blockly.Msg["BY"]);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(290);
        this.setTooltip("change location function");
        this.setHelpUrl(HELP_URL);
    }
};

//===================  以下内容从ARM那边拉过来的，还未修改  ===========================================================================

Blockly.Blocks['location_to_joint'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("location")
            .appendField(new Blockly.FieldTextInput("name"), "location_name")
            .appendField("to joint");
        this.appendValueInput("robot_index")
            .setCheck("Number")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("robot index");
        this.setOutput(true, "location");
        this.setColour(290);
        this.setTooltip("location to joint function");
        this.setHelpUrl("https://www.qkmtech.com");
    }
};

Blockly.Blocks['location_delete'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("delete location")
            .appendField(new Blockly.FieldTextInput("name"), "location_name");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(290);
        this.setTooltip("delete location function");
        this.setHelpUrl("https://www.qkmtech.com");
    }
};

Blockly.Blocks['location_print'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("print location")
            .appendField(new Blockly.FieldTextInput("name"), "location_name");
        this.setOutput(true, null);
        this.setColour(290);
        this.setTooltip("print location function");
        this.setHelpUrl("https://www.qkmtech.com");
    }
};

Blockly.Blocks['get_location_here'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(Blockly.Msg["GET_LOCATION_HERE"])
        // this.appendDummyInput()
            .appendField(' ' + Blockly.Msg["ROBOT_INDEX"] + ' : ')
            .appendField(new Blockly.FieldTextInput("1"), "ROBOT_INDEX")
        this.setOutput(true, "location");
        this.setColour(290);
        this.setTooltip("get location here");
        this.setHelpUrl(HELP_URL);
    },
};
