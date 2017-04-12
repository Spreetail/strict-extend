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

function isArray(object) {
    if (typeof Array.isArray === 'function'){
        return Array.isArray(object);
    }
    return object.toString() === '[object Array]';
}

function strictAssign() {
    var target = arguments[0],
        sources = [].slice.call(arguments, 1),
        assignArgs,
        strippedTarget,
        i,
        key;

    if (isArray(target)) {
        strippedTarget = [];
        assignArgs = [].concat([], sources);
    } else {
        strippedTarget = {};
        assignArgs = [].concat({}, sources);
    }

    sources.forEach(function stripTarget(source) {
        for (key in source) {
            if (objectsHaveOwnKey(key, source, target)
                && !hasOwnKey(key, strippedTarget)) {
                strippedTarget[key] = target[key];
            }
        }
    });

    assignArgs.push(strippedTarget);
    return assign.apply(null, assignArgs);
}

module.exports = strictAssign;
