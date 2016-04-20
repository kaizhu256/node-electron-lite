electron-lite
==============
this package will dynamically download and install electron @ 0.36.12 from https://github.com/atom/electron/releases with zero npm-dependencies

[![NPM](https://img.shields.io/npm/v/electron-lite.svg?style=flat-square)](https://www.npmjs.com/package/electron-lite) [![NPM](https://img.shields.io/npm/dm/electron-lite.svg?style=flat-square)](https://www.npmjs.com/package/electron-lite)



# documentation
#### todo
- none

#### change since 46701e7b
- npm publish 2016.3.3
- fix race-condition for parallel npm install
- none

#### this package requires
- darwin or linux os

#### this package includes
- external linux unzip binary @ https://busybox.net/downloads/binaries/1.21.1/busybox-i486



# screen-capture
![screen-capture](https://kaizhu256.github.io/node-electron-lite/build/screen-capture.testExampleJs.browser.png)



# build-status [![travis-ci.org build-status](https://api.travis-ci.org/kaizhu256/node-electron-lite.svg)](https://travis-ci.org/kaizhu256/node-electron-lite)
[![build commit status](https://kaizhu256.github.io/node-electron-lite/build/build.badge.svg)](https://travis-ci.org/kaizhu256/node-electron-lite)

| git-branch : | [master](https://github.com/kaizhu256/node-electron-lite/tree/master) | [beta](https://github.com/kaizhu256/node-electron-lite/tree/beta) | [alpha](https://github.com/kaizhu256/node-electron-lite/tree/alpha)|
|--:|:--|:--|:--|
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
![screen-capture](https://kaizhu256.github.io/node-electron-lite/build/screen-capture.testExampleJs.browser.png)

#### to run this example, follow the instruction in the script below
- example.js
```javascript
/*
example.js

this electron script will screen-capture http://electron.atom.io/

instruction
    1. save this js script as example.js
    2. run the shell command:
        $ npm install electron-lite && \
            printf '{"main":"example.js","name":"example","version":"0.0.0"}' > \
            package.json && \
            ./node_modules/.bin/electron . --disable-overlay-scrollbar --enable-logging
    3. view screencapture ./screen-capture.testExampleJs.browser.png
*/

/*jslint
    browser: true,
    maxerr: 8,
    maxlen: 96,
    node: true,
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
            require('app').once('ready', onNext);
            break;
        case 2:
            // init options
            options = { frame: false, height: 768, width: 1024, x: 0, y: 0 };
            // init browserWindow;
            options.BrowserWindow = require('browser-window');
            options.browserWindow = new options.BrowserWindow(options);
            // goto next step when webpage is loaded
            options.browserWindow.webContents.once('did-stop-loading', onNext);
            // open url
            options.browserWindow.loadURL('http://electron.atom.io/');
            break;
        case 3:
            // screen-capture webpage
            options.browserWindow.capturePage(options, onNext);
            break;
        case 4:
            // save screen-capture
            require('fs')
                .writeFileSync('screen-capture.testExampleJs.browser.png', data.toPng());
            // exit
            process.exit(0);
            break;
        }
    };
    onNext();
}());
```

#### output from electron
![screen-capture](https://kaizhu256.github.io/node-electron-lite/build/screen-capture.testExampleJs.browser.png)

#### output from shell
[![screen-capture](https://kaizhu256.github.io/node-electron-lite/build/screen-capture.testExampleJs.svg)](https://travis-ci.org/kaizhu256/node-electron-lite)



# npm-dependencies
- none



# package-listing
[![screen-capture](https://kaizhu256.github.io/node-electron-lite/build/screen-capture.gitLsTree.svg)](https://github.com/kaizhu256/node-electron-lite)



# package.json
```json
{
    "package.json": true,
    "author": "kai zhu <kaizhu256@gmail.com>",
    "bin": {
        "electron": "cli.js"
    },
    "description": "this package will dynamically download and install electron @ 0.36.12 \
from https://github.com/atom/electron/releases with zero npm-dependencies",
    "devDependencies": {
        "utility2": "2016.3.1"
    },
    "keywords": [
        "atom", "atom-shell",
        "browser",
        "capture",
        "electron", "electron-prebuilt",
        "headless", "headless-browser",
        "light", "lightweight", "lite",
        "minimal",
        "scrape", "scraper", "screen", "screen-capture", "screencapture", "screenshot",
        "web", "web-scrape", "web-scraper"
    ],
    "license": "MIT",
    "name": "electron-lite",
    "os": ["darwin", "linux"],
    "repository": {
        "type": "git",
        "url": "https://github.com/kaizhu256/node-electron-lite.git"
    },
    "scripts": {
        "build-ci": "utility2 shRun shReadmeBuild",
        "build-doc": ":",
        "postinstall": "./index.sh shNpmPostinstall",
        "test": ". node_modules/.bin/utility2 && \
shReadmeExportScripts && \
cp $(shFileTrimLeft tmp/README.package.json) package.json && \
rm -fr external && \
npm run postinstall && \
./cli.js --version && \
utility2 test node test.js",
        "test-published": "utility2 shRun shNpmTestPublished"
    },
    "version": "2016.3.3"
}
```



# changelog of last 50 commits
[![screen-capture](https://kaizhu256.github.io/node-electron-lite/build/screen-capture.gitLog.svg)](https://github.com/kaizhu256/node-electron-lite/commits)



# internal build-script
- build.sh
```shell
# build.sh

# this shell script will run the build for this package

shBuildCiTestPre() {(set -e
# this function will run the pre-test build
    # test example js script
    (export MODE_BUILD=testExampleJs &&
        shRunScreenCapture shReadmeTestJs example.js)
    # save screen-capture
    cp /tmp/app/screen-capture.*.png "$npm_config_dir_build" || return $?
)}

shBuild() {
# this function will run the main build
    set -e
    # init env
    . node_modules/.bin/utility2 && shInit
    # cleanup github-gh-pages dir
    # export BUILD_GITHUB_UPLOAD_PRE_SH="rm -fr build"
    # init github-gh-pages commit-limit
    export COMMIT_LIMIT=16
    # if branch is alpha, beta, or master, then run default build
    if [ "$CI_BRANCH" = alpha ] ||
        [ "$CI_BRANCH" = beta ] ||
        [ "$CI_BRANCH" = master ]
    then
        shBuildCiDefault
    fi
}
shBuild
```
