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
/* jslint utility2:true */
(function () {
    "use strict";
    var modeNext;
    var onNext;
    var options;
    onNext = function (data) {
        modeNext += 1;
        switch (modeNext) {
        case 1:
            /* istanbul ignore next */
            if (process.env.npm_config_mode_auto_restart) {
                return;
            }
            // wait for electron to init
            try {
                require("app").on("ready", onNext);
            } catch (ignore) {
                require("electron").app.once("ready", onNext);
            }
            break;
        case 2:
            // init options
            options = {
                frame: false, 
                height: 768, 
                width: 1024, 
                x: 0, 
                y: 0
            };
            // init browserWindow;
            try {
                options.BrowserWindow = require("browser-window");
            } catch (ignore) {
                options.BrowserWindow = require("electron").BrowserWindow;
            }
            options.browserWindow = new options.BrowserWindow(options);
            // goto next step when webpage is loaded
            /* istanbul ignore next */
            try {
                options.browserWindow.webContents.once("did-stop-loading", onNext);
            } catch (ignore) {
                setTimeout(onNext, 10000);
            }
            // open url
            (options.browserWindow.loadUrl || options.browserWindow.loadURL).call(
                options.browserWindow,
                "https://electron.atom.io"
            );
            break;
        case 3:
            // screenshot webpage
            options.browserWindow.capturePage(options, onNext);
            break;
        case 4:
            // screenshot
            /* istanbul ignore next */
            try {
                data = data.toPng();
            } catch (ignore) {
                data = data.toPNG();
            }
            require("fs").writeFileSync("/tmp/screenshot.testExampleJs.browser..png", data);
            console.log("created screenshot file /tmp/screenshot.testExampleJs.browser..png");
            // exit
            process.exit(0);
            break;
        }
    };
    modeNext = 0;
    onNext();
}());
