electron-lite
=============
this zero-dependency package will download and install the electron-browser v1.3.13 from https://github.com/electron/electron/releases

[![travis-ci.org build-status](https://api.travis-ci.org/kaizhu256/node-electron-lite.svg)](https://travis-ci.org/kaizhu256/node-electron-lite)

[![NPM](https://nodei.co/npm/electron-lite.png?downloads=true)](https://www.npmjs.com/package/electron-lite)

[![package-listing](https://kaizhu256.github.io/node-electron-lite/build/screen-capture.gitLsTree.svg)](https://github.com/kaizhu256/node-electron-lite)



# screen-capture
![screen-capture](https://kaizhu256.github.io/node-electron-lite/build/screen-capture.testExampleJs.browser.png)



# documentation
#### todo
- upgrade to electron v1.4.x when stable
- none

#### change since cbde6ce6
- npm publish 2016.12.28
- update download-url
- rename file cli.js -> lib.electron.js
- rename file index.sh -> lib.electron.sh
- rename file unzip -> busybox
- none

#### this package requires
- darwin or linux os

#### additional info
- includes external linux busybox binary from https://busybox.net/downloads/binaries/1.21.1/busybox-i486



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

this electron script will screen-capture the webpage http://electron.atom.io

instruction
    1. save this script as example.js
    2. run the shell command:
        $ npm install electron-lite && \
            printf '{"main":"example.js","name":"undefined","version":"0.0.1"}' > \
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
            // screen-capture webpage
            options.browserWindow.capturePage(options, onNext);
            break;
        case 4:
            // save screen-capture
            require('fs').writeFileSync(
                'screen-capture.testExampleJs.browser.png',
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

#### output from electron
![screen-capture](https://kaizhu256.github.io/node-electron-lite/build/screen-capture.testExampleJs.browser.png)

#### output from shell
[![screen-capture](https://kaizhu256.github.io/node-electron-lite/build/screen-capture.testExampleJs.svg)](https://travis-ci.org/kaizhu256/node-electron-lite)



# package.json
```json
{
    "package.json": true,
    "author": "kai zhu <kaizhu256@gmail.com>",
    "bin": { "electron": "lib.electron.js" },
    "description": "{{packageJson.description}}",
    "devDependencies": {
        "utility2": "kaizhu256/node-utility2#alpha"
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
    "main": "lib.electron",
    "name": "electron-lite",
    "os": ["darwin", "linux"],
    "repository": {
        "type": "git",
        "url": "https://github.com/kaizhu256/node-electron-lite.git"
    },
    "scripts": {
        "build-ci": "utility2 shRun shReadmeBuild",
        "postinstall": "./lib.electron.sh shNpmPostinstall",
        "test": "\
rm -fr external && \
npm run postinstall && \
./lib.electron.js --version && \
utility2 test test.js"
    },
    "version": "2016.12.28"
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
    # test example.js
    (export MODE_BUILD=testExampleJs &&
        shRunScreenCapture shReadmeTestJs example.js) || return $?
    # save screen-capture
    cp /tmp/app/screen-capture.*.png "$npm_config_dir_build" || return $?
    # test published-package
    (export MODE_BUILD=npmTestPublished &&
        shRunScreenCapture shNpmTestPublished) || return $?
)}

shBuild() {(set -e
# this function will run the main build
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
)}
shBuild
```
