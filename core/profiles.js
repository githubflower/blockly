goog.provide('Blockly.Profiles');

goog.require('Blockly.Blocks');
goog.require('Blockly.Msg');
goog.require('Blockly.utils');
goog.require('Blockly.utils.xml');
goog.require('Blockly.VariableModel');
goog.require('Blockly.Xml');


Blockly.Profiles.NAME_TYPE = Blockly.PROFILE_CATEGORY_NAME;
Blockly.Profiles.type = 'profile';
Blockly.Profiles.flyoutCategory = function(workspace) {
	var xmlList = [];
	var button = document.createElement('button');
	button.setAttribute('text', '%{BKY_NEW_VARIABLE}');
	button.setAttribute('callbackKey', 'CREATE_VARIABLE_PROFILE');

	workspace.registerButtonCallback('CREATE_VARIABLE_PROFILE', function(button) {
		Blockly.Variables.createVariableButtonHandler(button.getTargetWorkspace(), null, Blockly.Profiles.type);
	});

	xmlList.push(button);

	var blockList = Blockly.Profiles.flyoutCategoryBlocks(workspace);
	xmlList = xmlList.concat(blockList);
	return xmlList;
};

Blockly.Profiles.flyoutCategoryBlocks = function(workspace) {
	var variableModelList = workspace.getVariablesOfType(Blockly.Profiles.type);
	var xmlList = [];
	if (Blockly.Blocks['new_profile']) {
		var block = Blockly.utils.xml.createElement('block');
		block.setAttribute('type', 'new_profile');
		block.setAttribute('gap', Blockly.Blocks['math_change'] ? 8 : 24);
		var properties = ["profile_speed", "profile_speed2", "profile_accel", "profile_decel", "profile_accel_ramp", "profile_decel_ramp", "profile_inrange", "profile_type"];
		var useSliderAry = ["profile_speed", "profile_speed2", "profile_accel", "profile_decel"];
		for (var i = 0; i < properties.length; i++) {
			var value;
			switch (properties[i]) {
				case "profile_speed":
				case "profile_speed2":
				case "profile_accel":
				case "profile_decel":
					value = Blockly.Xml.textToDom(
						'<value name="' + properties[i] + '">' +
						'<shadow type="speed_slider">' +
						'<field name="FIELD_SLIDER">0</field>' +
						'</shadow>' +
						'</value>');
					break;
				case 'profile_type':
					value = Blockly.Xml.textToDom(
						'<value name="' + properties[i] + '">' +
						'</value>');
					break;
				case "profile_accel_ramp":
				case "profile_decel_ramp":
				case "profile_inrange":
					value = Blockly.Xml.textToDom(
						'<value name="' + properties[i] + '">' +
						'<shadow type="math_number">' +
						'<field name="NUM">0</field>' +
						'</shadow>' +
						'</value>');
					break;
				default:
					//do none
			}
			block.appendChild(value);
		}
		xmlList.push(block);

	}
	if (variableModelList.length > 0) {
		// New variables are added to the end of the variableModelList.
		var mostRecentVariable = variableModelList[variableModelList.length - 1];
		if (Blockly.Blocks['get_profile']) {
			if (variableModelList.length) {
				var block = Blockly.utils.xml.createElement('block');
				block.setAttribute('type', 'get_profile');
				block.setAttribute('variabletype', Blockly.Profiles.type);
				block.setAttribute('gap', 8);
				block.appendChild(Blockly.Variables.generateVariableFieldDom(mostRecentVariable));
				xmlList.push(block);
			}
		}

		if (Blockly.Blocks['set_profile']) {
			if (variableModelList.length) {
				var block = Blockly.utils.xml.createBlockDom('set_profile', {
					variabletype: Blockly.Profiles.type,
					gap: 8
				});
				block.appendChild(Blockly.Variables.generateVariableFieldDom(mostRecentVariable));
				xmlList.push(block);
			}
		}

		if (Blockly.Blocks['get_profile_member']) {
			if (variableModelList.length) {
				var block = Blockly.utils.xml.createBlockDom('get_profile_member', {
					variabletype: Blockly.Profiles.type,
					gap: 8
				});
				block.appendChild(Blockly.Variables.generateVariableFieldDom(mostRecentVariable));
				xmlList.push(block);
			}
		}

		if (Blockly.Blocks['change_profile_member']) {
			if (variableModelList.length) {
				var block = Blockly.utils.xml.createBlockDom('change_profile_member', {
					variabletype: Blockly.Profiles.type,
					gap: 8
				});
				block.appendChild(Blockly.Variables.generateVariableFieldDom(mostRecentVariable));
				xmlList.push(block);
			}
		}
	}
	return xmlList;
};