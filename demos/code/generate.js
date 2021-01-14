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
        var oldThreadName = threadName;
        threadName = Blockly.Names.prototype.safeName_.call(this, threadName);
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
            if(String.prototype.trim){
                code_function = String.prototype.trim.call(code_function);
            }
        }else{
            code_function = '';//Lua没有匿名函数，不会走到这里面来
        }

        var code_args = Blockly.Lua.valueToCode(block, 'ARGS', Blockly.Lua.ORDER_ATOMIC);
        var commentOfThreadName = threadName === oldThreadName ? '' : `-- ${threadName}:${oldThreadName}\n`;
        var code = commentOfThreadName + `${threadName} = Thread.New(${code_function})(${code_args})\n`;
        code += `${threadName}:Start()\n`;
        return code;
        // return [code, Blockly.Lua.ORDER_ATOMIC];
    },
    writable: false,
    enumerable: true
})

Object.defineProperty(Blockly.Lua, 'procedure_select', {
    value: function(block){
        var procedureId = block.getFieldValue('field_procedure');
        var procedureName = block.workspace.procedureMap_.getProcedureById(procedureId).name;
        procedureName = Blockly.Names.prototype.safeName_.call(this, procedureName)
        var code = `${procedureName}`;
        return code;
    },
    writable: false
})

var luaBlocks = [{
    type: 'state_def',
    generator: Blockly.Lua['procedures_defreturn']
    /*function(block){
      var code = Blockly.Lua['procedures_defreturn'].call(this, block);
      return [code, Blockly.Lua.ORDER_ATOMIC]
    },*/
},{
    type: 'state_opr',
    generator: function(block){
        var stateId = block.getFieldValue('field_state');
        var stateName = block.workspace.stateMap_.getStateById(stateId).name;
        var oldStateName = stateName;
        stateName = Blockly.Names.prototype.safeName_.call(this, stateName);//这样写是为了处理中文问题
        var commentOfStateName = oldStateName === stateName ? '' : `-- ${stateName}: ${oldStateName}\n`;
        return commentOfStateName + `${stateName}()\n`;
    }
},{
    type: 'thread_opr',
    generator: function(block){
        var operator = block.getFieldValue('field_opr');
        var threadId = block.getFieldValue('field_thread');
        var threadName = block.workspace.threadMap_.getThreadById(threadId).name;
        threadName = Blockly.Names.prototype.safeName_.call(this, threadName);
        return `${threadName}:${Blockly[operator]}()\n`;
    }
},{
    type: 'set_thread_priority',
    generator: function(block){
        var priority = block.getFieldValue('field_thread_priority');
        var threadId = block.getFieldValue('field_thread');
        var threadName = block.workspace.threadMap_.getThreadById(threadId).name;
        threadName = Blockly.Names.prototype.safeName_.call(this, threadName);
        return `${threadName}:${Blockly.THREAD_SET_PRIORITY}(${priority})`;
    }
},{
    type: 'state_trigger_event',
    generator: Blockly.Lua['controls_if']
},{
    type: 'lists_state',
    generator: function(block){
      // TODO 还需修改 将此类型的block优先提取生成代码
      var elements = new Array(block.itemCount_);
      for (var i = 0; i < block.itemCount_; i++) {
        elements[i] = Blockly.Lua.valueToCode(block, 'ADD' + i,
            Blockly.Lua.ORDER_NONE) || 'None';
      }
      var code = '{' + elements.join(', ') + '}';
      code = '';
      return code;
    }
},{
    type: 'sleep',
    generator: function(block){
        var sleep_time = Blockly.Lua.valueToCode(block, 'sleep_time', Blockly.Lua.ORDER_ATOMIC);
        var code = 'Thread.Sleep(' + sleep_time + ')\n';
        return code;
    }
}];

luaBlocks.forEach(item => {
    Object.defineProperty(Blockly.Lua, item.type, {
        value: item.generator,
        writable: false,
        enumerable: true
    })
})