/*
example.js

this electron script will screenshot the webpage https://electron.atom.io

instruction
    1. save this script as example.js
    2. run the shell command:
        $ npm install electron-lite &&             printf '{"main":"example.js","name":"undefined","version":"0.0.1"}' >             package.json &&             ./node_modules/.bin/electron . --disable-overlay-scrollbar --enable-logging



    3. view screenshot /tmp/screenshot.testExampleJs.browser..png
*/

/* istanbul instrument in package electron */
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
    var options, modeNext, onNext;
    onNext = function (data) {
        modeNext += 1;
        switch (modeNext) {
        case 1:
            /* istanbul ignore next */
            if (process.env.npm_config_mode_auto_restart) {
                return;
            }
            // wait for electron to init
            require('electron').app.once('ready', onNext);
            break;
        case 2:
            // init options
            options = { frame: false, height: 768, width: 1024, x: 0, y: 0 };
            // init browserWindow;
            options.BrowserWindow = require('electron').BrowserWindow;
            options.browserWindow = new options.BrowserWindow(options);
            // goto next step when webpage is loaded
            options.browserWindow.webContents.once('did-stop-loading', onNext);
            // open url
            options.browserWindow.loadURL('https://electron.atom.io');
            break;
        case 3:
            // screenshot webpage
            options.browserWindow.capturePage(options, onNext);
            break;
        case 4:
            // screenshot
            require('fs').writeFileSync(
                '/tmp/screenshot.testExampleJs.browser..png',
                data.toPng()
            );
            console.log('created screenshot file /tmp/screenshot.testExampleJs.browser..png');
            // exit
            process.exit(0);
            break;
        }
    };
    modeNext = 0;
    onNext();
}());
