Blockly.Lua['trigger'] = function (block) {
    var triggerType = block.getFieldValue('TRIGGER_TYPE');
    var relativePoint = block.getFieldValue('TRIGGER_RELATIVE');
    var triggerValue = block.getFieldValue('TRIGGER_VALUE');
    var ioIndex = block.getFieldValue('IO_INDEX');
    var ioValue = block.getFieldValue('TRIGGER_IO_STATUS');
    
    var code = `${triggerType}, ${relativePoint}, ${triggerValue}, ${ioIndex}, ${ioValue}`;
    return [code, Blockly.Lua.ORDER_NONE];
};