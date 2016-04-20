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
    require('child_process').spawn(
        __dirname + '/external/electron',
        process.argv.slice(2),
        { stdio: 'inherit' }
    )
        .on('exit', function (exitCode) {
            process.exit(exitCode);
        });
}());
