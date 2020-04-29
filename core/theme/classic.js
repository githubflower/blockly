/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Classic theme.
 * Contains multi-coloured border to create shadow effect.
 */
'use strict';

goog.provide('Blockly.Themes.Classic');

goog.require('Blockly.Theme');


// Temporary holding object.
Blockly.Themes.Classic = {};
/* 
Blockly.Themes.Classic.defaultBlockStyles = {
  "colour_blocks": {
    "colourPrimary": "20"
  },
  "list_blocks": {
    "colourPrimary": "260"
  },
  "logic_blocks": {
    "colourPrimary": "210"
  },
  "loop_blocks": {
    "colourPrimary": "120"
  },
  "math_blocks": {
    "colourPrimary": "230"
  },
  "procedure_blocks": {
    "colourPrimary": "290"
  },
  "text_blocks": {
    "colourPrimary": "160"
  },
  "variable_blocks": {
    "colourPrimary": "330"
  },
  "variable_dynamic_blocks": {
    "colourPrimary": "310"
  },
  "hat_blocks": {
    "colourPrimary": "330",
    "hat": "cap"
  }
}; */
var testfn = function(){};
testfn();

// var colorAry = ["#8400FF", "#0000FF", "#02A7F0", "#00FFFF", "#95F204", "#FFFF00", "#F59A23", "#D9001B"];
/* var colorAry = ["#8400FF", "#651FFF", "#02A7F0", "#00FFFF", "#95F204", "#1088F2", "#F59A23", "#D9001B"];
var blocksAry = ["colour_blocks", "list_blocks", "logic_blocks", "loop_blocks", "math_blocks", "procedure_blocks", "text_blocks", "variable_blocks", "variable_dynamic_blocks", "hat_blocks", "blue1_blocks" ];
Blockly.Themes.Classic.defaultBlockStyles = {};
blocksAry.forEach((block_type, i) => {
  Blockly.Themes.Classic.defaultBlockStyles[block_type] = {
    colourPrimary: colorAry[i % colorAry.length]
  }
}) */
// var block_color_ary = ["#6bb9f0", "#21AEF3", "#651FFF", "#21AEF3", "#00b5cc"];
// var block_color_ary = ['#16C806', '#04D5C9', '#01B6E5', '#8E05BF', '#EE0675' ];
// var block_color_ary = ['#2C73D2', '#0081CF', '#0089BA', '#008E9B', '#008F7A' ];
// var block_color_ary = ['#409EFF', '#00BEFF', '#00D8ED', '#00EBBD', '#97F68C' ];
// var block_color_ary = ['#FF728D', '#3B43ED', '#FFAF0F', '#EE5523', '#00703E' ];
var block_color_ary = ['#1B67B3', '#3363FF', '#409FFF', '#238DAD', '#28C9C4' ];
var colorAryByType = [
  "#F92672",
  "#F92672",
  "#AE81FF",
  "#FFB840",
  "#FF6459",
  "#ff00cc",
  "#64C7DE",
  "#66D9E2",
  "#E8FF26",
  "#FD971F",
  "#FF6459",
  "#A6E23E",
];

Blockly.Themes.Classic.defaultBlockStyles = {
  "logic_blocks": {
    // "colourPrimary": "#F92672"
    "colourPrimary": block_color_ary[1]//blue5_blocks
  },
  "loop_blocks": {
    "colourPrimary": "#F92672"
    // "colourPrimary": block_color_ary[2]
  },
  "math_blocks": {
    "colourPrimary": "#AE81FF"
    // "colourPrimary": block_color_ary[3]  //blue5_blocks
  },
  "text_blocks": {
    "colourPrimary": "#FFB840"
    // "colourPrimary": "#E6DB74"
    // "colourPrimary": block_color_ary[4] 
  },
  "list_blocks": {
    "colourPrimary": "#FF6459"
    // "colourPrimary": block_color_ary[0]
  },
  "colour_blocks": {
    "colourPrimary": "#ff00cc"
  },
  "variable_blocks": {
    "colourPrimary": "#64C7DE"
  },
  "variable_dynamic_blocks": {
    "colourPrimary": "#66D9E2"
  },
  "hat_blocks": {
    "colourPrimary": "#E8FF26",
    "hat": "cap"
  },
  "procedure_blocks": {
    "colourPrimary": "#52D9EF"  //blue5_blocks
    // "colourPrimary": "#21AEF3"  //blue5_blocks
  },
  "class_blocks": {
    "colourPrimary": "#FD971F"
  },
  "class_property": {
    "colourPrimary": "#FF6459"
  },
  "class_method": {
    "colourPrimary": "#A6E23E"
  },
  


  "blue1_blocks": {
    "colourPrimary": "#1088F2"
  },
  "blue2_blocks": {
    "colourPrimary": "#7EBAD9"
  },
  "blue3_blocks": {
    "colourPrimary": "#4350AF"
  },
  "blue4_blocks": {
    "colourPrimary": "#64C7DE"
  },
  "blue5_blocks": {
    "colourPrimary": "#21AEF3"
  },
  "red1_blocks": {
    "colourPrimary": "#E04C42"
  },
  "yellow1_blocks": {
    "colourPrimary": "#F19E38"
  },
  "puple1_blocks": {
    "colourPrimary": "#651FFF"
  },
  "green1_blocks": {
    "colourPrimary": "#58C0A7"
  },

};

Blockly.Themes.Classic.categoryStyles = {
  "colour_category": {
    "colour": "#000000"
    // "colour": "20"
  },
  "list_category": {
    "colour": "260"
  },
  "logic_category": {
    "colour": "210"
  },
  "loop_category": {
    "colour": "120"
  },
  "math_category": {
    "colour": "230"
  },
  "procedure_category": {
    "colour": "290"
  },
  "text_category": {
    "colour": "160"
  },
  "variable_category": {
    "colour": "330"
  },
  "variable_dynamic_category": {
    "colour": "310"
  }
};

Blockly.Themes.Classic =
    new Blockly.Theme('classic', Blockly.Themes.Classic.defaultBlockStyles,
        Blockly.Themes.Classic.categoryStyles);
