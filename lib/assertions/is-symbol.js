"use strict";

var actualMessageValues = require("../actual-message-values");

module.exports = function (referee) {
    referee.add("isSymbol", {
        assert: function (actual) {
            return typeof actual === "symbol";
        },
        assertMessage: "${customMessage}Expected ${actual} to be a Symbol",
        refuteMessage: "${customMessage}Expected ${actual} not to be a Symbol",
        expectation: "toBeSymbol",
        values: actualMessageValues
    });
};
