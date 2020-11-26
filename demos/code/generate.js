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

Object.defineProperty(Blockly.Lua, 'thread_def', {
    value: function(block){
        var threadName = block.getFieldValue('NAME');
        var code_function_type = block.getInputTargetBlock('CALLBACK');
        if(!code_function_type){
            console.log('语法错误：没有给线程指定相应的函数。')
        }else{
            code_function_type = code_function_type.type;
        }
        var code_function;
        // var code_function = Blockly.Lua.statementToCode(block, 'CALLBACK');
        if(code_function_type === 'procedure_select'){
            code_function = Blockly.Lua.statementToCode(block, 'CALLBACK');
        }else{
            code_function = `function `;//Lua没有匿名函数，不会走到这里面来
        }

        var code_args = Blockly.Lua.valueToCode(block, 'ARGS', Blockly.Lua.ORDER_ATOMIC);
        var code = `${threadName} = Thread.New(${code_function})(${code_args});`
        // return code;
        return [code, Blockly.Lua.ORDER_ATOMIC];
    },
    writable: false,
    enumerable: true
})

Object.defineProperty(Blockly.Lua, 'procedure_select', {
    value: function(block){
        var procedureId = block.getFieldValue('field_procedure');
        var procedureName = block.workspace.procedureMap_.getProcedureById(procedureId).name;
        var code = `${procedureName}`;
        return code;
    },
    writable: false
})

var luaBlocks = [{
    type: 'state_def',
    generator: Blockly.Lua['procedures_defreturn']
},{
    type: 'state_opr',
    generator: function(block){
        var stateId = block.getFieldValue('field_state');
        var stateName = block.workspace.stateMap_.getStateById(stateId).name;
        return `${stateName}();\n`;
    }
}];

luaBlocks.forEach(item => {
    Object.defineProperty(Blockly.Lua, item.type, {
        value: item.generator,
        writable: false,
        enumerable: true
    })
})