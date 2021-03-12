'use strict';
goog.provide('Blockly.utils.tool');
var deepCopy = function(obj){
	if (typeof obj !== 'object') {
        return obj;
    }

    let type = Object.prototype.toString.apply(obj);
    let ret = type === '[object Array]' ? [] : {};

    if (type === '[object Array]') {
        ret = [];
        let i = 0;
        while (i < obj.length) {
            ret[i] = deepCopy(obj[i]);
            i++;
        }
    } else {
        ret = {};
        for (let k in obj) {
            if (obj.hasOwnProperty(k)) {
                ret[k] = deepCopy(obj[k]);
            }
        }
    }

    return ret;
}

var merge = function(a, b){
	var obj1 = deepCopy(a);
	var obj2 = deepCopy(b);
	for(var k in obj2){
		if(obj2.hasOwnProperty(k)){
			obj1[k] = obj2[k];
		}
	}
	return obj1;
}

var apply = function(target, obj){
    for(var k in obj){
        if(obj.hasOwnProperty(k)){
            target[k] = obj[k];
        }
    }
}
Blockly.utils.tool.deepCopy = deepCopy;
Blockly.utils.tool.merge = merge;
Blockly.utils.tool.apply = apply;
