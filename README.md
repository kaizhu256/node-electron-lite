# electron-lite
this zero-dependency package will download and install the electron-v1.4.16 prebuilt-binary from https://github.com/electron/electron/releases

[![travis-ci.org build-status](https://api.travis-ci.org/kaizhu256/node-electron-lite.svg)](https://travis-ci.org/kaizhu256/node-electron-lite) [![istanbul-coverage](https://kaizhu256.github.io/node-electron-lite/build/coverage.badge.svg)](https://kaizhu256.github.io/node-electron-lite/build/coverage.html/index.html)

[![NPM](https://nodei.co/npm/electron-lite.png?downloads=true)](https://www.npmjs.com/package/electron-lite)

[![npmPackageListing](https://kaizhu256.github.io/node-electron-lite/build/screenCapture.npmPackageListing.svg)](https://github.com/kaizhu256/node-electron-lite)



# screen-capture
![screenCapture](https://kaizhu256.github.io/node-electron-lite/build/screenCapture.testExampleJs.browser..png)



# documentation
#### apidoc
- [https://kaizhu256.github.io/node-electron-lite/build..beta..travis-ci.org/apidoc.html](https://kaizhu256.github.io/node-electron-lite/build..beta..travis-ci.org/apidoc.html)

[![apidoc](https://kaizhu256.github.io/node-electron-lite/build/screenCapture.buildCi.browser.%252Ftmp%252Fbuild%252Fapidoc.html.png)](https://kaizhu256.github.io/node-electron-lite/build..beta..travis-ci.org/apidoc.html)

#### todo
- upgrade to electron v1.6.x when stable
- none

#### changelog for v2017.4.16
- npm publish 2017.4.16
- upgrade to electron v1.4.16
- none

#### this package requires
- darwin or linux os

#### additional info
- includes external busybox binary from https://busybox.net/downloads/binaries/1.21.1/busybox-i486



# build status [![travis-ci.org build-status](https://api.travis-ci.org/kaizhu256/node-electron-lite.svg)](https://travis-ci.org/kaizhu256/node-electron-lite)
[![build commit status](https://kaizhu256.github.io/node-electron-lite/build/build.badge.svg)](https://travis-ci.org/kaizhu256/node-electron-lite)

| git-branch : | [master](https://github.com/kaizhu256/node-electron-lite/tree/master) | [beta](https://github.com/kaizhu256/node-electron-lite/tree/beta) | [alpha](https://github.com/kaizhu256/node-electron-lite/tree/alpha)|
|--:|:--|:--|:--|
| test-report : | [![test-report](https://kaizhu256.github.io/node-electron-lite/build..master..travis-ci.org/test-report.badge.svg)](https://kaizhu256.github.io/node-electron-lite/build..master..travis-ci.org/test-report.html) | [![test-report](https://kaizhu256.github.io/node-electron-lite/build..beta..travis-ci.org/test-report.badge.svg)](https://kaizhu256.github.io/node-electron-lite/build..beta..travis-ci.org/test-report.html) | [![test-report](https://kaizhu256.github.io/node-electron-lite/build..alpha..travis-ci.org/test-report.badge.svg)](https://kaizhu256.github.io/node-electron-lite/build..alpha..travis-ci.org/test-report.html)|
| coverage : | [![istanbul-coverage](https://kaizhu256.github.io/node-electron-lite/build..master..travis-ci.org/coverage.badge.svg)](https://kaizhu256.github.io/node-electron-lite/build..master..travis-ci.org/coverage.html/index.html) | [![istanbul-coverage](https://kaizhu256.github.io/node-electron-lite/build..beta..travis-ci.org/coverage.badge.svg)](https://kaizhu256.github.io/node-electron-lite/build..beta..travis-ci.org/coverage.html/index.html) | [![istanbul-coverage](https://kaizhu256.github.io/node-electron-lite/build..alpha..travis-ci.org/coverage.badge.svg)](https://kaizhu256.github.io/node-electron-lite/build..alpha..travis-ci.org/coverage.html/index.html)|
| build-artifacts : | [![build-artifacts](https://kaizhu256.github.io/node-electron-lite/glyphicons_144_folder_open.png)](https://github.com/kaizhu256/node-electron-lite/tree/gh-pages/build..master..travis-ci.org) | [![build-artifacts](https://kaizhu256.github.io/node-electron-lite/glyphicons_144_folder_open.png)](https://github.com/kaizhu256/node-electron-lite/tree/gh-pages/build..beta..travis-ci.org) | [![build-artifacts](https://kaizhu256.github.io/node-electron-lite/glyphicons_144_folder_open.png)](https://github.com/kaizhu256/node-electron-lite/tree/gh-pages/build..alpha..travis-ci.org)|

#### master branch
- stable branch
- HEAD should be tagged, npm-published package

#### beta branch
- semi-stable branch
- HEAD should be latest, npm-published package

#### alpha branch
- unstable branch
- HEAD is arbitrary
- commit history may be rewritten



# quickstart screen-capture example
![screenCapture](https://kaizhu256.github.io/node-electron-lite/build/screenCapture.testExampleJs.browser..png)

#### to run this example, follow the instruction in the script below
- example.js
```javascript
/*
example.js

this electron script will screenCapture the webpage http://electron.atom.io

instruction
    1. save this script as example.js
    2. run the shell command:
        $ npm install electron-lite && \
            printf '{"main":"example.js","name":"undefined","version":"0.0.1"}' > \
            package.json && \
            ./node_modules/.bin/electron . --disable-overlay-scrollbar --enable-logging
    3. view screencapture /tmp/screenCapture.testExampleJs.browser..png
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
            // screenCapture webpage
            options.browserWindow.capturePage(options, onNext);
            break;
        case 4:
            // save screenCapture
            require('fs').writeFileSync(
                '/tmp/screenCapture.testExampleJs.browser..png',
                data.toPng()
            );
            // exit
            process.exit(0);
            break;
        }
    };
    // coverage-hack
    (function () {
        return;
    }(!process.env.npm_config_mode_auto_restart && onNext()));
}());
```

#### output from browser
![screenCapture](https://kaizhu256.github.io/node-electron-lite/build/screenCapture.testExampleJs.browser..png)

#### output from shell
![screenCapture](https://kaizhu256.github.io/node-electron-lite/build/screenCapture.testExampleJs.svg)



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
        "atom",
        "atom-shell",
        "browser",
        "electron",
        "electron-prebuilt",
        "headless-browser",
        "scrape",
        "scraper",
        "screen-capture",
        "screencapture",
        "screenshot",
        "web",
        "web-scrape",
        "web-scraper"
    ],
    "license": "MIT",
    "main": "lib.electron.js",
    "name": "electron-lite",
    "nameAlias": "electron",
    "nameAliasDeprecate": "electron_lite",
    "nameAliasPublish": "electron-prebuilt-lite",
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
    "version": "2017.4.16"
}
```



# changelog of last 50 commits
[![screenCapture](https://kaizhu256.github.io/node-electron-lite/build/screenCapture.gitLog.svg)](https://github.com/kaizhu256/node-electron-lite/commits)



# internal build-script
- build_ci.sh
```shell
# build_ci.sh

# this shell script will run the build for this package

shBuildCiPost() {(set -e
    shReadmeBuildLinkVerify
)}

shBuildCiPre() {(set -e
    ln -s ../../lib.electron.js node_modules/.bin/electron || true
    shReadmeTest example.js
    # save screenCapture
    cp /tmp/screenCapture.*.png "$npm_config_dir_build"
    shReadmeTest example.sh
    shNpmTestPublished
)}

# run shBuildCi
eval $(utility2 source)
shBuildCi
```



# misc
- this package was created with [utility2](https://github.com/kaizhu256/node-utility2)
