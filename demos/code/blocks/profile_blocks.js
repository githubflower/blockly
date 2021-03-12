if(typeof HELP_URL === 'undefined'){
  const HELP_URL = 'https://www.qkmtech.com';
}
const NEW_PROFILE_TOOLTIP = [
    'Speed  规划最大速度',
    'Speed2  特殊轴的峰值运动速度，指定为其公称速度的百分比 （暂不支持）',
    'Accel  加速度',
    'Decel  减速度',
    'AccelRamp  加加速时间',
    'DecelRamp  减减速时间',
    'InRange  到位逼近的阈值',
    'Type  速度类型为末端速度为绝对速度-1/相对速度-0',
    ].join('\n');

Blockly.Blocks['speed_slider'] = {
  // Set the colour of the block.
  init: function() {
    this.appendDummyInput()
        // .appendField('speed:')
        .appendField(new Blockly.FieldSlider('0', this.validator), 'FIELD_SLIDER')
        .appendField('%')

    this.setOutput(true);
    this.setTooltip('speed range: 0% ~ 100%');
    this.setHelpUrl('https://www.youtube.com/watch?v=s2_xaEvcVI0#t=55');
  },
  validator: function(text) {
    // Update the current block's colour to match.
    /*var hue = parseInt(text, 10);
    if (!isNaN(hue)) {
      this.getSourceBlock().setColour(hue);
    }*/
    var speed = parseInt(text, 10);
    if(speed > 100 || speed < 0){
        this.getSourceBlock().setColour('#ff0000');
        return null;
    }else{
        this.getSourceBlock().setColour('#1F7A00');
    }
  },
  mutationToDom: function(workspace) {
    var container = Blockly.utils.xml.createElement('mutation');
    container.setAttribute('colour', this.getColour());
    return container;
  },
  domToMutation: function(container) {
    this.setColour(container.getAttribute('colour'));
  }
};


Blockly.Blocks['new_profile'] = {
    init: function() {
        this.appendValueInput("profile_speed")
            .appendField(new Blockly.FieldImage('/static/blockly/media/speed.svg', 20, 20, null, null, null, {
                background: true,
                rectWidth: 30,
                rectHeight: 30,
                imageX: 5,
                imageY: 3
            }))
            .setCheck("Number")
            .appendField(Blockly.Msg["NEW_PROFILE"])
            .appendField(new Blockly.FieldTextInput("profile", this.validateProfileName), "NAME")
            .appendField(Blockly.Msg["WITH"])
            .appendField("speed");
        this.appendValueInput("profile_speed2")
            .setCheck("Number")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("speed2");
        this.appendValueInput("profile_accel")
            .setCheck("Number")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("accel");
        this.appendValueInput("profile_decel")
            .setCheck("Number")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("decel");
        this.appendValueInput("profile_accel_ramp")
            .setCheck("Number")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("accel ramp");
        this.appendValueInput("profile_decel_ramp")
            .setCheck("Number")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("decel ramp");
        this.appendValueInput("profile_inrange")
            .setCheck("Number")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("in range");
        /*this.appendValueInput("profile_type")
            .setCheck("Number")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("type");*/
        this.appendDummyInput('profile_type')
        .appendField(new Blockly.FieldCheckbox(true), 'PROFILE_TYPE')
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.Msg["USE_ABSOLUTE_SPEED"]);

        this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(60);
        this.setTooltip(NEW_PROFILE_TOOLTIP);
        this.setHelpUrl("https://www.qkmtech.com");
    },
    validateProfileName: function(name) {
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
            var variable = workspace.variableMap_.getVariable(oldName, Blockly.PROFILES_TYPE);
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
    renameProfile: function(oldName, name, block) {

    }
};

Blockly.Blocks['set_profile'] = {
    init: function() {
        this.appendValueInput("profile_value")
            .setCheck("profile")
            .appendField(Blockly.Msg["SET_PROFILE"])
            .appendField(new Blockly.FieldVariable(''), 'VAR')
            .appendField(Blockly.Msg["TO"]);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(290);
        this.setTooltip("change profile function");
        this.setHelpUrl(HELP_URL);
    }
};

Blockly.Blocks['get_profile'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(Blockly.Msg["GET_PROFILE"])
            .appendField(new Blockly.FieldVariable(''), 'VAR');
        this.setOutput(true, "profile");
        this.setColour(290);
        this.setTooltip("get profile function");
        this.setHelpUrl(HELP_URL);
    },
    /*renameProfile: function(oldName, newName, newBlock) {
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

Blockly.Blocks['get_profile_member'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(Blockly.Msg["GET_PROFILE_PROPERTY"])
            .appendField(new Blockly.FieldVariable(''), 'VAR')
            .appendField(new Blockly.FieldDropdown([
                ["speed", "speed"],
                ["speed2", "speed2"],
                ["accel", "accel"],
                ["decel", "decel"],
                ["accel ramp", "accelramp"],
                ["decel ramp", "decelramp"],
                ["in range", "inrange"],
                ["type", "type"]
            ]), "profile_member")
        this.setOutput(true, null);
        this.setColour(290);
        this.setTooltip("get profile function");
        this.setHelpUrl(HELP_URL);
    }
};


Blockly.Blocks['change_profile_member'] = {
    init: function() {
        this.appendValueInput("profile_member_value")
            .setCheck("Number")
            .appendField(Blockly.Msg["SET_PROFILE_PROPERTY"])
            .appendField(new Blockly.FieldVariable(''), 'VAR')
            .appendField(new Blockly.FieldDropdown([
                ["speed", "speed"],
                ["speed2", "speed2"],
                ["accel", "accel"],
                ["decel", "decel"],
                ["accel ramp", "accelramp"],
                ["decel ramp", "decelramp"],
                ["in range", "inrange"],
                ["type", "type"]
            ]), "profile_member")
            .appendField(Blockly.Msg["BY"]);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(290);
        this.setTooltip("change profile function");
        this.setHelpUrl(HELP_URL);
    }
};