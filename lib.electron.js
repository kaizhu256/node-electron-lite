#!/usr/bin/env node
/*
 * lib.electron.js (2019.1.8)
 * https://github.com/kaizhu256/node-electron-lite
 * this zero-dependency package will download and install the electron (v2.0.18) prebuilt-binary from https://github.com/electron/electron/releases
 *
 */



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



/* istanbul ignore next */
// run shared js-env code - init-before
(function () {
// init local
local = (
    globalThis.utility2_rollup
    // || globalThis.utility2_rollup_old
    // || require("./assets.utility2.rollup.js")
    || globalThis.globalLocal
);
// init exports
if (local.isBrowser) {
    globalThis.utility2_electron = local;
} else {
    module.exports = local;
    module.exports.__dirname = __dirname;
}
// init lib main
local.electron = local;



/* validateLineSortedReset */
return;
}());



// run node js-env code - init-after
/* istanbul ignore next */
(function () {
// run cli
if (local.isBrowser || module !== require.main || process.versions.electron) {
    return;
}
local.__filename = "electron";
([(
    process.platform === "darwin"
    && __dirname + "/external/Atom.app/Contents/MacOS/Atom"
), (
    process.platform === "darwin"
    && __dirname + "/external/Electron.app/Contents/MacOS/Electron"
), __dirname + "/external/electron"]).some(function (file) {
    if (file && local.fs.existsSync(file)) {
        local.__filename = file;
        return true;
    }
});
// run electron in child_process
local.child = local.child_process.spawn(
    local.__filename,
    process.argv.slice(2),
    {
        stdio: [0, "pipe", 2]
    }
);
local.child.on("exit", process.exit);
local.child.stdout.on("data", function (chunk, encoding, cb) {
    // bug-workaround - force electron v1.8.x and higher to exit after running command
    // --help|-h
    switch (process.argv[2]) {
    case "--help":
    case "-h":
        process.stdout.write(chunk, encoding, cb);
        local.child.kill();
        break;
    default:
        process.stdout.write(chunk, encoding, cb);
    }
});
}());



}());
