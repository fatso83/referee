"use strict";

var actualAndTypeOfMessageValues = require("../actual-and-type-of-message-values");
var toString = Object.prototype.toString;

module.exports = function (referee) {
    referee.add("isArrayBuffer", {
        assert: function (actual) {
            return toString.call(actual) === "[object ArrayBuffer]";
        },
        assertMessage: "${customMessage}Expected ${actual} to be an ArrayBuffer",
        refuteMessage: "${customMessage}Expected ${actual} not to be an ArrayBuffer",
        expectation: "toBeArrayBuffer",
        values: actualAndTypeOfMessageValues
    });
};
