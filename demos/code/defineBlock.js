

//参考创建数组的方式来创建一个Object
Blockly.Blocks['create_obj'] = {
  /**
   * Block for creating a list with any number of elements of any type.
   * @this {Blockly.Block}
   */
  init: function() {
    this.setHelpUrl(Blockly.Msg['LISTS_CREATE_WITH_HELPURL']);
    this.setStyle('list_blocks');
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
        .appendField("class")
        .appendField(new Blockly.FieldTextInput("className"), "NAME");
    this.appendStatementInput("PROPERTY")
        .setCheck("")
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("property:");
    this.appendStatementInput("METHOD")
        .setCheck(null)
        .appendField("method:");
    this.setColour(230);
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
    this.setStyle('list_blocks');
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
          .appendField(new Blockly.FieldDropdown([["private", "private"], ["public", "public"], ["public static", "public static"]]), "TYPE" + i)
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
    this.setStyle('list_blocks');
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
        // var input = this.appendValueInput("item_value" + i)
        var input = this.appendStatementInput("item_value" + i)
          .appendField(new Blockly.FieldDropdown([["private", "private"], ["public", "public"]]), "TYPE" + i)
          .appendField(new Blockly.FieldTextInput('method' + i), 'item_key' + i)
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
    this.setColour(230);
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
          ["Yellow", "Yellow"]
        ]),
        "PROPERTY0"
      )
      .appendField(".")
      .appendField(
        new Blockly.FieldDropdown([
          ["LineWaitePos", "LineWaitePos"],
        ]),
        "PROPERTY1"
      )
    this.setOutput(true, null);
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['set_class_property'] = {
  init: function () {
    // this.appendDummyInput()
     
    this.appendValueInput("VALUE")
      .appendField("set")
      .appendField(new Blockly.FieldDropdown([["cRun", "cRun"], ["cBase", "cBase"]]), "CLASS")
      .appendField(".")
      .appendField(new Blockly.FieldDropdown([["bStopFlag", "bStopFlag"], ["cAct", "cAct"], ["bIsRunning", "bIsRunning"], ["InitThread", "InitThread"]]), "PROPERTY")
      .appendField("to")
    this.setOutput(false, null);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(230);
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
    this.setColour(230);
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
    this.setColour(230);
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
    this.setColour(230);
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
        ]),
        "PROPERTY4"
      )
      .appendField("to");
    this.setOutput(false, null);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(230);
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
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['class_method_return4'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("do")
      .appendField(new Blockly.FieldDropdown([["cBase", "cBase"], ["cRun", "cRun"]]), "CLASS")
      .appendField(".")
      .appendField(new Blockly.FieldDropdown([["bStopFlag", "bStopFlag"], ["cAct", "cAct"], ["SaveLog", "SaveLog"], ["InitThread", "InitThread"], ["ClearAllCmd", "ClearAllCmd"], ["SendAllPara", "SendAllPara"]]), "METHOD")
      .appendField(".")
      .appendField(new Blockly.FieldDropdown([["0", "0"], ["1", "1"]]), "PROPERTY1")
      .appendField(".")
      .appendField(new Blockly.FieldDropdown([["Init", "Init"], ["Start", "Start"]]), "PROPERTY2");
      this.setOutput(true, null);
    this.setPreviousStatement(false);
    this.setNextStatement(false);
    this.setColour(230);
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
    this.setColour(230);
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
    this.setColour(230);
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
  this.setStyle('procedure_blocks');
  this.setTooltip(Blockly.Msg['PROCEDURES_IFRETURN_TOOLTIP']);
  this.setHelpUrl(Blockly.Msg['PROCEDURES_IFRETURN_HELPURL']);
  this.hasReturnValue_ = true;
}