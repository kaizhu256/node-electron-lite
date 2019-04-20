/* istanbul instrument in package electron */
/* istanbul ignore next */
/* jslint utility2:true */
(function (globalThis) {
    "use strict";
    var consoleError;
    var local;
    // init globalThis
    (function () {
        try {
            globalThis = Function("return this")(); // jslint ignore:line
        } catch (ignore) {}
    }());
    globalThis.globalThis = globalThis;
    // init debug_inline
    if (!globalThis["debug\u0049nline"]) {
        consoleError = console.error;
        globalThis["debug\u0049nline"] = function () {
        /*
         * this function will both print <arguments> to stderr
         * and return <arguments>[0]
         */
            var argList;
            argList = Array.from(arguments); // jslint ignore:line
            // debug arguments
            globalThis["debug\u0049nlineArguments"] = argList;
            consoleError("\n\ndebug\u0049nline");
            consoleError.apply(console, argList);
            consoleError("\n");
            // return arg0 for inspection
            return argList[0];
        };
    }
    // init local
    local = {};
    local.local = local;
    globalThis.globalLocal = local;
    // init isBrowser
    local.isBrowser = (
        typeof window === "object"
        && window === globalThis
        && typeof window.XMLHttpRequest === "function"
        && window.document
        && typeof window.document.querySelector === "function"
    );
    // init function
    local.assertThrow = function (passed, message) {
    /*
     * this function will throw error-<message> if <passed> is falsy
     */
        var err;
        if (passed) {
            return;
        }
        err = (
            // ternary-condition
            (
                message
                && typeof message.message === "string"
                && typeof message.stack === "string"
            )
            // if message is error-object, then leave as is
            ? message
            : new Error(
                typeof message === "string"
                // if message is a string, then leave as is
                ? message
                // else JSON.stringify message
                : JSON.stringify(message, null, 4)
            )
        );
        throw err;
    };
    local.functionOrNop = function (fnc) {
    /*
     * this function will if <fnc> exists,
     * them return <fnc>,
     * else return <nop>
     */
        return fnc || local.nop;
    };
    local.identity = function (value) {
    /*
     * this function will return <value>
     */
        return value;
    };
    local.nop = function () {
    /*
     * this function will do nothing
     */
        return;
    };
    local.objectAssignDefault = function (target, source) {
    /*
     * this function will if items from <target> are
     * null, undefined, or empty-string,
     * then overwrite them with items from <source>
     */
        target = target || {};
        Object.keys(source || {}).forEach(function (key) {
            if (
                target[key] === null
                || target[key] === undefined
                || target[key] === ""
            ) {
                target[key] = target[key] || source[key];
            }
        });
        return target;
    };
    // require builtin
    if (!local.isBrowser) {
        local.assert = require("assert");
        local.buffer = require("buffer");
        local.child_process = require("child_process");
        local.cluster = require("cluster");
        local.crypto = require("crypto");
        local.dgram = require("dgram");
        local.dns = require("dns");
        local.domain = require("domain");
        local.events = require("events");
        local.fs = require("fs");
        local.http = require("http");
        local.https = require("https");
        local.net = require("net");
        local.os = require("os");
        local.path = require("path");
        local.querystring = require("querystring");
        local.readline = require("readline");
        local.repl = require("repl");
        local.stream = require("stream");
        local.string_decoder = require("string_decoder");
        local.timers = require("timers");
        local.tls = require("tls");
        local.tty = require("tty");
        local.url = require("url");
        local.util = require("util");
        local.vm = require("vm");
        local.zlib = require("zlib");
    }
}(this));



(function (local) {
"use strict";



// run shared js-env code - init-before
(function () {
// init local
local = (
    globalThis.utility2 || require("utility2")
).requireReadme();
globalThis.local = local;
// init test
local.testRunDefault(local);
}());



// run shared js-env code - function
(function () {
/* istanbul ignore next */
local.testCase_buildApidoc_default = function (options, onError) {
/*
 * this function will test buildApidoc's default handling-behavior-behavior
 */
    if (local.isBrowser) {
        onError(null, options);
        return;
    }
    try {
        local.electron = require("electron");
    } catch (ignore) {
        onError(null, options);
        return;
    }
    if (process.env.npm_config_mode_test_case === "testCase_buildApidoc_default") {
        local.electron.NativeImage = local.electron.nativeImage.createEmpty().constructor;
        local.electron.WebContents = local.electron.webContents.create().constructor;
    }
    options = {
        moduleDict: {
            electron: local.electron
        }
    };
    local.buildApidoc(options, onError);
};

local.testCase_buildApp_default = function (options, onError) {
/*
 * this function will test buildApp's default handling-behavior
 */
    if (local.isBrowser) {
        onError(null, options);
        return;
    }
    local.testCase_buildReadme_default(options, local.onErrorThrow);
    local.testCase_buildLib_default(options, local.onErrorThrow);
    local.testCase_buildTest_default(options, local.onErrorThrow);
    onError(null, options);
};

local.testCase_exampleJs_exit = function (options, onError) {
/*
 * this function will test example.js's exit handling-behavior
 */
    if (local.isBrowser) {
        onError(null, options);
        return;
    }
    options = process.exit;
    process.exit = function () {
        process.exit = options;
        onError(null, options);
    };
};
}());



}());
