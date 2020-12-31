goog.provide('Blockly.Locations');

goog.require('Blockly.Blocks');
goog.require('Blockly.Msg');
goog.require('Blockly.utils');
goog.require('Blockly.utils.xml');
goog.require('Blockly.VariableModel');
goog.require('Blockly.Xml');


Blockly.Locations.NAME_TYPE = Blockly.LOCATION_CATEGORY_NAME;
Blockly.Locations.type = 'location';
Blockly.Locations.flyoutCategory = function(workspace) {
	var xmlList = [];
	var button = document.createElement('button');
	button.setAttribute('text', '%{BKY_NEW_VARIABLE}');
	button.setAttribute('callbackKey', 'CREATE_VARIABLE_LOCATION');

	workspace.registerButtonCallback('CREATE_VARIABLE_LOCATION', function(button) {
		Blockly.Variables.createVariableButtonHandler(button.getTargetWorkspace(), null, Blockly.Locations.type);
	});

	xmlList.push(button);

	var blockList = Blockly.Locations.flyoutCategoryBlocks(workspace);
	xmlList = xmlList.concat(blockList);
	return xmlList;
};

Blockly.Locations.flyoutCategoryBlocks = function(workspace) {
	var variableModelList = workspace.getVariablesOfType(Blockly.Locations.type);
	var xmlList = [];
	if (Blockly.Blocks['new_location']) {
			var block = Blockly.utils.xml.createElement('block');
			block.setAttribute('type', 'new_location');
			block.setAttribute('gap', Blockly.Blocks['math_change'] ? 8 : 24);
			var properties = ["location_x", "location_y", "location_z", "location_yaw", "location_pitch", "location_roll", "location_config", "location_zclearance", "location_zworld", "location_ex1", "location_ex2", "location_ex3"];
			for(var i = 0; i < properties.length; i++){

				var value = Blockly.Xml.textToDom(
					'<value name="' + properties[i] + '">' +
					'<shadow type="math_number">' +
					'<field name="NUM">0</field>' +
					'</shadow>' +
					'</value>');
				block.appendChild(value);
			}
			xmlList.push(block);

		}
	if (variableModelList.length > 0) {
		// New variables are added to the end of the variableModelList.
		var mostRecentVariable = variableModelList[variableModelList.length - 1];
		
		if (Blockly.Blocks['locations_set']) {
			var block = Blockly.utils.xml.createElement('block');
			block.setAttribute('type', 'locations_set');
			block.setAttribute('variabletype', Blockly.Locations.type);
			block.setAttribute('gap', Blockly.Blocks['math_change'] ? 8 : 24);
			block.appendChild(
				Blockly.Variables.generateVariableFieldDom(mostRecentVariable));
			xmlList.push(block);
		}
		if (Blockly.Blocks['math_change']) {
			var block = Blockly.utils.xml.createElement('block');
			block.setAttribute('type', 'math_change');
			block.setAttribute('variabletype', Blockly.Locations.type);
			block.setAttribute('gap', Blockly.Blocks['locations_get'] ? 20 : 8);
			block.appendChild(
				Blockly.Variables.generateVariableFieldDom(mostRecentVariable));
			var value = Blockly.Xml.textToDom(
				'<value name="DELTA">' +
				'<shadow type="math_number">' +
				'<field name="NUM">1</field>' +
				'</shadow>' +
				'</value>');
			block.appendChild(value);
			xmlList.push(block);
		}

		if (Blockly.Blocks['locations_get']) {
			variableModelList.sort(Blockly.VariableModel.compareByName);
			/*for (var i = 0, variable;
				(variable = variableModelList[i]); i++) {
				var block = Blockly.utils.xml.createElement('block');
				block.setAttribute('type', 'locations_get');
				block.setAttribute('variabletype', Blockly.Locations.type);
				block.setAttribute('gap', 8);
				block.appendChild(Blockly.Variables.generateVariableFieldDom(variable));
				xmlList.push(block);
			}*/
			if (variableModelList.length) {
				var block = Blockly.utils.xml.createElement('block');
				block.setAttribute('type', 'locations_get');
				block.setAttribute('variabletype', Blockly.Locations.type);
				block.setAttribute('gap', 8);
				block.appendChild(Blockly.Variables.generateVariableFieldDom(mostRecentVariable));
				xmlList.push(block);

			}
		}

		if (Blockly.Blocks['get_location']) {
			if (variableModelList.length) {
				var block = Blockly.utils.xml.createElement('block');
				block.setAttribute('type', 'get_location');
				block.setAttribute('variabletype', Blockly.Locations.type);
				block.setAttribute('gap', 8);
				block.appendChild(Blockly.Variables.generateVariableFieldDom(mostRecentVariable));
				xmlList.push(block);
			}
		}
		
		if(Blockly.Blocks['set_location']){
			if (variableModelList.length) {
				var block = Blockly.utils.xml.createBlockDom('set_location', {
					variabletype: Blockly.Locations.type,
					gap: 8
				});
				block.appendChild(Blockly.Variables.generateVariableFieldDom(mostRecentVariable));
				xmlList.push(block);
			}
		}
	}
	return xmlList;
};