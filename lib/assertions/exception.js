"use strict";

var captureException = require("../capture-exception");

module.exports = function (referee) {
    referee.captureException = captureException;

    referee.add("exception", {
        assert: function (callback) {
            var matcher = arguments[1];
            var customMessage = arguments[2];

            if (typeof matcher === "string") {
                customMessage = matcher;
                matcher = undefined;
            }

            this.expected = matcher;
            this.customMessage = customMessage;

            var err = captureException(callback);

            if (err) {
                this.actualExceptionType = err.name;
                this.actualExceptionMessage = err.message;
                this.actualExceptionStack = err.stack;
            }

            if (!err) {
                if (typeof matcher === "object") {
                    return this.fail("typeNoExceptionMessage");
                }
                return this.fail("message");

            }

            if (typeof matcher === "object" && !referee.match(err, matcher)) {
                return this.fail("typeFailMessage");
            }

            if (typeof matcher === "function" && matcher(err) !== true) {
                return this.fail("matchFailMessage");
            }

            return true;
        },

        refute: function (callback) {
            var err = captureException(callback);

            if (err) {
                this.customMessage = arguments[1];
                this.actualExceptionType = err.name;
                this.actualExceptionMessage = err.message;
                return false;
            }

            return true;
        },

        expectation: "toThrow",
        assertMessage: "${customMessage}Expected exception",
        refuteMessage: "${customMessage}Expected not to throw but threw ${actualExceptionType} (${actualExceptionMessage})"
    });

    referee.assert.exception.typeNoExceptionMessage = "${customMessage}Expected ${expected} but no exception was thrown";
    referee.assert.exception.typeFailMessage = "${customMessage}Expected ${expected} but threw ${actualExceptionType} (${actualExceptionMessage})\n${actualExceptionStack}";
    referee.assert.exception.matchFailMessage = "${customMessage}Expected thrown ${actualExceptionType} (${actualExceptionMessage}) to pass matcher function";
};
