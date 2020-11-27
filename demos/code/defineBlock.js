

//参考创建数组的方式来创建一个Object
Blockly.Blocks['create_obj'] = {
  /**
   * Block for creating a list with any number of elements of any type.
   * @this {Blockly.Block}
   */
  init: function() {
    this.setHelpUrl(Blockly.Msg['LISTS_CREATE_WITH_HELPURL']);
    // this.setStyle('yellow1_blocks');
    this.setStyle('blue2_blocks');
    this.itemCount_ = 2;
    this.updateShape_();
    this.setOutput(true, 'Object');
    this.setMutator(new Blockly.Mutator(['lists_create_obj_item']));
    this.setTooltip(Blockly.Msg['LISTS_CREATE_WITH_TOOLTIP']);
  },
  /**
   * Create XML to represent list inputs.
   * @return {!Element} XML storage element.
   * @this {Blockly.Block}
   */
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
  /**
   * Populate the mutator's dialog with this block's components.
   * @param {!Blockly.Workspace} workspace Mutator's workspace.
   * @return {!Blockly.Block} Root block in mutator.
   * @this {Blockly.Block}
   */
  decompose: function(workspace) {
    console.log('---decompose');
    var containerBlock = workspace.newBlock('lists_create_with_container');
    containerBlock.initSvg();
    var connection = containerBlock.getInput('STACK').connection;
    for (var i = 0; i < this.itemCount_; i++) {
      var itemBlock = workspace.newBlock('lists_create_obj_item');
      itemBlock.initSvg();
      connection.connect(itemBlock.previousConnection);
      connection = itemBlock.nextConnection;
    }
    return containerBlock;
  },
  /**
   * Reconfigure this block based on the mutator dialog's components.
   * @param {!Blockly.Block} containerBlock Root block in mutator.
   * @this {Blockly.Block}
   */
  compose: function(containerBlock) {
    console.log('compose');
    var itemBlock = containerBlock.getInputTargetBlock('STACK');
    // Count number of inputs.
    var connections = [];
    while (itemBlock) {
      connections.push(itemBlock.valueConnection_);
      itemBlock = itemBlock.nextConnection &&
          itemBlock.nextConnection.targetBlock();
    }
    // Disconnect any children that don't belong.
    for (var i = 0; i < this.itemCount_; i++) {
      var connection = this.getInput('item_value' + i).connection.targetConnection;
      if (connection && connections.indexOf(connection) == -1) {
        connection.disconnect();
      }
    }
    this.itemCount_ = connections.length;
    this.updateShape_();
    // Reconnect any child blocks.
    for (var i = 0; i < this.itemCount_; i++) {
      Blockly.Mutator.reconnect(connections[i], this, 'item_value' + i);
    }
  },
  /**
   * Store pointers to any connected child blocks.
   * @param {!Blockly.Block} containerBlock Root block in mutator.
   * @this {Blockly.Block}
   */
  saveConnections: function(containerBlock) {
    var itemBlock = containerBlock.getInputTargetBlock('STACK');
    var i = 0;
    while (itemBlock) {
      var input = this.getInput('item_value' + i);
      itemBlock.valueConnection_ = input && input.connection.targetConnection;
      i++;
      itemBlock = itemBlock.nextConnection &&
          itemBlock.nextConnection.targetBlock();
    }
  },
  /**
   * Modify this block to have the correct number of inputs.
   * @private
   * @this {Blockly.Block}
   */
  updateShape_: function() {
    if (this.itemCount_ && this.getInput('EMPTY')) {
      this.removeInput('EMPTY');
    } else if (!this.itemCount_ && !this.getInput('EMPTY')) {
      this.appendDummyInput('EMPTY')
          .appendField(Blockly.Msg['LISTS_CREATE_EMPTY_TITLE']);
    }
    // Add new inputs.
    for (var i = 0; i < this.itemCount_; i++) {
      if (!this.getInput('item_value' + i)) {
        var input = this.appendValueInput("item_value" + i)
        .appendField(new Blockly.FieldTextInput('key' + i), 'item_key' + i)
        .appendField(':')
        .setAlign(Blockly.ALIGN_RIGHT);
        this.setInputsInline(false);
      }
    }
    // Remove deleted inputs.
    while (this.getInput('item_value' + i)) {
      this.removeInput('item_value' + i);
      i++;
    }
  }
};

// 类
Blockly.Blocks['class'] = {
  init: function() {
    this.appendDummyInput()
      .appendField(new Blockly.FieldLabel("Class", null, {
        class: 'keyword'
      }))
        .appendField(new Blockly.FieldTextInput("className"), "NAME");
    
    this.appendDummyInput()
        // .setCheck("")
        .setAlign(Blockly.ALIGN_LEFT)
        .appendField("property");
    this.appendStatementInput("PROPERTY");
    this.appendDummyInput()
      .setAlign(Blockly.ALIGN_LEFT)
        // .setCheck(null)
        .appendField("method");
    this.appendStatementInput("METHOD")
    this.setStyle("class_blocks");
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['lists_create_obj_item'] = {
  init: function () {
    this.setStyle('list_blocks');
    this.appendDummyInput()

      .appendField(Blockly.Msg['LISTS_CREATE_WITH_ITEM_TITLE']);

    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(Blockly.Msg['LISTS_CREATE_WITH_ITEM_TOOLTIP']);
    this.contextMenu = false;
  }
};
Blockly.Blocks['lists_create_method_item'] = {
  init: function () {
    this.setStyle('list_blocks');
/*     this.appendDummyInput()
      .appendField(Blockly.Msg['LISTS_CREATE_WITH_ITEM_TITLE']); */
    this.appendStatementInput("METHOD_BODY")
    this.setPreviousStatement(false);
    this.setNextStatement(false);
    this.setTooltip(Blockly.Msg['LISTS_CREATE_WITH_ITEM_TOOLTIP']);
    this.contextMenu = false;
  }
};

Blockly.Blocks['class_property'] = {
  /**
   * Block for creating a list with any number of elements of any type.
   * @this {Blockly.Block}
   */
  init: function () {
    this.setHelpUrl(Blockly.Msg['LISTS_CREATE_WITH_HELPURL']);
    this.setStyle('class_property');
    this.itemCount_ = 2;
    this.updateShape_();
    // this.setOutput(true, 'Object');
    this.setMutator(new Blockly.Mutator(['lists_create_obj_item']));
    this.setTooltip(Blockly.Msg['LISTS_CREATE_WITH_TOOLTIP']);
    this.setPreviousStatement(true);
  },
  /**
   * Create XML to represent list inputs.
   * @return {!Element} XML storage element.
   * @this {Blockly.Block}
   */
  mutationToDom: function () {
    var container = Blockly.utils.xml.createElement('mutation');
    container.setAttribute('items', this.itemCount_);
    return container;
  },
  /**
   * Parse XML to restore the list inputs.
   * @param {!Element} xmlElement XML storage element.
   * @this {Blockly.Block}
   */
  domToMutation: function (xmlElement) {
    this.itemCount_ = parseInt(xmlElement.getAttribute('items'), 10);
    this.updateShape_();
  },
  /**
   * Populate the mutator's dialog with this block's components.
   * @param {!Blockly.Workspace} workspace Mutator's workspace.
   * @return {!Blockly.Block} Root block in mutator.
   * @this {Blockly.Block}
   */
  decompose: function (workspace) {
    console.log('---decompose');
    var containerBlock = workspace.newBlock('lists_create_with_container');
    containerBlock.initSvg();
    var connection = containerBlock.getInput('STACK').connection;
    for (var i = 0; i < this.itemCount_; i++) {
      var itemBlock = workspace.newBlock('lists_create_obj_item');
      itemBlock.initSvg();
      connection.connect(itemBlock.previousConnection);
      connection = itemBlock.nextConnection;
    }
    return containerBlock;
  },
  /**
   * Reconfigure this block based on the mutator dialog's components.
   * @param {!Blockly.Block} containerBlock Root block in mutator.
   * @this {Blockly.Block}
   */
  compose: function (containerBlock) {
    console.log('compose');
    var itemBlock = containerBlock.getInputTargetBlock('STACK');
    // Count number of inputs.
    var connections = [];
    while (itemBlock) {
      connections.push(itemBlock.valueConnection_);
      itemBlock = itemBlock.nextConnection &&
        itemBlock.nextConnection.targetBlock();
    }
    // Disconnect any children that don't belong.
    for (var i = 0; i < this.itemCount_; i++) {
      var connection = this.getInput('item_value' + i).connection.targetConnection;
      if (connection && connections.indexOf(connection) == -1) {
        connection.disconnect();
      }
    }
    this.itemCount_ = connections.length;
    this.updateShape_();
    // Reconnect any child blocks.
    for (var i = 0; i < this.itemCount_; i++) {
      Blockly.Mutator.reconnect(connections[i], this, 'item_value' + i);
    }
  },
  /**
   * Store pointers to any connected child blocks.
   * @param {!Blockly.Block} containerBlock Root block in mutator.
   * @this {Blockly.Block}
   */
  saveConnections: function (containerBlock) {
    var itemBlock = containerBlock.getInputTargetBlock('STACK');
    var i = 0;
    while (itemBlock) {
      var input = this.getInput('item_value' + i);
      itemBlock.valueConnection_ = input && input.connection.targetConnection;
      i++;
      itemBlock = itemBlock.nextConnection &&
        itemBlock.nextConnection.targetBlock();
    }
  },
  /**
   * Modify this block to have the correct number of inputs.
   * @private
   * @this {Blockly.Block}
   */
  updateShape_: function () {
    if (this.itemCount_ && this.getInput('EMPTY')) {
      this.removeInput('EMPTY');
    } else if (!this.itemCount_ && !this.getInput('EMPTY')) {
      this.appendDummyInput('EMPTY')
        .appendField(Blockly.Msg['LISTS_CREATE_EMPTY_TITLE']);
    }
    // Add new inputs.
    for (var i = 0; i < this.itemCount_; i++) {
      if (!this.getInput('item_value' + i)) {
        var input = this.appendValueInput("item_value" + i)
          // .appendField(new Blockly.FieldDropdown([["private", "private"], ["public", "public"], ["public static", "public static"]]), "TYPE" + i)
          .appendField(new Blockly.FieldTextInput('key' + i), 'item_key' + i)
          .appendField(':')
          .setAlign(Blockly.ALIGN_RIGHT);
        this.setInputsInline(false);
      }
    }
    // Remove deleted inputs.
    while (this.getInput('item_value' + i)) {
      this.removeInput('item_value' + i);
      i++;
    }
  }
};

Blockly.Blocks['class_method'] = {
  /**
   * Block for creating a list with any number of elements of any type.
   * @this {Blockly.Block}
   */
  init: function () {
    this.setHelpUrl(Blockly.Msg['LISTS_CREATE_WITH_HELPURL']);
    // this.setStyle('puple1_blocks');
    this.setStyle('class_method');
    this.itemCount_ = 2;
    this.updateShape_();
    // this.setOutput(true, 'Object');
    this.setMutator(new Blockly.Mutator(['lists_create_obj_item']));
    // this.setMutator(new Blockly.Mutator(['lists_create_method_item']));
    this.setTooltip(Blockly.Msg['LISTS_CREATE_WITH_TOOLTIP']);
    this.setPreviousStatement(true);
  },
  /**
   * Create XML to represent list inputs.
   * @return {!Element} XML storage element.
   * @this {Blockly.Block}
   */
  mutationToDom: function () {
    var container = Blockly.utils.xml.createElement('mutation');
    container.setAttribute('items', this.itemCount_);
    return container;
  },
  /**
   * Parse XML to restore the list inputs.
   * @param {!Element} xmlElement XML storage element.
   * @this {Blockly.Block}
   */
  domToMutation: function (xmlElement) {
    this.itemCount_ = parseInt(xmlElement.getAttribute('items'), 10);
    this.updateShape_();
  },
  /**
   * Populate the mutator's dialog with this block's components.
   * @param {!Blockly.Workspace} workspace Mutator's workspace.
   * @return {!Blockly.Block} Root block in mutator.
   * @this {Blockly.Block}
   */
  decompose: function (workspace) {
    console.log('---decompose');
    var containerBlock = workspace.newBlock('lists_create_with_container');
    containerBlock.initSvg();
    var connection = containerBlock.getInput('STACK').connection;
    for (var i = 0; i < this.itemCount_; i++) {
      var itemBlock = workspace.newBlock('lists_create_obj_item');
      // var itemBlock = workspace.newBlock('lists_create_method_item');
      itemBlock.initSvg();
      connection.connect(itemBlock.previousConnection);
      connection = itemBlock.nextConnection;
    }
    return containerBlock;
  },
  /**
   * Reconfigure this block based on the mutator dialog's components.
   * @param {!Blockly.Block} containerBlock Root block in mutator.
   * @this {Blockly.Block}
   */
  compose: function (containerBlock) {
    console.log('compose');
    var itemBlock = containerBlock.getInputTargetBlock('STACK');
    // Count number of inputs.
    var connections = [];
    while (itemBlock) {
      connections.push(itemBlock.valueConnection_);
      itemBlock = itemBlock.nextConnection &&
        itemBlock.nextConnection.targetBlock();
    }
    // Disconnect any children that don't belong.
    for (var i = 0; i < this.itemCount_; i++) {
      var connection = this.getInput('item_value' + i).connection.targetConnection;
      if (connection && connections.indexOf(connection) == -1) {
        connection.disconnect();
      }
    }
    this.itemCount_ = connections.length;
    this.updateShape_();
    // Reconnect any child blocks.
    for (var i = 0; i < this.itemCount_; i++) {
      Blockly.Mutator.reconnect(connections[i], this, 'item_value' + i);
    }
  },
  /**
   * Store pointers to any connected child blocks.
   * @param {!Blockly.Block} containerBlock Root block in mutator.
   * @this {Blockly.Block}
   */
  saveConnections: function (containerBlock) {
    var itemBlock = containerBlock.getInputTargetBlock('STACK');
    var i = 0;
    while (itemBlock) {
      var input = this.getInput('item_value' + i);
      itemBlock.valueConnection_ = input && input.connection.targetConnection;
      i++;
      itemBlock = itemBlock.nextConnection &&
        itemBlock.nextConnection.targetBlock();
    }
  },
  /**
   * Modify this block to have the correct number of inputs.
   * @private
   * @this {Blockly.Block}
   */
  updateShape_: function () {
    if (this.itemCount_ && this.getInput('EMPTY')) {
      this.removeInput('EMPTY');
    } else if (!this.itemCount_ && !this.getInput('EMPTY')) {
      this.appendDummyInput('EMPTY')
        .appendField(Blockly.Msg['LISTS_CREATE_EMPTY_TITLE']);
    }
    // Add new inputs.
    for (var i = 0; i < this.itemCount_; i++) {
      if (!this.getInput('item_value' + i)) {
        var input = this.appendDummyInput('EMPTY' + i)
          // .appendField(new Blockly.FieldDropdown([["private", "private"], ["public", "public"]]), "TYPE" + i)
          .appendField(new Blockly.FieldTextInput('method' + i), 'item_key' + i)
          .appendField(':')
          .setAlign(Blockly.ALIGN_RIGHT);
        this.appendStatementInput("item_value" + i);
        this.setInputsInline(false);
      }
    }
    // Remove deleted inputs.
    while (this.getInput('item_value' + i)) {
      this.removeInput('item_value' + i);
      i++;
    }
  }
};

Blockly.Blocks['get_class_property'] = {
  init: function () {
    this.appendDummyInput()
      // .appendField("")
      .appendField(
        new Blockly.FieldDropdown([
          ["cRun", "cRun"],
          ["cBase", "cBase"],
          ["LIGHT", "LIGHT"],
        ]),
        "CLASS"
      )
      .appendField(".")
      .appendField(
        new Blockly.FieldDropdown([
          ["bStopFlag", "bStopFlag"],
          ["cAct", "cAct"],
          ["bIsRunning", "bIsRunning"],
          ["InitThread", "InitThread"],
          ["Red", "Red"],
          ["Green", "Green"],
          ["Yellow", "Yellow"]
        ]),
        "PROPERTY"
      );
    this.setOutput(true, null);
    this.setStyle("blue5_blocks");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['get_class_property3'] = {
  init: function () {
    this.appendDummyInput()
      // .appendField("")
      .appendField(
        new Blockly.FieldDropdown([
          ["cRun", "cRun"],
          ["cBase", "cBase"],
          ["LIGHT", "LIGHT"],
          ["cMotion", "cMotion"],
        ]),
        "CLASS"
      )
      .appendField(".")
      .appendField(
        new Blockly.FieldDropdown([
          ["bStopFlag", "bStopFlag"],
          ["cAct", "cAct"],
          ["RbtPos", "RbtPos"],
          ["InitThread", "InitThread"],
          ["Red", "Red"],
          ["Green", "Green"],
          ["Yellow", "Yellow"],
          ["bSixFirstPut", "bSixFirstPut"],
        ]),
        "PROPERTY0"
      )
      .appendField(".")
      .appendField(
        new Blockly.FieldDropdown([
          ["LineWaitePos", "LineWaitePos"],
          ["0", "0"],
          ["1", "1"],
        ]),
        "PROPERTY1"
      )
    this.setOutput(true, null);
    this.setStyle("blue5_blocks");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['set_class_property'] = {
  init: function () {
    // this.appendDummyInput()
     
    this.appendValueInput("VALUE")
      .appendField("set")
      .appendField(
        new Blockly.FieldDropdown([
          ["cRun", "cRun"],
          ["cBase", "cBase"],
        ]),
        "CLASS"
      )
      .appendField(".")
      .appendField(
        new Blockly.FieldDropdown([
          ["bStopFlag", "bStopFlag"],
          ["cAct", "cAct"],
          ["bIsRunning", "bIsRunning"],
          ["InitThread", "InitThread"],
          ["b_Six_Front_Start", "b_Six_Front_Start"],
          ["b_Six_Back_Start", "b_Six_Back_Start"],
        ]),
        "PROPERTY"
      )
      .appendField("to");
    this.setOutput(false, null);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setStyle("blue4_blocks");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['set_class_property3'] = {
  init: function () {
    // this.appendDummyInput()

    this.appendValueInput("VALUE")
      .appendField("set")
      .appendField(new Blockly.FieldDropdown([["cRun", "cRun"], ["cBase", "cBase"]]), "CLASS")
      .appendField(".")
      .appendField(new Blockly.FieldDropdown([["bStopFlag", "bStopFlag"], ["cAct", "cAct"], ["bSixFirstPut", "bSixFirstPut"], ["InitThread", "InitThread"]]), "PROPERTY0")
      .appendField(".")
      .appendField(new Blockly.FieldDropdown([["0", "0"], ["1", "1"]]), "PROPERTY1")
      .appendField("to")
     /*  .appendField(".")
      .appendField(new Blockly.FieldDropdown([["Init", "Init"]]), "PROPERTY2") */
    this.setOutput(false, null);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setStyle("blue4_blocks");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};
Blockly.Blocks['set_class_property4'] = {
  init: function () {
    // this.appendDummyInput()

    this.appendValueInput("VALUE")
      .appendField("set")
      .appendField(new Blockly.FieldDropdown([["cRun", "cRun"], ["cBase", "cBase"]]), "CLASS")
      .appendField(".")
      .appendField(new Blockly.FieldDropdown([["bStopFlag", "bStopFlag"], ["cAct", "cAct"], ["option", "OPTIONNAME"], ["InitThread", "InitThread"]]), "PROPERTY0")
      .appendField(".")
      .appendField(new Blockly.FieldDropdown([["0", "0"], ["1", "1"]]), "PROPERTY1")
      .appendField(".")
      .appendField(new Blockly.FieldDropdown([["Init", "Init"]]), "PROPERTY2")
      .appendField("to")
    this.setOutput(false, null);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setStyle("blue4_blocks");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};
Blockly.Blocks['set_class_property5'] = {
  init: function () {
    // this.appendDummyInput()

    this.appendValueInput("VALUE")
      .appendField("set")
      .appendField(
        new Blockly.FieldDropdown([
          ["cRun", "cRun"],
          ["cBase", "cBase"],
        ]),
        "CLASS"
      )
      .appendField(".")
      .appendField(
        new Blockly.FieldDropdown([
          ["bStopFlag", "bStopFlag"],
          ["cAct", "cAct"],
          ["option", "OPTIONNAME"],
          ["InitThread", "InitThread"],
        ]),
        "PROPERTY0"
      )
      .appendField(".")
      .appendField(
        new Blockly.FieldDropdown([
          ["0", "0"],
          ["1", "1"],
        ]),
        "PROPERTY1"
      )
      .appendField(".")
      .appendField(new Blockly.FieldDropdown([["rbt", "rbt"], ["qg", "qg"]]), "PROPERTY2")
      .appendField(".")
      .appendField(
        new Blockly.FieldDropdown([
          ["iPrdCnt", "iPrdCnt"],
          ["bIsNewPrd", "bIsNewPrd"],
          ["iCurrPos", "iCurrPos"],
          ["bExistPrd", "bExistPrd"],
        ]),
        "PROPERTY3"
      )
      .appendField("to");
    this.setOutput(false, null);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setStyle("blue4_blocks");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};
Blockly.Blocks['set_class_property6'] = {
  init: function () {
    // this.appendDummyInput()

    this.appendValueInput("VALUE")
      .appendField("set")
      .appendField(
        new Blockly.FieldDropdown([
          ["cRun", "cRun"],
          ["cBase", "cBase"],
        ]),
        "CLASS"
      )
      .appendField(".")
      .appendField(
        new Blockly.FieldDropdown([
          ["bStopFlag", "bStopFlag"],
          ["cAct", "cAct"],
          ["option", "OPTIONNAME"],
          ["InitThread", "InitThread"],
        ]),
        "PROPERTY0"
      )
      .appendField(".")
      .appendField(
        new Blockly.FieldDropdown([
          ["0", "0"],
          ["1", "1"],
        ]),
        "PROPERTY1"
      )
      .appendField(".")
      .appendField(
        new Blockly.FieldDropdown([
          ["rbt", "rbt"],
          ["dj", "dj"],
          ["qg", "qg"],
        ]),
        "PROPERTY2"
      )
      .appendField(".")
      .appendField(
        new Blockly.FieldDropdown([
          ["iPrdCnt", "iPrdCnt"],
          ["bIsNewPrd", "bIsNewPrd"],
          ["iCurrPos", "iCurrPos"],
          ["0", "0"],
          ["1", "1"],
        ]),
        "PROPERTY3"
      )
      .appendField(".")
      .appendField(
        new Blockly.FieldDropdown([
          ["iPrdCnt", "iPrdCnt"],
          ["bIsNewPrd", "bIsNewPrd"],
          ["iCurrPos", "iCurrPos"],
          ["bExistPrd", "bExistPrd"],
          ["bOldPrd", "bOldPrd"],
        ]),
        "PROPERTY4"
      )
      .appendField("to");
    this.setOutput(false, null);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setStyle("blue4_blocks");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};
Blockly.Blocks['class_method_return'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("do")
      .appendField(new Blockly.FieldDropdown([["cBase", "cBase"], ["cRun", "cRun"]]), "CLASS")
      .appendField(".")
      .appendField(new Blockly.FieldDropdown([["bStopFlag", "bStopFlag"], ["cAct", "cAct"], ["SaveLog", "SaveLog"], ["InitThread", "InitThread"], ["ClearAllCmd", "ClearAllCmd"], ["SendAllPara", "SendAllPara"]]), "METHOD");
    this.setOutput(true, null);
    this.setPreviousStatement(false);
    this.setNextStatement(false);
    this.setStyle("blue4_blocks");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['class_method_return4'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("do")
      .appendField(
        new Blockly.FieldDropdown([
          ["cBase", "cBase"],
          ["cRun", "cRun"],
        ]),
        "CLASS"
      )
      .appendField(".")
      .appendField(
        new Blockly.FieldDropdown([
          ["bStopFlag", "bStopFlag"],
          ["cAct", "cAct"],
          ["SaveLog", "SaveLog"],
          ["InitThread", "InitThread"],
          ["ClearAllCmd", "ClearAllCmd"],
          ["SendAllPara", "SendAllPara"],
        ]),
        "METHOD"
      )
      .appendField(".")
      .appendField(
        new Blockly.FieldDropdown([
          ["0", "0"],
          ["1", "1"],
        ]),
        "PROPERTY1"
      )
      .appendField(".")
      .appendField(
        new Blockly.FieldDropdown([
          ["Init", "Init"],
          ["Start", "Start"],
          ["Pause", "Pause"],
          ["Resume", "Resume"],
          ["Stop", "Stop"],
        ]),
        "PROPERTY2"
      );
      this.setOutput(true, null);
    this.setPreviousStatement(false);
    this.setNextStatement(false);
    this.setStyle("blue4_blocks");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['class_method_noreturn'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("do")
      .appendField(
        new Blockly.FieldDropdown([
          ["cBase", "cBase"],
          ["cRun", "cRun"],
          ["Application", "Application"],
        ]),
        "CLASS"
      )
      .appendField(".")
      .appendField(
        new Blockly.FieldDropdown([
          ["bStopFlag", "bStopFlag"],
          ["cAct", "cAct"],
          ["SaveLog", "SaveLog"],
          ["InitThread", "InitThread"],
          ["ClearAllCmd", "ClearAllCmd"],
          ["DoEvents", "DoEvents"],
        ]),
        "METHOD"
      );
    this.setOutput(false, null);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setStyle("blue4_blocks");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['class_method_noreturn_with_params1'] = {
  init: function () {
    // this.appendDummyInput()
    this.appendValueInput("VALUE")
      .appendField("do")
      .appendField(
        new Blockly.FieldDropdown([
          ["cBase", "cBase"],
          ["cRun", "cRun"],
          ["Thread", "Thread"],
        ]),
        "CLASS"
      )
      .appendField(".")
      .appendField(
        new Blockly.FieldDropdown([
          ["bStopFlag", "bStopFlag"],
          ["cAct", "cAct"],
          ["SaveLog", "SaveLog"],
          ["InitThread", "InitThread"],
          ["Sleep", "Sleep"],
        ]),
        "METHOD"
      );
    this.setOutput(false, null);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setStyle("blue4_blocks");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};
Blockly.Blocks['class_method_noreturn_with_params2'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("do")
      .appendField(
        new Blockly.FieldDropdown([
          ["cBase", "cBase"],
          ["cRun", "cRun"],
          ["Thread", "Thread"],
        ]),
        "CLASS"
      )
      .appendField(".")
      .appendField(
        new Blockly.FieldDropdown([
          ["bStopFlag", "bStopFlag"],
          ["cAct", "cAct"],
          ["SaveLog", "SaveLog"],
          ["InitThread", "InitThread"],
          ["Sleep", "Sleep"],
        ]),
        "METHOD"
      );
    this.appendValueInput("VALUE")
      .appendField("titleStr")
      .setAlign(Blockly.ALIGN_RIGHT)
    this.appendValueInput("VALUE2")
      .appendField("msg")
      .setAlign(Blockly.ALIGN_RIGHT)
    this.setOutput(false, null);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setStyle("blue4_blocks");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};
Blockly.Blocks['class_method_noreturn_with_params3'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("do")
      .appendField(
        new Blockly.FieldDropdown([
          ["cBase", "cBase"],
          ["cRun", "cRun"],
          ["Thread", "Thread"],
          ["Tools", "Tools"],
        ]),
        "CLASS"
      )
      .appendField(".")
      .appendField(
        new Blockly.FieldDropdown([
          ["bStopFlag", "bStopFlag"],
          ["cAct", "cAct"],
          ["SaveLog", "SaveLog"],
          ["InitThread", "InitThread"],
          ["Sleep", "Sleep"],
          ["ExistReceiveTCPMsg", "ExistReceiveTCPMsg"],
          ["GetFirstTCPMsg", "GetFirstTCPMsg"],
          ["RemoveTCPMsg", "RemoveTCPMsg"],
          ["AddTCPMsg", "AddTCPMsg"],
        ]),
        "METHOD"
      )
    this.appendValueInput("VALUE")
      .appendField("itID")
      .setAlign(Blockly.ALIGN_RIGHT)
    this.appendValueInput("VALUE2")
      .appendField("iMsgNo")
      .setAlign(Blockly.ALIGN_RIGHT)
    this.appendValueInput("VALUE3")
      .appendField("strMsg")
      .setAlign(Blockly.ALIGN_RIGHT)
    this.setOutput(false, null);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setStyle("blue4_blocks");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['class_method_return_with_params2'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("do")
      .appendField(
        new Blockly.FieldDropdown([
          ["cBase", "cBase"],
          ["cRun", "cRun"],
          ["Thread", "Thread"],
          ["Tools", "Tools"],
        ]),
        "CLASS"
      )
      .appendField(".")
      .appendField(
        new Blockly.FieldDropdown([
          ["bStopFlag", "bStopFlag"],
          ["cAct", "cAct"],
          ["SaveLog", "SaveLog"],
          ["InitThread", "InitThread"],
          ["Sleep", "Sleep"],
          ["ExistReceiveTCPMsg", "ExistReceiveTCPMsg"],
          ["GetFirstTCPMsg", "GetFirstTCPMsg"],
        ]),
        "METHOD"
      )
    this.appendValueInput("VALUE")
      .appendField("itID")
      .setAlign(Blockly.ALIGN_RIGHT)
    this.appendValueInput("VALUE2")
      .appendField("iMsgNo")
      .setAlign(Blockly.ALIGN_RIGHT)
    this.setOutput(true, null);
    this.setPreviousStatement(false);
    this.setNextStatement(false);
    this.setStyle("blue4_blocks");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};



Blockly.Blocks['methods_defreturn'] = {
  /**
   * Block for defining a procedure with a return value.
   * @this {Blockly.Block}
   */
  init: function () {
    var nameField = new Blockly.FieldTextInput('',
      Blockly.Procedures.rename);
    nameField.setSpellcheck(false);
    this.appendDummyInput()
      .appendField(Blockly.Msg['PROCEDURES_DEFRETURN_TITLE'])
      .appendField(nameField, 'NAME')
      .appendField('', 'PARAMS');
   /*  this.appendValueInput('RETURN')
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField(Blockly.Msg['PROCEDURES_DEFRETURN_RETURN']); */
    this.setMutator(new Blockly.Mutator(['procedures_mutatorarg']));
    if ((this.workspace.options.comments ||
      (this.workspace.options.parentWorkspace &&
        this.workspace.options.parentWorkspace.options.comments)) &&
      Blockly.Msg['PROCEDURES_DEFRETURN_COMMENT']) {
      this.setCommentText(Blockly.Msg['PROCEDURES_DEFRETURN_COMMENT']);
    }
    this.setStyle('procedure_blocks');
    this.setTooltip(Blockly.Msg['PROCEDURES_DEFRETURN_TOOLTIP']);
    this.setHelpUrl(Blockly.Msg['PROCEDURES_DEFRETURN_HELPURL']);
    this.arguments_ = [];
    this.argumentVarModels_ = [];
    this.setStatements_(true);
    this.setOutput(true);
    this.statementConnection_ = null;
  },
  setStatements_: Blockly.Blocks['procedures_defnoreturn'].setStatements_,
  updateParams_: Blockly.Blocks['procedures_defnoreturn'].updateParams_,
  mutationToDom: Blockly.Blocks['procedures_defnoreturn'].mutationToDom,
  domToMutation: Blockly.Blocks['procedures_defnoreturn'].domToMutation,
  decompose: Blockly.Blocks['procedures_defnoreturn'].decompose,
  compose: Blockly.Blocks['procedures_defnoreturn'].compose,
  /**
   * Return the signature of this procedure definition.
   * @return {!Array} Tuple containing three elements:
   *     - the name of the defined procedure,
   *     - a list of all its arguments,
   *     - that it DOES have a return value.
   * @this {Blockly.Block}
   */
  getProcedureDef: function () {
    return [this.getFieldValue('NAME'), this.arguments_, true];
  },
  getVars: Blockly.Blocks['procedures_defnoreturn'].getVars,
  getVarModels: Blockly.Blocks['procedures_defnoreturn'].getVarModels,
  renameVarById: Blockly.Blocks['procedures_defnoreturn'].renameVarById,
  updateVarName: Blockly.Blocks['procedures_defnoreturn'].updateVarName,
  displayRenamedVar_: Blockly.Blocks['procedures_defnoreturn'].displayRenamedVar_,
  customContextMenu: Blockly.Blocks['procedures_defnoreturn'].customContextMenu,
  callType_: 'procedures_callreturn'
};

Blockly.Blocks['procedures_ifreturn'].FUNCTION_TYPES.push('class_method');

Blockly.Blocks['method_return'] = Blockly.Blocks['procedures_ifreturn'];
Blockly.Blocks['method_return'].init = function() {
  /* this.appendValueInput('CONDITION')
    .setCheck('Boolean')
    .appendField(Blockly.Msg['CONTROLS_IF_MSG_IF']); */
  this.appendValueInput('VALUE')
    .appendField(Blockly.Msg['PROCEDURES_DEFRETURN_RETURN']);
  this.setInputsInline(true);
  this.setPreviousStatement(true);
  this.setNextStatement(true);
  this.setStyle('blue1_blocks');
  this.setTooltip(Blockly.Msg['PROCEDURES_IFRETURN_TOOLTIP']);
  this.setHelpUrl(Blockly.Msg['PROCEDURES_IFRETURN_HELPURL']);
  this.hasReturnValue_ = true;
}


Blockly.Blocks['start'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Start");
    this.appendStatementInput("NAME")
      .setCheck(null);
    this.setColour("#00b5cc");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};


Blockly.Blocks['new'] = {
  init: function () {
    this.appendValueInput("NAME")
      .setCheck(null)
      .appendField("new")
      .appendField(new Blockly.FieldDropdown([["cBase", "cBase"], ["cRun", "cRun"], ["cMotion", "cMotion"]]), "NAME");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#19b5fe");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['thread_def'] = {
  init: function () {

    this.appendDummyInput()
      .appendField("new Thread")
      .appendField(new Blockly.FieldTextInput("thread", this.validateThreadName), "NAME");
    /* this.appendStatementInput("NAME")
      .setCheck(null); */
    this.appendStatementInput('CALLBACK')
    .appendField('callback')
    .setAlign(Blockly.ALIGN_RIGHT);
    this.appendValueInput('ARGS')
    .appendField('args')
    .setAlign(Blockly.ALIGN_RIGHT);
    this.setInputsInline(false);
    this.setOutput(true);
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");

    // 
  },

  validateThreadName: function(name){
    name = name.trim();
    var findLeagalName = function(name, block){
        if (block.isInFlyout) {
          // Flyouts can have multiple procedures called 'do something'.
          return name;
        }
        name = name || Blockly.Msg['UNNAMED_KEY'] || 'unnamed';
        while (Blockly.ThreadMap.isNameUsed(name, block.workspace.threadMap_)) {
          // Collision with another procedure.
          var r = name.match(/^(.*?)(\d+)$/);
          if (!r) {
            name += '2';
          } else {
            name = r[1] + (parseInt(r[2], 10) + 1);
          }
        }
        return name;
      
    }
    name = findLeagalName(name, this.getSourceBlock());
    var oldName = this.getValue();
    if (oldName != name) {
      var blocks = this.getSourceBlock().workspace.getAllBlocks(false);
      for (var i = 0; i < blocks.length; i++) {
        if (blocks[i].renameThread) {
          var threadBlock = (blocks[i]);
          threadBlock.renameThread(oldName, name, this.getSourceBlock());
        }
      }

      //更新threadMap
      if(this.workspace_){
        var thread = this.workspace_.threadMap_.getThread(oldName);
        if(thread){
          thread.name = name;
        }
      }
    }
    return name;
  },
};
Blockly.Blocks['anonymous_function'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("function");
    this.appendStatementInput("NAME")
      .setCheck(null);
    this.setColour("#00b5cc");
    this.setTooltip("");
    this.setHelpUrl("");
    this.setOutput(true);
  }
};
goog.require('Blockly.FieldThread');
Blockly.Blocks['thread_opr'] = {
  init: function(){
    // this.appendDummyInput().appendField('select');
    this.appendDummyInput('NAME')
   .appendField(
      new Blockly.FieldDropdown([
        ["stop", "0"],
        ["start", "1"],
        ["pause", "2"],
        ["resume", "3"],
      ]),
      "field_opr"
    )
    .appendField(new Blockly.FieldThread('THREAD_NAME', function(name){return name;}) ,'field_thread');
    this.setOutput(false, null);
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setStyle("thread_blocks");
    this.setTooltip("");
    this.setHelpUrl("");
  },
  renameThread: function(oldName, newName, newBlock) {
    debugger;
    var fieldThread = this.getField('field_thread');
    if (Blockly.Names.equals(oldName, fieldThread.selectedOption_[0])) {
      var threadId = fieldThread.getValue();
      var thread = this.workspace.threadMap_.getThreadById(threadId);
      if(threadId === newBlock.id){
        this.workspace.threadMap_.renameThread(thread, newName);
        fieldThread.getOptions(false);
        fieldThread.doValueUpdate_(thread.getId());
      }
     /*  var baseMsg = this.outputConnection ?
          Blockly.Msg['PROCEDURES_CALLRETURN_TOOLTIP'] :
          Blockly.Msg['PROCEDURES_CALLNORETURN_TOOLTIP'];
      this.setTooltip(baseMsg.replace('%1', newName)); */
    }
  },
};
/* Blockly.Blocks['anonymous_function'] = {
  init: function () {

    this.appendDummyInput()
      .appendField("new Thread")
      .appendField(new Blockly.FieldTextInput("default"), "NAME");
    this.appendValueInput('CALLBACK')
    .appendField('callback')
    .setAlign(Blockly.ALIGN_RIGHT);
    this.appendValueInput('ARGS')
    .appendField('args')
    .setAlign(Blockly.ALIGN_RIGHT);
    this.setInputsInline(false);
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};
 */
// 'anonymous function'

var tempColor = '#00BFBF';
Blockly.Blocks['state'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(new Blockly.FieldTextInput("default"), "STATE_NAME");
    this.appendStatementInput("NAME")
      .setCheck(null);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(tempColor);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};


Blockly.Blocks['def_state'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(new Blockly.FieldTextInput("default"), "STATE_NAME");
    this.appendStatementInput("BODY")
      .setCheck(null);
    this.setColour("#00b5cc");
    this.setPreviousStatement(false, null);
    this.setNextStatement(false, null);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

var run_state_options = [["流水线视觉定位", "流水线视觉定位"], ["抓取", "抓取"], ["系统停止", "系统停止"], ["取料", "取料"], ["状态描述1", "状态描述1"], ["状态描述2", "状态描述2"]];

//  var tuple = Blockly.Procedures.allProcedures(workspace);
Blockly.Blocks['run_state'] = {
  init: function (data) {
    this.appendDummyInput()
      .appendField("Run State")
      .appendField(new Blockly.FieldDropdown(data || run_state_options), "NAME");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(tempColor);
    this.setTooltip("");
    this.setHelpUrl("");
  },
  reInit: function(data){
    this.init(data)
  }
};












//状态定义
Blockly.Blocks['state_def'] = {
  init: function() {
    var nameField = new Blockly.FieldTextInput('state', this.validatorStateName);
    nameField.setSpellcheck(false);
    this.appendDummyInput()
        .appendField(Blockly.Msg['PROCEDURES_DEFNORETURN_TITLE'])
        .appendField(nameField, 'NAME')
        .appendField('', 'PARAMS');
    // this.setMutator(new Blockly.Mutator(['procedures_mutatorarg']));
    if ((this.workspace.options.comments || 
      (this.workspace.options.parentWorkspace && 
        this.workspace.options.parentWorkspace.options.comments)) && Blockly.Msg['STATES_DEF_COMMENT']) { 
      this.setCommentText(Blockly.Msg['STATES_DEF_COMMENT']);
    }
    this.setStyle('procedure_blocks');
    // this.setTooltip(Blockly.Msg['PROCEDURES_DEFNORETURN_TOOLTIP']);
    this.setHelpUrl(Blockly.Msg['PROCEDURES_DEFNORETURN_HELPURL']);
    this.arguments_ = [];
    this.argumentVarModels_ = [];
    this.setStatements_(true);
    this.statementConnection_ = null;
  },

  /**
   * [validatorProcedureName 这个就是blockly\core\procedures.js  Blockly.Procedures.rename   作用就是校验名称是否符合规范，然后通知相关的组件更新名称]
   * @param  {[type]} name [description]
   * @return {[type]}      [description]
   */
  validatorStateName: function(name){
    name = name.trim();
    var findLeagalName = function(name, block){
        if (block.isInFlyout) {
          return name;
        }
        name = name || Blockly.Msg['UNNAMED_KEY'] || 'unnamed';
        while (Blockly.StateMap.isNameUsed(name, block.workspace.stateMap_)) {
          var r = name.match(/^(.*?)(\d+)$/);
          if (!r) {
            name += '2';
          } else {
            name = r[1] + (parseInt(r[2], 10) + 1);
          }
        }
        return name;
      
    }
    name = findLeagalName(name, this.getSourceBlock());
    var oldName = this.getValue();
    if (oldName != name) {
      var blocks = this.getSourceBlock().workspace.getAllBlocks(false);
      for (var i = 0; i < blocks.length; i++) {
        if (blocks[i].renameState) {
          var stateBlock = (blocks[i]);
          stateBlock.renameState(oldName, name, this.getSourceBlock());
        }
      }

      //更新stateMap
      if(this.workspace_){
        var state = this.workspace_.stateMap_.getState(oldName);
        if(state){
          state.name = name;
        }
      }
    }
    return name;
  },

  // 暂时没有用到这个函数
  alreadyExistThisBlock: function(id){
    var existFlag = false;
    var ary = [];
    if(this.workspace.procedureMap_ && this.workspace.procedureMap_.procedureMap_ && this.workspace.procedureMap_.procedureMap_['procedure_noreturn']){
      ary = this.workspace.procedureMap_.procedureMap_['procedure_noreturn'];
    }
    if(ary.length){
      existFlag = !!ary.find(function(item){
        return item.getId() === id;
      })
    }
    return existFlag;
  },
  /**
   * Add or remove the statement block from this function definition.
   * @param {boolean} hasStatements True if a statement block is needed.
   * @this {Blockly.Block}
   */
  setStatements_: function(hasStatements) {
    if (this.hasStatements_ === hasStatements) {
      return;
    }
    if (hasStatements) {
      this.appendStatementInput('STACK')
          .appendField(Blockly.Msg['PROCEDURES_DEFNORETURN_DO']);
      if (this.getInput('RETURN')) {
        this.moveInputBefore('STACK', 'RETURN');
      }
    } else {
      this.removeInput('STACK', true);
    }
    this.hasStatements_ = hasStatements;
  },
  /**
   * Update the display of parameters for this procedure definition block.
   * @private
   * @this {Blockly.Block}
   */
  updateParams_: function() {

    // Merge the arguments into a human-readable list.
    var paramString = '';
    if (this.arguments_.length) {
      paramString = Blockly.Msg['PROCEDURES_BEFORE_PARAMS'] +
          ' ' + this.arguments_.join(', ');
    }
    // The params field is deterministic based on the mutation,
    // no need to fire a change event.
    Blockly.Events.disable();
    try {
      this.setFieldValue(paramString, 'PARAMS');
    } finally {
      Blockly.Events.enable();
    }
  },
  /**
   * Create XML to represent the argument inputs.
   * @param {boolean=} opt_paramIds If true include the IDs of the parameter
   *     quarks.  Used by Blockly.Procedures.mutateCallers for reconnection.
   * @return {!Element} XML storage element.
   * @this {Blockly.Block}
   */
  mutationToDom: function(opt_paramIds) {
    var container = Blockly.utils.xml.createElement('mutation');
    if (opt_paramIds) {
      container.setAttribute('name', this.getFieldValue('NAME'));
    }
    for (var i = 0; i < this.argumentVarModels_.length; i++) {
      var parameter = Blockly.utils.xml.createElement('arg');
      var argModel = this.argumentVarModels_[i];
      parameter.setAttribute('name', argModel.name);
      parameter.setAttribute('varid', argModel.getId());
      if (opt_paramIds && this.paramIds_) {
        parameter.setAttribute('paramId', this.paramIds_[i]);
      }
      container.appendChild(parameter);
    }

    // Save whether the statement input is visible.
    if (!this.hasStatements_) {
      container.setAttribute('statements', 'false');
    }
    return container;
  },
  /**
   * Parse XML to restore the argument inputs.
   * @param {!Element} xmlElement XML storage element.
   * @this {Blockly.Block}
   */
  domToMutation: function(xmlElement) {
    this.arguments_ = [];
    this.argumentVarModels_ = [];
    for (var i = 0, childNode; (childNode = xmlElement.childNodes[i]); i++) {
      if (childNode.nodeName.toLowerCase() == 'arg') {
        var varName = childNode.getAttribute('name');
        var varId = childNode.getAttribute('varid') || childNode.getAttribute('varId');
        this.arguments_.push(varName);
        var variable = Blockly.Variables.getOrCreateVariablePackage(
            this.workspace, varId, varName, '');
        if (variable != null) {
          this.argumentVarModels_.push(variable);
        } else {
          console.log('Failed to create a variable with name ' + varName + ', ignoring.');
        }
      }
    }
    this.updateParams_();
    Blockly.Procedures.mutateCallers(this);

    // Show or hide the statement input.
    this.setStatements_(xmlElement.getAttribute('statements') !== 'false');
  },
  /**
   * Populate the mutator's dialog with this block's components.
   * @param {!Blockly.Workspace} workspace Mutator's workspace.
   * @return {!Blockly.Block} Root block in mutator.
   * @this {Blockly.Block}
   */
  decompose: function(workspace) {
    /*
     * Creates the following XML:
     * <block type="procedures_mutatorcontainer">
     *   <statement name="STACK">
     *     <block type="procedures_mutatorarg">
     *       <field name="NAME">arg1_name</field>
     *       <next>etc...</next>
     *     </block>
     *   </statement>
     * </block>
     */

    var containerBlockNode = Blockly.utils.xml.createElement('block');
    containerBlockNode.setAttribute('type', 'procedures_mutatorcontainer');
    var statementNode = Blockly.utils.xml.createElement('statement');
    statementNode.setAttribute('name', 'STACK');
    containerBlockNode.appendChild(statementNode);

    var node = statementNode;
    for (var i = 0; i < this.arguments_.length; i++) {
      var argBlockNode = Blockly.utils.xml.createElement('block');
      argBlockNode.setAttribute('type', 'procedures_mutatorarg');
      var fieldNode = Blockly.utils.xml.createElement('field');
      fieldNode.setAttribute('name', 'NAME');
      var argumentName = Blockly.utils.xml.createTextNode(this.arguments_[i]);
      fieldNode.appendChild(argumentName);
      argBlockNode.appendChild(fieldNode);
      var nextNode = Blockly.utils.xml.createElement('next');
      argBlockNode.appendChild(nextNode);

      node.appendChild(argBlockNode);
      node = nextNode;
    }

    var containerBlock = Blockly.Xml.domToBlock(containerBlockNode, workspace);

    if (this.type == 'procedures_defreturn') {
      containerBlock.setFieldValue(this.hasStatements_, 'STATEMENTS');
    } else {
      containerBlock.removeInput('STATEMENT_INPUT');
    }

    // Initialize procedure's callers with blank IDs.
    Blockly.Procedures.mutateCallers(this);
    return containerBlock;
  },
  /**
   * Reconfigure this block based on the mutator dialog's components.
   * @param {!Blockly.Block} containerBlock Root block in mutator.
   * @this {Blockly.Block}
   */
  compose: function(containerBlock) {
    // Parameter list.
    this.arguments_ = [];
    this.paramIds_ = [];
    this.argumentVarModels_ = [];
    var paramBlock = containerBlock.getInputTargetBlock('STACK');
    while (paramBlock) {
      var varName = paramBlock.getFieldValue('NAME');
      this.arguments_.push(varName);
      var variable = this.workspace.getVariable(varName, '');
      this.argumentVarModels_.push(variable);

      this.paramIds_.push(paramBlock.id);
      paramBlock = paramBlock.nextConnection &&
          paramBlock.nextConnection.targetBlock();
    }
    this.updateParams_();
    Blockly.Procedures.mutateCallers(this);

    // Show/hide the statement input.
    var hasStatements = containerBlock.getFieldValue('STATEMENTS');
    if (hasStatements !== null) {
      hasStatements = hasStatements == 'TRUE';
      if (this.hasStatements_ != hasStatements) {
        if (hasStatements) {
          this.setStatements_(true);
          // Restore the stack, if one was saved.
          Blockly.Mutator.reconnect(this.statementConnection_, this, 'STACK');
          this.statementConnection_ = null;
        } else {
          // Save the stack, then disconnect it.
          var stackConnection = this.getInput('STACK').connection;
          this.statementConnection_ = stackConnection.targetConnection;
          if (this.statementConnection_) {
            var stackBlock = stackConnection.targetBlock();
            stackBlock.unplug();
            stackBlock.bumpNeighbours();
          }
          this.setStatements_(false);
        }
      }
    }
  },
  /**
   * Return the signature of this procedure definition.
   * @return {!Array} Tuple containing three elements:
   *     - the name of the defined procedure,
   *     - a list of all its arguments,
   *     - that it DOES NOT have a return value.
   * @this {Blockly.Block}
   */
  getProcedureDef: function() {
    return [this.getFieldValue('NAME'), this.arguments_, false];
  },
  /**
   * Return all variables referenced by this block.
   * @return {!Array.<string>} List of variable names.
   * @this {Blockly.Block}
   */
  getVars: function() {
    return this.arguments_;
  },
  /**
   * Return all variables referenced by this block.
   * @return {!Array.<!Blockly.VariableModel>} List of variable models.
   * @this {Blockly.Block}
   */
  getVarModels: function() {
    return this.argumentVarModels_;
  },
  /**
   * Notification that a variable is renaming.
   * If the ID matches one of this block's variables, rename it.
   * @param {string} oldId ID of variable to rename.
   * @param {string} newId ID of new variable.  May be the same as oldId, but
   *     with an updated name.  Guaranteed to be the same type as the old
   *     variable.
   * @override
   * @this {Blockly.Block}
   */
  renameVarById: function(oldId, newId) {
    var oldVariable = this.workspace.getVariableById(oldId);
    if (oldVariable.type != '') {
      // Procedure arguments always have the empty type.
      return;
    }
    var oldName = oldVariable.name;
    var newVar = this.workspace.getVariableById(newId);

    var change = false;
    for (var i = 0; i < this.argumentVarModels_.length; i++) {
      if (this.argumentVarModels_[i].getId() == oldId) {
        this.arguments_[i] = newVar.name;
        this.argumentVarModels_[i] = newVar;
        change = true;
      }
    }
    if (change) {
      this.displayRenamedVar_(oldName, newVar.name);
      Blockly.Procedures.mutateCallers(this);
    }
  },
  /**
   * Notification that a variable is renaming but keeping the same ID.  If the
   * variable is in use on this block, rerender to show the new name.
   * @param {!Blockly.VariableModel} variable The variable being renamed.
   * @package
   * @override
   * @this {Blockly.Block}
   */
  updateVarName: function(variable) {
    var newName = variable.name;
    var change = false;
    for (var i = 0; i < this.argumentVarModels_.length; i++) {
      if (this.argumentVarModels_[i].getId() == variable.getId()) {
        var oldName = this.arguments_[i];
        this.arguments_[i] = newName;
        change = true;
      }
    }
    if (change) {
      this.displayRenamedVar_(oldName, newName);
      Blockly.Procedures.mutateCallers(this);
    }
  },
  /**
   * Update the display to reflect a newly renamed argument.
   * @param {string} oldName The old display name of the argument.
   * @param {string} newName The new display name of the argument.
   * @private
   * @this {Blockly.Block}
   */
  displayRenamedVar_: function(oldName, newName) {
    this.updateParams_();
    // Update the mutator's variables if the mutator is open.
    if (this.mutator && this.mutator.isVisible()) {
      var blocks = this.mutator.workspace_.getAllBlocks(false);
      for (var i = 0, block; (block = blocks[i]); i++) {
        if (block.type == 'procedures_mutatorarg' &&
            Blockly.Names.equals(oldName, block.getFieldValue('NAME'))) {
          block.setFieldValue(newName, 'NAME');
        }
      }
    }
  },
  /**
   * Add custom menu options to this block's context menu.
   * @param {!Array} options List of menu options to add to.
   * @this {Blockly.Block}
   */
  customContextMenu: function(options) {
    if (this.isInFlyout) {
      return;
    }
    // Add option to create caller.
    var option = {enabled: true};
    var name = this.getFieldValue('NAME');
    option.text = Blockly.Msg['PROCEDURES_CREATE_DO'].replace('%1', name);
    var xmlMutation = Blockly.utils.xml.createElement('mutation');
    xmlMutation.setAttribute('name', name);
    for (var i = 0; i < this.arguments_.length; i++) {
      var xmlArg = Blockly.utils.xml.createElement('arg');
      xmlArg.setAttribute('name', this.arguments_[i]);
      xmlMutation.appendChild(xmlArg);
    }
    var xmlBlock = Blockly.utils.xml.createElement('block');
    xmlBlock.setAttribute('type', this.callType_);
    xmlBlock.appendChild(xmlMutation);
    option.callback = Blockly.ContextMenu.callbackFactory(this, xmlBlock);
    options.push(option);

    // Add options to create getters for each parameter.
    if (!this.isCollapsed()) {
      for (var i = 0; i < this.argumentVarModels_.length; i++) {
        var argOption = {enabled: true};
        var argVar = this.argumentVarModels_[i];
        argOption.text = Blockly.Msg['VARIABLES_SET_CREATE_GET']
            .replace('%1', argVar.name);

        var argXmlField = Blockly.Variables.generateVariableFieldDom(argVar);
        var argXmlBlock = Blockly.utils.xml.createElement('block');
        argXmlBlock.setAttribute('type', 'variables_get');
        argXmlBlock.appendChild(argXmlField);
        argOption.callback =
            Blockly.ContextMenu.callbackFactory(this, argXmlBlock);
        options.push(argOption);
      }
    }
    // 修改删除block的回调   options[4]
    var deleteOption = options[4];
    log(deleteOption);
    if(deleteOption){
      var oldCallback = deleteOption.callback;
      var stateDefBlock = this;
      deleteOption.callback = function(){
        stateDefBlock.triggerDeleteState();
        oldCallback && oldCallback();
      }
    }
  },
  triggerDeleteState: function(){
    this.workspace.deleteStateById(this.id);
  },
  /*dispose: function(healStack){
    debugger;
  },*/
  callType_: 'state_call'
};

goog.require('Blockly.FieldState');
Blockly.Blocks['state_opr'] = {
  init: function(){
    this.appendDummyInput('NAME')
    .appendField(new Blockly.FieldState('STATE_NAME', function(name){return name;}) ,'field_state');
    this.setOutput(false, null);
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setStyle("thread_blocks");
    this.setTooltip("");
    this.setHelpUrl("");
  },
  renameState: function(oldName, newName, newBlock) {
    var fieldState = this.getField('field_state');
    log('oldName: ' + oldName + ' --- fieldState.selectedOption_[0]: ' + fieldState.selectedOption_[0]);
    if (Blockly.Names.equals(oldName, fieldState.selectedOption_[0])) {
      log('equals');
      
      var stateId = fieldState.getValue();
      var state = this.workspace.stateMap_.getStateById(stateId);
      //如果id相等才需要重命名，复制粘贴某个“状态定义块（state_def）”时这个id是不一样的，而且此时stateMap_中还没有这个newBlock所创建的state数据
      if(newBlock && newBlock.id === stateId){
        this.workspace.stateMap_.renameState(state, newName);
        fieldState.getOptions(false);
        fieldState.doValueUpdate_(state.getId());
      }
      // this.setFieldValue(newName, 'field_procedure');
     /*  var baseMsg = this.outputConnection ?
          Blockly.Msg['PROCEDURES_CALLRETURN_TOOLTIP'] :
          Blockly.Msg['PROCEDURES_CALLNORETURN_TOOLTIP'];
      this.setTooltip(baseMsg.replace('%1', newName)); */
    }
  },
  dispose: function(healStack){
    debugger;
  },
  customContextMenu: function(options){
debugger;
    return options;
  }
  /*extensions: [{
    customContextMenu: function(options){

    }
  }]*/
};