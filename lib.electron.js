#!/usr/bin/env node
/*
 * lib.electron.js (2018.9.23)
 * https://github.com/kaizhu256/node-electron-lite
 * this zero-dependency package will download and install the electron (v2.0.10) prebuilt-binary from https://github.com/electron/electron/releases
 *
 */



/* istanbul instrument in package electron */
/* jslint-utility2 */
/*jslint
    bitwise: true,
    browser: true,
    maxerr: 4,
    maxlen: 100,
    node: true,
    nomen: true,
    regexp: true,
    stupid: true
*/
(function () {
    'use strict';
    var local;



    // run shared js-env code - init-before
    /* istanbul ignore next */
    (function () {
        // init debug_inline
        (function () {
            var consoleError, context, key;
            consoleError = console.error;
            context = (typeof window === 'object' && window) || global;
            key = 'debug_inline'.replace('_i', 'I');
            context[key] = context[key] || function (arg0) {
            /*
             * this function will both print arg0 to stderr and return it
             */
                // debug arguments
                context['_' + key + 'Arguments'] = arguments;
                consoleError('\n\n' + key);
                consoleError.apply(console, arguments);
                consoleError(new Error().stack + '\n');
                // return arg0 for inspection
                return arg0;
            };
        }());
        // init local
        local = {};
        // init isBrowser
        local.isBrowser = typeof window === 'object' &&
            typeof window.XMLHttpRequest === 'function' &&
            window.document &&
            typeof window.document.querySelectorAll === 'function';
        // init global
        local.global = local.isBrowser
            ? window
            : global;
        // re-init local
        local = local.global.utility2_rollup ||
            // local.global.utility2_rollup_old || require('./assets.utility2.rollup.js') ||
            local;
        // init exports
        if (local.isBrowser) {
            local.global.utility2_electron = local;
        } else {
            // require builtins
            // local.assert = require('assert');
            local.buffer = require('buffer');
            local.child_process = require('child_process');
            local.cluster = require('cluster');
            local.crypto = require('crypto');
            local.dgram = require('dgram');
            local.dns = require('dns');
            local.domain = require('domain');
            local.events = require('events');
            local.fs = require('fs');
            local.http = require('http');
            local.https = require('https');
            local.net = require('net');
            local.os = require('os');
            local.path = require('path');
            local.querystring = require('querystring');
            local.readline = require('readline');
            local.repl = require('repl');
            local.stream = require('stream');
            local.string_decoder = require('string_decoder');
            local.timers = require('timers');
            local.tls = require('tls');
            local.tty = require('tty');
            local.url = require('url');
            local.util = require('util');
            local.vm = require('vm');
            local.zlib = require('zlib');
            module.exports = local;
            module.exports.__dirname = __dirname;
        }
        // init lib main
        local.local = local.electron = local;



        /* validateLineSortedReset */
        return;
    }());



    // run node js-env code - init-after
    /* istanbul ignore next */
    (function () {
        // init cli
        if (local.isBrowser || module !== require.main || process.versions.electron) {
            return;
        }
        [
            process.platform === 'darwin' && __dirname + '/external/Atom.app/Contents/MacOS/Atom',
            process.platform === 'darwin'
                && __dirname + '/external/Electron.app/Contents/MacOS/Electron',
            __dirname + '/external/electron'
        ].some(function (file) {
            if (file && local.fs.existsSync(file)) {
                local.__filename = file;
                return true;
            }
        });
        // run electron in child_process
        local.child = local.child_process.spawn(
            local.__filename,
            process.argv.slice(2),
            { stdio: [0, 'pipe', 2] }
        );
        local.child.on('exit', process.exit);
        local.child.stdout.on('data', function (chunk, encoding, cb) {
            // bug-workaround - force electron v1.8.x and higher to exit after running command
            // --help|-h
            switch (process.argv[2]) {
            case '--help':
            case '-h':
                process.stdout.write(chunk, encoding, cb);
                local.child.kill();
                break;
            default:
                process.stdout.write(chunk, encoding, cb);
            }
        });
    }());
}());
