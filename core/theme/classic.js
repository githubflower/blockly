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

// var colorAry = ["#8400FF", "#0000FF", "#02A7F0", "#00FFFF", "#95F204", "#FFFF00", "#F59A23", "#D9001B"];
/* var colorAry = ["#8400FF", "#651FFF", "#02A7F0", "#00FFFF", "#95F204", "#1088F2", "#F59A23", "#D9001B"];
var blocksAry = ["colour_blocks", "list_blocks", "logic_blocks", "loop_blocks", "math_blocks", "procedure_blocks", "text_blocks", "variable_blocks", "variable_dynamic_blocks", "hat_blocks", "blue1_blocks" ];
Blockly.Themes.Classic.defaultBlockStyles = {};
blocksAry.forEach((block_type, i) => {
  Blockly.Themes.Classic.defaultBlockStyles[block_type] = {
    colourPrimary: colorAry[i % colorAry.length]
  }
}) */

Blockly.Themes.Classic.defaultBlockStyles = {
  "colour_blocks": {
    "colourPrimary": "20"
  },
  "list_blocks": {
    "colourPrimary": "260"
  },
  "logic_blocks": {
    "colourPrimary": "#21AEF3" //blue5_blocks
  },
  "loop_blocks": {
    "colourPrimary": "120"
  },
  "math_blocks": {
    "colourPrimary": "#21AEF3"  //blue5_blocks
  },
  "procedure_blocks": {
    "colourPrimary": "#21AEF3"  //blue5_blocks
  },
  "text_blocks": {
    "colourPrimary": "160"
  },
  "variable_blocks": {
    "colourPrimary": "#64C7DE"
  },
  "variable_dynamic_blocks": {
    "colourPrimary": "310"
  },
  "hat_blocks": {
    "colourPrimary": "330",
    "hat": "cap"
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
    "colour": "20"
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
