#!/usr/bin/env node
/*jslint
    bitwise: true,
    browser: true,
    maxerr: 8,
    maxlen: 96,
    node: true,
    nomen: true,
    regexp: true,
    stupid: true
*/
(function () {
    'use strict';
    module.exports.__dirname = __dirname;
    if (module !== require.main) {
        return;
    }
    require('child_process').spawn(__dirname + (process.platform === 'darwin'
        ? '/external/Electron.app/Contents/MacOS/Electron'
        : '/external/electron'), process.argv.slice(2), { stdio: [0, 1, 2] })
        .on('exit', function (exitCode) {
            process.exit(exitCode);
        });
}());
