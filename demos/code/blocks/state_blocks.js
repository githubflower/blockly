Blockly.Blocks['lists_state'] = Util.deepCopy(Blockly.Blocks['lists_create_with']);
Blockly.Blocks['lists_state'].init = function() {
  this.appendDummyInput('MANAGE_LISTS_STATE')
    .appendField(
      new Blockly.FieldButton(
        '折叠全部',
        {
            class: 'blockly-button',
            tooltip: '',
            clickHandler: function(){
              // this.sourceBlock_.setCollapsed(true);
              this.isCollapsed_ = !this.isCollapsed_; // 注意这里是按钮的状态哦，不要和block的状态混淆了
              if(this.isCollapsed_){
                this.setValue('展开全部');
              }else{
                this.setValue('折叠全部');
              }
              this.sourceBlock_.inputList.forEach(input => {
                if(input && input.connection && input.connection.targetBlock()){
                  input.connection.targetBlock().setCollapsed(this.isCollapsed_ ? true : false);
                }
              });
            }
        }, 
    ),'COLLAPSE_ALL');
  this.setHelpUrl(Blockly.Msg['LISTS_CREATE_WITH_HELPURL']);
  this.setStyle('list_blocks');
  this.itemCount_ = 3;
  this.updateShape_();
  this.setOutput(false);
  this.setMutator(new Blockly.Mutator(['lists_create_with_item']));
  this.setTooltip(Blockly.Msg['LISTS_CREATE_WITH_TOOLTIP']);
};
Blockly.Blocks['lists_state'].updateShape_ = function() {
  if (this.itemCount_ && this.getInput('EMPTY')) {
    this.removeInput('EMPTY');
  } else if (!this.itemCount_ && !this.getInput('EMPTY')) {
    this.appendDummyInput('EMPTY')
      .appendField(Blockly.Msg['LISTS_CREATE_EMPTY_TITLE']);
  }
  // Add new inputs.
  for (var i = 0; i < this.itemCount_; i++) {
    if (!this.getInput('ADD' + i)) {
      var input = this.appendValueInput('ADD' + i)
        .setAlign(Blockly.ALIGN_RIGHT)
        .setFieldWidthBasedOnTopRow(false);
      /*if (i == 0) {
        input.appendField(Blockly.Msg["DEFINE_STATES"]);
      }*/
    }
  }
  // Remove deleted inputs.
  while (this.getInput('ADD' + i)) {
    this.removeInput('ADD' + i);
    i++;
  }
}
//覆盖common/drawer.js drawValueInput_方法
Blockly.utils.tool.apply(Blockly.Blocks.lists_state, {
  drawValueInput_: function(row, index){
    var input = row.getLastInput();
    this.positionExternalValueConnection_(row);

    var pathDown = (typeof input.shape.pathDown == "function") ?
        input.shape.pathDown(input.height) :
        input.shape.pathDown;
    this.outlinePath_ +=
          Blockly.utils.svgPaths.lineOnAxis('H', input.xPos + input.width) +
          pathDown +
          Blockly.utils.svgPaths.lineOnAxis('v', row.height - input.connectionHeight);
  },
  drawRightSideRow_: function(row, index){
    // this --> drawer实例
    /*if(row.hasDummyInput){
      var input = row.elements.find(item => {
        return item.parentInput && item.parentInput.name === 'MANAGE_LISTS_STATE';
      });
      if(input){
        this.info_.titleEnded = true;
      }
    }*/
    //如果是第一个spaceRow，则应该按照this.info_.width来绘制右边
    if(index === 1 && Blockly.blockRendering.Types.isSpacer(row)){
      this.outlinePath_ +=
        Blockly.utils.svgPaths.lineOnAxis('H', this.info_.width - 1) +
        Blockly.utils.svgPaths.lineOnAxis('V', row.yPos + row.height);
    }else{
      this.outlinePath_ +=
        Blockly.utils.svgPaths.lineOnAxis('H', row.xPos + row.width) +
        Blockly.utils.svgPaths.lineOnAxis('V', row.yPos + row.height + (row.hasDummyInput ? this.constants_.MEDIUM_PADDING : 0));
    }
  },
  getDesiredRowWidth_: function(_row) {
    //this --> renderInfo实例  info_
    // return this.width - this.startX;
    if(Blockly.blockRendering.Types.isTopRow(_row)){
      return this.width - this.startX;
    }else{
      if(this.titleEnded){
        return this.widestFieldOfInput - this.startX;
      }else{
        return this.width - this.startX;
      }
    }
  },
  setInfoByInput: function(input){
    //this --> renderInfo实例  info_
    if(input.name === 'MANAGE_LISTS_STATE'){
      this.titleEnded = true;
    }
  },
  /*getSpacerRowHeight_: function(prev, next) {
    // If we have an empty block add a spacer to increase the height.
    if (Blockly.blockRendering.Types.isTopRow(prev) &&
        Blockly.blockRendering.Types.isBottomRow(next)) {
      return this.constants_.EMPTY_BLOCK_SPACER_HEIGHT;
    }
    // Top and bottom rows act as a spacer so we don't need any extra padding.
    if (Blockly.blockRendering.Types.isTopRow(prev) ||
        Blockly.blockRendering.Types.isBottomRow(next)) {
      return this.constants_.NO_PADDING;
    }
    if (prev.hasExternalInput && next.hasExternalInput) {
      return this.constants_.LARGE_PADDING;
    }
    if (!prev.hasStatement && next.hasStatement) {
      return this.constants_.BETWEEN_STATEMENT_PADDING_Y;
    }
    if (prev.hasStatement && next.hasStatement) {
      return this.constants_.LARGE_PADDING;
    }
    if (!prev.hasStatement && next.hasDummyInput) {
      return this.constants_.LARGE_PADDING;
    }
    if (prev.hasDummyInput) {
      return this.constants_.LARGE_PADDING;
    }
    return this.constants_.MEDIUM_PADDING;
  }*/
})
