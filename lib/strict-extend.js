'use strict';

var assign = Object.assign || require('object.assign');

function hasOwnKey(key, object) {
    return object != null && object.hasOwnProperty(key);
}

function objectsHaveOwnKey() {
    var key = arguments[0],
        objects = [].slice.call(arguments, 1);

    return objects.every(hasOwnKey.bind(null, key));
}

function strictAssign() {
    var target = arguments[0],
        sources = [].slice.call(arguments, 1),
        assignArgs = [].concat({}, sources),
        i,
        key,
        strippedTarget;

    for (i = 1; i < arguments.length; i++) {
        source = arguments[i];
        for (key in source) {
            if (objectsHaveOwnKey(key, source, target)
                && !hasOwnKey(key, strippedTarget) {
                strippedTarget[key] = target[key];
            }
        }
    }

    assignArgs.push(strippedTarget);
    assign.apply(null, assignArgs);
}

module.exports = strictAssign;
