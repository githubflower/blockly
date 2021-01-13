/**
 * @license
 * Copyright 2013 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Angle input field.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

goog.provide('Blockly.FieldSlider');

goog.require('Blockly.Css');
goog.require('Blockly.DropDownDiv');
goog.require('Blockly.fieldRegistry');
goog.require('Blockly.FieldTextInput');
goog.require('Blockly.utils.dom');
goog.require('Blockly.utils.math');
goog.require('Blockly.utils.object');
goog.require('Blockly.utils.userAgent');


/**
 * Class for an editable angle field.
 * @param {string|number=} opt_value The initial value of the field. Should cast
 *    to a number. Defaults to 0.
 * @param {Function=} opt_validator A function that is called to validate
 *    changes to the field's value. Takes in a number & returns a
 *    validated number, or null to abort the change.
 * @param {Object=} opt_config A map of options used to configure the field.
 *    See the [field creation documentation]{@link https://developers.google.com/blockly/guides/create-custom-blocks/fields/built-in-fields/angle#creation}
 *    for a list of properties this parameter supports.
 * @extends {Blockly.FieldTextInput}
 * @constructor
 */
Blockly.FieldSlider = function(opt_value, opt_validator, opt_config) {

  /**
   * Should the angle increase as the angle picker is moved clockwise (true)
   * or counterclockwise (false)
   * @see Blockly.FieldSlider.CLOCKWISE
   * @type {boolean}
   * @private
   */
  this.clockwise_ = Blockly.FieldSlider.CLOCKWISE;

  /**
   * The offset of zero degrees (and all other angles).
   * @see Blockly.FieldSlider.OFFSET
   * @type {number}
   * @private
   */
  this.offset_ = Blockly.FieldSlider.OFFSET;

  /**
   * The maximum angle to allow before wrapping.
   * @see Blockly.FieldSlider.WRAP
   * @type {number}
   * @private
   */
  this.wrap_ = Blockly.FieldSlider.WRAP;

  /**
   * The amount to round angles to when using a mouse or keyboard nav input.
   * @see Blockly.FieldSlider.ROUND
   * @type {number}
   * @private
   */
  this.round_ = Blockly.FieldSlider.ROUND;

  if(!opt_validator){
    opt_validator = function(text) {
      var speed = parseInt(text, 10);
      if(speed > 100 || speed < 0){
          this.getSourceBlock().setColour('#ff0000');
          return null;
      }else{
          this.getSourceBlock().setColour('#1F7A00');
      }
    }
  }

  Blockly.FieldSlider.superClass_.constructor.call(
    this, opt_value || 0, opt_validator, opt_config);

  /**
   * The angle picker's gauge path depending on the value.
   * @type {SVGElement}
   */
  this.gauge_ = null;

  /**
   * The angle picker's line drawn representing the value's angle.
   * @type {SVGElement}
   */
  this.line_ = null;

  /**
   * Wrapper click event data.
   * @type {?Blockly.EventData}
   * @private
   */
  this.clickWrapper_ = null;

  /**
   * Surface click event data.
   * @type {?Blockly.EventData}
   * @private
   */
  this.clickSurfaceWrapper_ = null;

  /**
   * Surface mouse move event data.
   * @type {?Blockly.EventData}
   * @private
   */
  this.moveSurfaceWrapper_ = null;
};
Blockly.utils.object.inherits(Blockly.FieldSlider, Blockly.FieldTextInput);

/**
 * Construct a FieldSlider from a JSON arg object.
 * @param {!Object} options A JSON object with options (angle).
 * @return {!Blockly.FieldSlider} The new field instance.
 * @package
 * @nocollapse
 */
Blockly.FieldSlider.fromJson = function(options) {
  return new Blockly.FieldSlider(options['angle'], undefined, options);
};

/**
 * Serializable fields are saved by the XML renderer, non-serializable fields
 * are not. Editable fields should also be serializable.
 * @type {boolean}
 */
Blockly.FieldSlider.prototype.SERIALIZABLE = true;

/**
 * The default amount to round angles to when using a mouse or keyboard nav
 * input. Must be a positive integer to support keyboard navigation.
 * @const {number}
 */
Blockly.FieldSlider.ROUND = 10;

/**
 * Half the width of protractor image.
 * @const {number}
 */
Blockly.FieldSlider.HALF = 100 / 2;

/**
 * Default property describing which direction makes an angle field's value
 * increase. Angle increases clockwise (true) or counterclockwise (false).
 * @const {boolean}
 */
Blockly.FieldSlider.CLOCKWISE = false;

/**
 * The default offset of 0 degrees (and all angles). Always offsets in the
 * counterclockwise direction, regardless of the field's clockwise property.
 * Usually either 0 (0 = right) or 90 (0 = up).
 * @const {number}
 */
Blockly.FieldSlider.OFFSET = 0;

/**
 * The default maximum angle to allow before wrapping.
 * Usually either 360 (for 0 to 359.9) or 180 (for -179.9 to 180).
 * @const {number}
 */
Blockly.FieldSlider.WRAP = 100;

/**
 * Radius of protractor circle.  Slightly smaller than protractor size since
 * otherwise SVG crops off half the border at the edges.
 * @const {number}
 */
Blockly.FieldSlider.RADIUS = Blockly.FieldSlider.HALF - 1;

/**
 * Configure the field based on the given map of options.
 * @param {!Object} config A map of options to configure the field based on.
 * @private
 */
Blockly.FieldSlider.prototype.configure_ = function(config) {
  Blockly.FieldSlider.superClass_.configure_.call(this, config);

  switch (config['mode']) {
    case 'compass':
      this.clockwise_ = true;
      this.offset_ = 90;
      break;
    case 'protractor':
      // This is the default mode, so we could do nothing. But just to
      // future-proof, we'll set it anyway.
      this.clockwise_ = false;
      this.offset_ = 0;
      break;
  }

  // Allow individual settings to override the mode setting.
  var clockwise = config['clockwise'];
  if (typeof clockwise == 'boolean') {
    this.clockwise_ = clockwise;
  }

  // If these are passed as null then we should leave them on the default.
  var offset = config['offset'];
  if (offset != null) {
    offset = Number(offset);
    if (!isNaN(offset)) {
      this.offset_ = offset;
    }
  }
  var wrap = config['wrap'];
  if (wrap != null) {
    wrap = Number(wrap);
    if (!isNaN(wrap)) {
      this.wrap_ = wrap;
    }
  }
  var round = config['round'];
  if (round != null) {
    round = Number(round);
    if (!isNaN(round)) {
      this.round_ = round;
    }
  }
};



/**
 * Create the block UI for this field.
 * @package
 */
Blockly.FieldSlider.prototype.initView = function() {
  Blockly.FieldSlider.superClass_.initView.call(this);
  // Add the degree symbol to the left of the number, even in RTL (issue #2380)
  this.symbol_ = Blockly.utils.dom.createSvgElement('tspan', {}, null);
  // this.symbol_.appendChild(document.createTextNode('\u00B0'));
  this.textElement_.appendChild(this.symbol_);
};

/**
 * Updates the graph when the field rerenders.
 * @private
 * @override
 */
Blockly.FieldSlider.prototype.render_ = function() {
  Blockly.FieldSlider.superClass_.render_.call(this);
  this.updateGraph_();
};

/**
 * Create and show the angle field's editor.
 * @param {Event=} opt_e Optional mouse event that triggered the field to open,
 *     or undefined if triggered programmatically.
 * @private
 */
Blockly.FieldSlider.prototype.showEditor_ = function(opt_e) {
  // Mobile browsers have issues with in-line textareas (focus & keyboards).
  var noFocus =
    Blockly.utils.userAgent.MOBILE ||
    Blockly.utils.userAgent.ANDROID ||
    Blockly.utils.userAgent.IPAD;
  Blockly.FieldSlider.superClass_.showEditor_.call(this, opt_e, noFocus);

  var editor = this.dropdownCreate_();
  Blockly.DropDownDiv.getContentDiv().appendChild(editor);

  // Blockly.DropDownDiv.setColour(this.sourceBlock_.style.colourPrimary, this.sourceBlock_.style.colourTertiary);

  Blockly.DropDownDiv.showPositionedByField(
    this, this.dropdownDispose_.bind(this));

  this.updateGraph_();
};

/**
 * Create the angle dropdown editor.
 * @return {!SVGElement} The newly created angle picker.
 * @private
 */
Blockly.FieldSlider.prototype.dropdownCreate_ = function() {
  var svg = Blockly.utils.dom.createSvgElement('svg', {
    'xmlns': Blockly.utils.dom.SVG_NS,
    'xmlns:html': Blockly.utils.dom.HTML_NS,
    'xmlns:xlink': Blockly.utils.dom.XLINK_NS,
    'version': '1.1',
    'height': '25px',
    'width': '250px',
    'style': 'touch-action: none'
  }, null);
  var self = this;
  var oldValue;
  if(this.slider_){
    oldValue = this.getValue();
  }
  this.slider_ = new Slider(0, 15, 250, svg, function(v) {
    v = Math.round(v * 100);
    self.setEditorValue_(v);
    console.log(v);
  }, 0)
  if(typeof oldValue !== 'undefined'){
    this.slider_.animateValue(oldValue / 100);
  }


  // The angle picker is different from other fields in that it updates on
  // mousemove even if it's not in the middle of a drag.  In future we may
  // change this behaviour.
  // this.clickWrapper_ = Blockly.bindEventWithChecks_(svg, 'click', this, this.hide_);
  // On touch devices, the picker's value is only updated with a drag. Add
  // a click handler on the drag surface to update the value if the surface
  // is clicked.
  // this.clickSurfaceWrapper_ = Blockly.bindEventWithChecks_(circle, 'click', this, this.onMouseMove_, true, true);
  // this.moveSurfaceWrapper_ = Blockly.bindEventWithChecks_(circle, 'mousemove', this, this.onMouseMove_, true, true);
  return svg;
};

/**
 * Disposes of events and dom-references belonging to the angle editor.
 * @private
 */
Blockly.FieldSlider.prototype.dropdownDispose_ = function() {
  if (this.clickWrapper_) {
    Blockly.unbindEvent_(this.clickWrapper_);
    this.clickWrapper_ = null;
  }
  if (this.clickSurfaceWrapper_) {
    Blockly.unbindEvent_(this.clickSurfaceWrapper_);
    this.clickSurfaceWrapper_ = null;
  }
  if (this.moveSurfaceWrapper_) {
    Blockly.unbindEvent_(this.moveSurfaceWrapper_);
    this.moveSurfaceWrapper_ = null;
  }
  this.gauge_ = null;
  this.line_ = null;
};

/**
 * Hide the editor.
 * @private
 */
Blockly.FieldSlider.prototype.hide_ = function() {
  Blockly.DropDownDiv.hideIfOwner(this);
  Blockly.WidgetDiv.hide();
};

/**
 * Set the angle to match the mouse's position.
 * @param {!Event} e Mouse move event.
 * @protected
 */
Blockly.FieldSlider.prototype.onMouseMove_ = function(e) {
  // Calculate angle.
  var bBox = this.gauge_.ownerSVGElement.getBoundingClientRect();
  var dx = e.clientX - bBox.left - Blockly.FieldSlider.HALF;
  var dy = e.clientY - bBox.top - Blockly.FieldSlider.HALF;
  var angle = Math.atan(-dy / dx);
  if (isNaN(angle)) {
    // This shouldn't happen, but let's not let this error propagate further.
    return;
  }
  angle = Blockly.utils.math.toDegrees(angle);
  // 0: East, 90: North, 180: West, 270: South.
  if (dx < 0) {
    angle += 180;
  } else if (dy > 0) {
    angle += 360;
  }

  // Do offsetting.
  if (this.clockwise_) {
    angle = this.offset_ + 360 - angle;
  } else {
    angle = 360 - (this.offset_ - angle);
  }

  this.displayMouseOrKeyboardValue_(angle);
};

/**
 * Handles and displays values that are input via mouse or arrow key input.
 * These values need to be rounded and wrapped before being displayed so
 * that the text input's value is appropriate.
 * @param {number} angle New angle.
 * @private
 */
Blockly.FieldSlider.prototype.displayMouseOrKeyboardValue_ = function(angle) {
  if (this.round_) {
    angle = Math.round(angle / this.round_) * this.round_;
  }
  angle = this.wrapValue_(angle);
  if (angle != this.value_) {
    this.setEditorValue_(angle);
  }
};

/**
 * Redraw the graph with the current angle.
 * @private
 */
Blockly.FieldSlider.prototype.updateGraph_ = function() {
  if (!this.gauge_) {
    return;
  }
  // Always display the input (i.e. getText) even if it is invalid.
  var angleDegrees = Number(this.getText()) + this.offset_;
  angleDegrees %= 360;
  var angleRadians = Blockly.utils.math.toRadians(angleDegrees);
  var path = ['M ', Blockly.FieldSlider.HALF, ',', Blockly.FieldSlider.HALF];
  var x2 = Blockly.FieldSlider.HALF;
  var y2 = Blockly.FieldSlider.HALF;
  if (!isNaN(angleRadians)) {
    var clockwiseFlag = Number(this.clockwise_);
    var angle1 = Blockly.utils.math.toRadians(this.offset_);
    var x1 = Math.cos(angle1) * Blockly.FieldSlider.RADIUS;
    var y1 = Math.sin(angle1) * -Blockly.FieldSlider.RADIUS;
    if (clockwiseFlag) {
      angleRadians = 2 * angle1 - angleRadians;
    }
    x2 += Math.cos(angleRadians) * Blockly.FieldSlider.RADIUS;
    y2 -= Math.sin(angleRadians) * Blockly.FieldSlider.RADIUS;
    // Don't ask how the flag calculations work.  They just do.
    var largeFlag = Math.abs(Math.floor((angleRadians - angle1) / Math.PI) % 2);
    if (clockwiseFlag) {
      largeFlag = 1 - largeFlag;
    }
    path.push(' l ', x1, ',', y1,
      ' A ', Blockly.FieldSlider.RADIUS, ',', Blockly.FieldSlider.RADIUS,
      ' 0 ', largeFlag, ' ', clockwiseFlag, ' ', x2, ',', y2, ' z');
  }
  this.gauge_.setAttribute('d', path.join(''));
  this.line_.setAttribute('x2', x2);
  this.line_.setAttribute('y2', y2);
};

/**
 * Handle key down to the editor.
 * @param {!Event} e Keyboard event.
 * @protected
 * @override
 */
Blockly.FieldSlider.prototype.onHtmlInputKeyDown_ = function(e) {
  Blockly.FieldSlider.superClass_.onHtmlInputKeyDown_.call(this, e);

  var multiplier;
  if (e.keyCode === Blockly.utils.KeyCodes.LEFT) {
    // decrement (increment in RTL)
    multiplier = this.sourceBlock_.RTL ? 1 : -1;
  } else if (e.keyCode === Blockly.utils.KeyCodes.RIGHT) {
    // increment (decrement in RTL)
    multiplier = this.sourceBlock_.RTL ? -1 : 1;
  } else if (e.keyCode === Blockly.utils.KeyCodes.DOWN) {
    // decrement
    multiplier = -1;
  } else if (e.keyCode === Blockly.utils.KeyCodes.UP) {
    // increment
    multiplier = 1;
  }
  if (multiplier) {
    var value = /** @type {number} */ (this.getValue());
    this.displayMouseOrKeyboardValue_(
      value + (multiplier * this.round_));
    e.preventDefault();
    e.stopPropagation();
  }
};

/**
 * Ensure that the input value is a valid angle.
 * @param {*=} opt_newValue The input value.
 * @return {?number} A valid angle, or null if invalid.
 * @protected
 * @override
 */
Blockly.FieldSlider.prototype.doClassValidation_ = function(opt_newValue) {
  var value = Number(opt_newValue);
  if (isNaN(value) || !isFinite(value)) {
    return null;
  }
  return this.wrapValue_(value);
};

/**
 * Wraps the value so that it is in the range (-360 + wrap, wrap).
 * @param {number} value The value to wrap.
 * @return {number} The wrapped value.
 * @private
 */
Blockly.FieldSlider.prototype.wrapValue_ = function(value) {
  value %= 360;
  if (value < 0) {
    value += 360;
  }
  if (value > this.wrap_) {
    value -= 360;
  }
  return value;
};

/**
 * CSS for angle field.  See css.js for use.
 */
Blockly.Css.register([
  /* eslint-disable indent */
  '.blocklyAngleCircle {',
  'stroke: #444;',
  'stroke-width: 1;',
  'fill: #ddd;',
  'fill-opacity: .8;',
  '}',

  '.blocklyAngleMarks {',
  'stroke: #444;',
  'stroke-width: 1;',
  '}',

  '.blocklyAngleGauge {',
  'fill: #f88;',
  'fill-opacity: .8;',
  'pointer-events: none;',
  '}',

  '.blocklyAngleLine {',
  'stroke: #f00;',
  'stroke-width: 2;',
  'stroke-linecap: round;',
  'pointer-events: none;',
  '}'
  /* eslint-enable indent */
]);

Blockly.fieldRegistry.register('field_slider', Blockly.FieldSlider);