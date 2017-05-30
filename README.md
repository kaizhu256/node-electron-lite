# electron-lite
this zero-dependency package will download and install the electron-v1.4.16 prebuilt-binary from https://github.com/electron/electron/releases

[![travis-ci.org build-status](https://api.travis-ci.org/kaizhu256/node-electron-lite.svg)](https://travis-ci.org/kaizhu256/node-electron-lite) [![coverage](https://kaizhu256.github.io/node-utility2/build/coverage.badge.svg)](https://kaizhu256.github.io/node-utility2/build/coverage.html/index.html)

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
1. [all screenshots](#all-screenshots)
1. [package.json](#packagejson)
1. [changelog of last 50 commits](#changelog-of-last-50-commits)
1. [internal build script](#internal-build-script)
1. [misc](#misc)



# cdn download
- [https://github.com/electron/electron/releases/download/v1.4.16/electron-v1.4.16-darwin-x64.zip](https://github.com/electron/electron/releases/download/v1.4.16/electron-v1.4.16-darwin-x64.zip)
- [https://github.com/electron/electron/releases/download/v1.4.16/electron-v1.4.16-linux-x64.zip](https://github.com/electron/electron/releases/download/v1.4.16/electron-v1.4.16-linux-x64.zip)



# documentation
#### apidoc
- [https://kaizhu256.github.io/node-electron-lite/build..beta..travis-ci.org/apidoc.html](https://kaizhu256.github.io/node-electron-lite/build..beta..travis-ci.org/apidoc.html)

[![apidoc](https://kaizhu256.github.io/node-electron-lite/build/screenshot.buildCi.browser.%252Ftmp%252Fbuild%252Fapidoc.html.png)](https://kaizhu256.github.io/node-electron-lite/build..beta..travis-ci.org/apidoc.html)

#### todo
- upgrade to electron v1.6.x when stable
- none

#### changelog for v2017.5.29
- npm publish 2017.5.29
- add README section 'all screenshots'
- add README section 'quickstart standalone app'
- auto-create README section 'table of contents'
- rename README section 'quickstart web example' -> 'quickstart example.js'
- none

#### this package requires
- darwin or linux os

#### additional info
- includes external busybox binary from https://busybox.net/downloads/binaries/1.21.1/busybox-i486



# quickstart screenshot example
![screenshot](https://kaizhu256.github.io/node-electron-lite/build/screenshot.testExampleJs.browser..png)

#### to run this example, follow the instruction in the script below
- [example.js](https://kaizhu256.github.io/node-electron-lite/build..beta..travis-ci.org/example.js)
```javascript
/*
example.js

this electron script will screenshot the webpage http://electron.atom.io

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
    var options, modeNext, onNext;
    modeNext = 0;
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
            options.browserWindow.loadURL('http://electron.atom.io');
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
            // exit
            process.exit(0);
            break;
        }
    };
    onNext();
}());
```

#### output from browser
![screenshot](https://kaizhu256.github.io/node-electron-lite/build/screenshot.testExampleJs.browser..png)

#### output from shell
![screenshot](https://kaizhu256.github.io/node-electron-lite/build/screenshot.testExampleJs.svg)



# all screenshots
1. [https://kaizhu256.github.io/node-electron-lite/build/screenshot.buildCi.browser.%252Ftmp%252Fbuild%252Fapidoc.html.png](https://kaizhu256.github.io/node-electron-lite/build/screenshot.buildCi.browser.%252Ftmp%252Fbuild%252Fapidoc.html.png)
[![screenshot](https://kaizhu256.github.io/node-electron-lite/build/screenshot.buildCi.browser.%252Ftmp%252Fbuild%252Fapidoc.html.png)](https://kaizhu256.github.io/node-electron-lite/build/screenshot.buildCi.browser.%252Ftmp%252Fbuild%252Fapidoc.html.png)

1. [https://kaizhu256.github.io/node-electron-lite/build/screenshot.buildCi.browser.%252Ftmp%252Fbuild%252Fcoverage.lib.html.png](https://kaizhu256.github.io/node-electron-lite/build/screenshot.buildCi.browser.%252Ftmp%252Fbuild%252Fcoverage.lib.html.png)
[![screenshot](https://kaizhu256.github.io/node-electron-lite/build/screenshot.buildCi.browser.%252Ftmp%252Fbuild%252Fcoverage.lib.html.png)](https://kaizhu256.github.io/node-electron-lite/build/screenshot.buildCi.browser.%252Ftmp%252Fbuild%252Fcoverage.lib.html.png)

1. [https://kaizhu256.github.io/node-electron-lite/build/screenshot.buildCi.browser.%252Ftmp%252Fbuild%252Ftest-report.html.png](https://kaizhu256.github.io/node-electron-lite/build/screenshot.buildCi.browser.%252Ftmp%252Fbuild%252Ftest-report.html.png)
[![screenshot](https://kaizhu256.github.io/node-electron-lite/build/screenshot.buildCi.browser.%252Ftmp%252Fbuild%252Ftest-report.html.png)](https://kaizhu256.github.io/node-electron-lite/build/screenshot.buildCi.browser.%252Ftmp%252Fbuild%252Ftest-report.html.png)

1. [https://kaizhu256.github.io/node-electron-lite/build/screenshot.npmTest.browser.%252F.png](https://kaizhu256.github.io/node-electron-lite/build/screenshot.npmTest.browser.%252F.png)
[![screenshot](https://kaizhu256.github.io/node-electron-lite/build/screenshot.npmTest.browser.%252F.png)](https://kaizhu256.github.io/node-electron-lite/build/screenshot.npmTest.browser.%252F.png)

1. [https://kaizhu256.github.io/node-electron-lite/build/screenshot.npmTestPublished.browser.%252F.png](https://kaizhu256.github.io/node-electron-lite/build/screenshot.npmTestPublished.browser.%252F.png)
[![screenshot](https://kaizhu256.github.io/node-electron-lite/build/screenshot.npmTestPublished.browser.%252F.png)](https://kaizhu256.github.io/node-electron-lite/build/screenshot.npmTestPublished.browser.%252F.png)



# package.json
```json
{
    "author": "kai zhu <kaizhu256@gmail.com>",
    "bin": {
        "electron": "lib.electron.js"
    },
    "description": "this zero-dependency package will download and install the electron-v1.4.16 prebuilt-binary from https://github.com/electron/electron/releases",
    "devDependencies": {
        "utility2": "kaizhu256/node-utility2#alpha"
    },
    "engines": {
        "node": ">=4.0"
    },
    "homepage": "https://github.com/kaizhu256/node-electron-lite",
    "keywords": [
        "atom-shell",
        "electron",
        "electron-prebuilt",
        "headless-browser",
        "screen-capture",
        "screenshot",
        "web-scraper"
    ],
    "license": "MIT",
    "main": "lib.electron.js",
    "name": "electron-lite",
    "nameAlias": "electron",
    "nameAliasDeprecate": "electron-prebuilt-lite",
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
        "build-ci": "utility2 shReadmeTest build_ci.sh",
        "env": "env",
        "heroku-postbuild": "npm install \"kaizhu256/node-utility2#alpha\" && utility2 shDeployHeroku",
        "postinstall": "[ ! -f npm_scripts.sh ] || ./npm_scripts.sh postinstall",
        "start": "NODE_BINARY=./lib.electron.js PORT=${PORT:-8080} utility2 start test.js",
        "test": "set -e; rm -fr external; npm run postinstall; ./lib.electron.js --version; export NODE_BINARY=./lib.electron.js; utility2 test test.js"
    },
    "version": "2017.5.29"
}
```



# changelog of last 50 commits
[![screenshot](https://kaizhu256.github.io/node-electron-lite/build/screenshot.gitLog.svg)](https://github.com/kaizhu256/node-electron-lite/commits)



# internal build script
- build_ci.sh
```shell
# build_ci.sh

# this shell script will run the build for this package

shBuildCiAfter() {(set -e
    shReadmeTest example.sh
)}

shBuildCiBefore() {(set -e
    ln -s ../../lib.electron.js node_modules/.bin/electron || true
    shNpmTestPublished
    shReadmeTest example.js
    # screenshot
    cp /tmp/screenshot.*.png "$npm_config_dir_build"
)}

# run shBuildCi
eval $(utility2 source)
shBuildCi
```



# misc
- this package was created with [utility2](https://github.com/kaizhu256/node-utility2)
