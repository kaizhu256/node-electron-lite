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
    module.exports.__dirname = __dirname;
    module.exports.__filename =
        (process.platform === 'darwin' &&
        require('fs').existsSync(__dirname + '/external/Electron.app/Contents/MacOS/Electron')
        // bug-workaround - darwin does not like symlink
        ? __dirname + '/external/Electron.app/Contents/MacOS/Electron'
        : __dirname + '/external/electron');
    if (module !== require.main) {
        return;
    }
    require('child_process').spawn(module.exports.__filename, process.argv.slice(2), {
        stdio: [0, 1, 2]
    }).on('exit', function (exitCode) {
        process.exit(exitCode);
    });
}());
