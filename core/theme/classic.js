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
// var block_color_ary = ['#1B67B3', '#3363FF', '#409FFF', '#238DAD', '#28C9C4' ];
// var block_color_ary = ['#A30014', '#B8741A', '#BFBF00', '#70B603', '#00BFBF', '#027DB4', '#0000BF', '#6300BF' ];
// var block_color_ary = ['#A30014', '#B8741A', '#BFBF00', '#70B603', '#00BFBF', '#027DB4', '#F9273C', '#6300BF' ];
//monika 配色  深色主题
//                         0          1          2          3          4          5          6          7          8
// var block_color_ary = ['#A30014', '#52D3F0', '#BFBF00', '#70B603', '#00BFBF', '#1088F2', '#FF728D', '#6300BF', '#FFAF0F' ];

//monika 配色  浅色主题
//                         0          1          2          3          4          5          6          7          8
var block_color_ary = ['#A30014', '#52D3F0', '#BFBF00', '#70B603', '#00BFBF', '#1088F2', '#EE5523', '#3B43ED', '#EE0675', '#FFAF0F' ];

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
    "colourPrimary": block_color_ary[6],
    "colourTertiary": block_color_ary[6],
  },
  "loop_blocks": {
    // "colourPrimary": "#F92672"
    "colourPrimary": block_color_ary[6],
    "colourTertiary": block_color_ary[6],
  },
  "math_blocks": {
    // "colourPrimary": "#AE81FF"
    "colourPrimary": block_color_ary[7],
    "colourTertiary": block_color_ary[7],
  },
  "text_blocks": {
    // "colourPrimary": "#FFB840"
    // "colourPrimary": "#E6DB74"
    "colourPrimary": block_color_ary[8],
    "colourTertiary": block_color_ary[8],
  },
  "list_blocks": {
    // "colourPrimary": "#FF6459"
    "colourPrimary": block_color_ary[5],
    "colourTertiary": block_color_ary[5],
  },
  "colour_blocks": {
    // "colourPrimary": "#ff00cc"
    "colourPrimary": block_color_ary[6],
    "colourTertiary": block_color_ary[6],
  },
  "variable_blocks": {
    // "colourPrimary": "#64C7DE"
    "colourPrimary": block_color_ary[7],
    "colourTertiary": block_color_ary[7],
  },
  "variable_dynamic_blocks": {
    // "colourPrimary": "#66D9E2"
    "colourPrimary": block_color_ary[0],
    "colourTertiary": block_color_ary[0],
  },
  "hat_blocks": {
    "colourPrimary": "#E8FF26",
    "hat": "cap"
  },
  "procedure_blocks": {
    // "colourPrimary": "#52D9EF"  //blue5_blocks
    "colourPrimary": block_color_ary[5],
    "colourTertiary": block_color_ary[5],
  },
  "class_blocks": {
    // "colourPrimary": "#FD971F"
    "colourPrimary": block_color_ary[4],
    "colourTertiary": block_color_ary[4],
  },
  "class_property": {
    // "colourPrimary": "#FF6459"
    // "colourPrimary": "#FFB840"
    "colourPrimary": block_color_ary[5],
    "colourTertiary": block_color_ary[5],
  },
  "class_method": {
    // "colourPrimary": "#A6E23E"
    // "colourPrimary": "#FFB840"
    "colourPrimary": block_color_ary[5],
    "colourTertiary": block_color_ary[5],
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
    // "colourPrimary": "#64C7DE", //深色主题下的颜色
    "colourPrimary": "#00703E", //浅色主题下的颜色
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
