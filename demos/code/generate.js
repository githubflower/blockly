Blockly.JavaScript['thread'] = function(block) {
    return '-thread todo-';
}

Blockly.JavaScript['state'] = function (block) {
    var stateName = block.getFieldValue('NAME');
    var stateCode = Blockly.JavaScript.statementToCode(block, 'NAME');
    return `State ${stateName}(){\n${stateCode}}\n`;
}

Blockly.JavaScript['run_state'] = function (block) {
    var stateName = block.getFieldValue('NAME');
    var code = `// 进入State: ${stateName}\n${stateName}();\n`;
    return code;
}

Blockly.Lua['run_state'] = function (block) {
    var stateName = block.getFieldValue('NAME');
    var code = `// 进入State: ${stateName}\n${stateName}();\n`;

    if (stateName === '打开IO'){
        code = 'IO.Set(DOUT[20103],1)';
    }
    if (stateName === '关闭IO') {
        code = 'IO.Set(DOUT[20103],0)';
    }
    return code;
}

