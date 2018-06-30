#!/usr/bin/env node
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
    local = module.exports;
    local.__dirname = __dirname;
    local.__filename = (process.platform === 'darwin' &&
        require('fs').existsSync(__dirname + '/external/Electron.app/Contents/MacOS/Electron')
        // bug-workaround - darwin does not like symlink
        ? __dirname + '/external/Electron.app/Contents/MacOS/Electron'
        : __dirname + '/external/electron');
    if (module !== require.main) {
        return;
    }
    local.child = require('child_process').spawn(
        local.__filename,
        process.argv.slice(2),
        { stdio: [0, 1, 2] }
    );
    local.child.on('exit', process.exit);
    // bug-workaround - force electron v1.8.x and higher to exit after running --help command
    if ((/^--help$|^-h$/).test(process.argv[2])) {
        local.processStdoutWrite = process.stdout.write;
        process.stdout.write = function () {
            local.processStdoutWrite.apply(process.stdout, arguments);
            local.child.kill();
        };
    }
}());
