# electron-lite
this zero-dependency package will download and install the electron (v2.0.18) prebuilt-binary from https://github.com/electron/electron/releases

# live web demo
- none

![screenshot](https://kaizhu256.github.io/node-electron-lite/build/screenshot.testExampleJs.browser..png)



[![travis-ci.org build-status](https://api.travis-ci.org/kaizhu256/node-electron-lite.svg)](https://travis-ci.org/kaizhu256/node-electron-lite) [![coverage](https://kaizhu256.github.io/node-electron-lite/build/coverage.badge.svg)](https://kaizhu256.github.io/node-electron-lite/build/coverage.html/index.html)

[![NPM](https://nodei.co/npm/electron-lite.png?downloads=true)](https://www.npmjs.com/package/electron-lite)

[![build commit status](https://kaizhu256.github.io/node-electron-lite/build/build.badge.svg)](https://travis-ci.org/kaizhu256/node-electron-lite)

| git-branch : | [master](https://github.com/kaizhu256/node-electron-lite/tree/master) | [beta](https://github.com/kaizhu256/node-electron-lite/tree/beta) | [alpha](https://github.com/kaizhu256/node-electron-lite/tree/alpha)|
|--:|:--|:--|:--|
| test-report : | [![test-report](https://kaizhu256.github.io/node-electron-lite/build..master..travis-ci.org/test-report.badge.svg)](https://kaizhu256.github.io/node-electron-lite/build..master..travis-ci.org/test-report.html) | [![test-report](https://kaizhu256.github.io/node-electron-lite/build..beta..travis-ci.org/test-report.badge.svg)](https://kaizhu256.github.io/node-electron-lite/build..beta..travis-ci.org/test-report.html) | [![test-report](https://kaizhu256.github.io/node-electron-lite/build..alpha..travis-ci.org/test-report.badge.svg)](https://kaizhu256.github.io/node-electron-lite/build..alpha..travis-ci.org/test-report.html)|
| coverage : | [![coverage](https://kaizhu256.github.io/node-electron-lite/build..master..travis-ci.org/coverage.badge.svg)](https://kaizhu256.github.io/node-electron-lite/build..master..travis-ci.org/coverage.html/index.html) | [![coverage](https://kaizhu256.github.io/node-electron-lite/build..beta..travis-ci.org/coverage.badge.svg)](https://kaizhu256.github.io/node-electron-lite/build..beta..travis-ci.org/coverage.html/index.html) | [![coverage](https://kaizhu256.github.io/node-electron-lite/build..alpha..travis-ci.org/coverage.badge.svg)](https://kaizhu256.github.io/node-electron-lite/build..alpha..travis-ci.org/coverage.html/index.html)|
| build-artifacts : | [![build-artifacts](https://kaizhu256.github.io/node-electron-lite/glyphicons_144_folder_open.png)](https://github.com/kaizhu256/node-electron-lite/tree/gh-pages/build..master..travis-ci.org) | [![build-artifacts](https://kaizhu256.github.io/node-electron-lite/glyphicons_144_folder_open.png)](https://github.com/kaizhu256/node-electron-lite/tree/gh-pages/build..beta..travis-ci.org) | [![build-artifacts](https://kaizhu256.github.io/node-electron-lite/glyphicons_144_folder_open.png)](https://github.com/kaizhu256/node-electron-lite/tree/gh-pages/build..alpha..travis-ci.org)|

[![npmPackageListing](https://kaizhu256.github.io/node-electron-lite/build/screenshot.npmPackageListing.svg)](https://github.com/kaizhu256/node-electron-lite)

![npmPackageDependencyTree](https://kaizhu256.github.io/node-electron-lite/build/screenshot.npmPackageDependencyTree.svg)



# table of contents
1. [cdn download](#cdn-download)
1. [documentation](#documentation)
1. [quickstart screenshot example](#quickstart-screenshot-example)
1. [extra screenshots](#extra-screenshots)
1. [package.json](#packagejson)
1. [changelog of last 50 commits](#changelog-of-last-50-commits)
1. [internal build script](#internal-build-script)
1. [misc](#misc)



# cdn download
- [https://github.com/electron/electron/releases/download/v2.0.18/electron-v2.0.18-darwin-x64.zip](https://github.com/electron/electron/releases/download/v2.0.18/electron-v2.0.18-darwin-x64.zip)
- [https://github.com/electron/electron/releases/download/v2.0.18/electron-v2.0.18-linux-x64.zip](https://github.com/electron/electron/releases/download/v2.0.18/electron-v2.0.18-linux-x64.zip)



# documentation
#### cli help
![screenshot](https://kaizhu256.github.io/node-electron-lite/build/screenshot.npmPackageCliHelp.svg)

#### api doc
- [https://kaizhu256.github.io/node-electron-lite/build..beta..travis-ci.org/apidoc.html](https://kaizhu256.github.io/node-electron-lite/build..beta..travis-ci.org/apidoc.html)

[![apidoc](https://kaizhu256.github.io/node-electron-lite/build/screenshot.buildCi.browser.%252Ftmp%252Fbuild%252Fapidoc.html.png)](https://kaizhu256.github.io/node-electron-lite/build..beta..travis-ci.org/apidoc.html)

#### todo
- add npm-script shell-function shNpmPostinstallAll
- upgrade to electron v6.0.x when stable
- none

#### changelog 2019.1.8
- npm publish 2019.1.8
- minor update to v2.0.18
- none

#### this package requires
- darwin or linux os

#### additional info
- includes external busybox binary from https://busybox.net/downloads/binaries/1.21.1/



# quickstart screenshot example
![screenshot](https://kaizhu256.github.io/node-electron-lite/build/screenshot.testExampleJs.browser..png)

#### to run this example, follow the instruction in the script below
- [example.js](https://kaizhu256.github.io/node-electron-lite/build..beta..travis-ci.org/example.js)
```javascript
/*
example.js

this electron script will screenshot the webpage https://electron.atom.io

instruction
    1. save this script as example.js
    2. run the shell command:
        $ npm install electron-lite && \
            printf '{"main":"example.js","name":"undefined","version":"0.0.1"}' > \
            package.json && \
            ./node_modules/.bin/electron . --disable-overlay-scrollbar --enable-logging
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
```

#### output from browser
![screenshot](https://kaizhu256.github.io/node-electron-lite/build/screenshot.testExampleJs.browser..png)

#### output from shell
![screenshot](https://kaizhu256.github.io/node-electron-lite/build/screenshot.testExampleJs.svg)



# extra screenshots
1. [https://kaizhu256.github.io/node-electron-lite/build/screenshot.buildCi.browser.%252Ftmp%252Fbuild%252Fapidoc.html.png](https://kaizhu256.github.io/node-electron-lite/build/screenshot.buildCi.browser.%252Ftmp%252Fbuild%252Fapidoc.html.png)
[![screenshot](https://kaizhu256.github.io/node-electron-lite/build/screenshot.buildCi.browser.%252Ftmp%252Fbuild%252Fapidoc.html.png)](https://kaizhu256.github.io/node-electron-lite/build/screenshot.buildCi.browser.%252Ftmp%252Fbuild%252Fapidoc.html.png)

1. [https://kaizhu256.github.io/node-electron-lite/build/screenshot.buildCi.browser.%252Ftmp%252Fbuild%252Fcoverage.lib.html.png](https://kaizhu256.github.io/node-electron-lite/build/screenshot.buildCi.browser.%252Ftmp%252Fbuild%252Fcoverage.lib.html.png)
[![screenshot](https://kaizhu256.github.io/node-electron-lite/build/screenshot.buildCi.browser.%252Ftmp%252Fbuild%252Fcoverage.lib.html.png)](https://kaizhu256.github.io/node-electron-lite/build/screenshot.buildCi.browser.%252Ftmp%252Fbuild%252Fcoverage.lib.html.png)

1. [https://kaizhu256.github.io/node-electron-lite/build/screenshot.buildCi.browser.%252Ftmp%252Fbuild%252Ftest-report.html.png](https://kaizhu256.github.io/node-electron-lite/build/screenshot.buildCi.browser.%252Ftmp%252Fbuild%252Ftest-report.html.png)
[![screenshot](https://kaizhu256.github.io/node-electron-lite/build/screenshot.buildCi.browser.%252Ftmp%252Fbuild%252Ftest-report.html.png)](https://kaizhu256.github.io/node-electron-lite/build/screenshot.buildCi.browser.%252Ftmp%252Fbuild%252Ftest-report.html.png)



# package.json
```json
{
    "author": "kai zhu <kaizhu256@gmail.com>",
    "bin": {
        "electron": "lib.electron.js"
    },
    "description": "this zero-dependency package will download and install the electron (v2.0.18) prebuilt-binary from https://github.com/electron/electron/releases",
    "devDependencies": {
        "utility2": "kaizhu256/node-utility2#alpha"
    },
    "engines": {
        "node": ">=10.0"
    },
    "homepage": "https://github.com/kaizhu256/node-electron-lite",
    "keywords": [
        "electron",
        "headless-browser",
        "screenshot",
        "web-scraper"
    ],
    "license": "MIT",
    "main": "lib.electron.js",
    "name": "electron-lite",
    "nameAliasPublish": "electron-scrape",
    "nameLib": "electron",
    "nameOriginal": "electron-lite",
    "os": [
        "darwin",
        "linux"
    ],
    "repository": {
        "type": "git",
        "url": "https://github.com/kaizhu256/node-electron-lite.git"
    },
    "scripts": {
        "build-ci": "sh ./npm_scripts.sh",
        "env": "env",
        "eval": "sh ./npm_scripts.sh",
        "heroku-postbuild": "sh ./npm_scripts.sh",
        "postinstall": "sh ./npm_scripts.sh",
        "start": "sh ./npm_scripts.sh",
        "test": "sh ./npm_scripts.sh",
        "utility2": "sh ./npm_scripts.sh"
    },
    "version": "2019.1.8"
}
```



# changelog of last 50 commits
[![screenshot](https://kaizhu256.github.io/node-electron-lite/build/screenshot.gitLog.svg)](https://github.com/kaizhu256/node-electron-lite/commits)



# internal build script
- build_ci.sh
```shell
# build_ci.sh

# this shell script will run the build for this package

shBuildCiAfter () {(set -e
    shDeployCustom
    # shDeployGithub
    # shDeployHeroku
    shReadmeTest example.sh
)}

shBuildCiBefore () {(set -e
    ln -s ../../lib.electron.js node_modules/.bin/electron || true
    shNpmTestPublished
    shReadmeTest example.js
    # screenshot
    cp /tmp/screenshot.*.png "$npm_config_dir_build"
)}

# run shBuildCi
eval "$(utility2 source)"
shBuildCi
```



# misc
- this package was created with [utility2](https://github.com/kaizhu256/node-utility2)
