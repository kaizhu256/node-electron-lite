electron-lite
=============
this zero-dependency package will download and install the electron-v1.4.15 prebuilt-binary from https://github.com/electron/electron/releases

[![travis-ci.org build-status](https://api.travis-ci.org/kaizhu256/node-electron-lite.svg)](https://travis-ci.org/kaizhu256/node-electron-lite) [![istanbul-coverage](https://kaizhu256.github.io/node-electron-lite/build/coverage.badge.svg)](https://kaizhu256.github.io/node-electron-lite/build/coverage.html/index.html)

[![NPM](https://nodei.co/npm/electron-lite.png?downloads=true)](https://www.npmjs.com/package/electron-lite)

[![package-listing](https://kaizhu256.github.io/node-electron-lite/build/screen-capture.gitLsTree.svg)](https://github.com/kaizhu256/node-electron-lite)



# screen-capture
![screen-capture](https://kaizhu256.github.io/node-electron-lite/build/screen-capture.testExampleJs.browser..png)



# documentation
#### apidoc
- [https://kaizhu256.github.io/node-electron-lite/build..beta..travis-ci.org/apidoc.html](https://kaizhu256.github.io/node-electron-lite/build..beta..travis-ci.org/apidoc.html)

[![apidoc](https://kaizhu256.github.io/node-electron-lite/build/screen-capture.buildApidoc.browser._2Fhome_2Ftravis_2Fbuild_2Fkaizhu256_2Fnode-electron-lite_2Ftmp_2Fbuild_2Fapidoc.html.png)](https://kaizhu256.github.io/node-electron-lite/build..beta..travis-ci.org/apidoc.html)

#### todo
- upgrade to electron v1.6.x when stable
- none

#### change since 51f2a4ef
- npm publish 2017.3.7
- upgrade to electron v1.4.15
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
![screen-capture](https://kaizhu256.github.io/node-electron-lite/build/screen-capture.testExampleJs.browser..png)

#### to run this example, follow the instruction in the script below
- example.js
```javascript
/*
example.js

this electron script will screen-capture the webpage http://electron.atom.io

instruction
    1. save this script as example.js
    2. run the shell command:
        $ npm install "kaizhu256/node-electron-lite#alpha" && \
            printf '{"main":"example.js","name":"undefined","version":"0.0.1"}' > \
            package.json && \
            ./node_modules/.bin/electron . --disable-overlay-scrollbar --enable-logging
    3. view screencapture /tmp/screen-capture.testExampleJs.browser..png
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
            // screen-capture webpage
            options.browserWindow.capturePage(options, onNext);
            break;
        case 4:
            // save screen-capture
            require('fs').writeFileSync(
                '/tmp/screen-capture.testExampleJs.browser..png',
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
![screen-capture](https://kaizhu256.github.io/node-electron-lite/build/screen-capture.testExampleJs.browser..png)

#### output from shell
![screen-capture](https://kaizhu256.github.io/node-electron-lite/build/screen-capture.testExampleJs.svg)



# package.json
```json
{
    "author": "kai zhu <kaizhu256@gmail.com>",
    "bin": {
        "electron": "lib.electron.js"
    },
    "description": "this zero-dependency package will download and install the electron-v1.4.15 prebuilt-binary from https://github.com/electron/electron/releases",
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
        "capture",
        "electron",
        "electron-prebuilt",
        "headless",
        "headless-browser",
        "scrape",
        "scraper",
        "screen",
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
    "nameOriginal": "electron-lite",
    "os": [
        "darwin",
        "linux"
    ],
    "readmeParse": "1",
    "repository": {
        "type": "git",
        "url": "https://github.com/kaizhu256/node-electron-lite.git"
    },
    "scripts": {
        "build-ci": "utility2 shReadmeTest build_ci.sh",
        "env": "env",
        "heroku-postbuild": "npm install 'kaizhu256/node-utility2#alpha' && utility2 shDeployHeroku",
        "postinstall": "if [ -f lib.electron.npm_scripts.sh ]; then ./lib.electron.npm_scripts.sh postinstall; fi",
        "publish-alias": "VERSION=$(npm info $npm_package_name version); for ALIAS in electron_lite; do utility2 shNpmPublishAs . $ALIAS $VERSION; utility2 shNpmTestPublished $ALIAS || exit $?; done",
        "start": "export NODE_BINARY=./lib.electron.js && export PORT=${PORT:-8080} && export npm_config_mode_auto_restart=1 && utility2 start",
        "test": "rm -fr external && npm run postinstall && ./lib.electron.js --version && NODE_BINARY=./lib.electron.js utility2 test test.js"
    },
    "version": "2017.3.7"
}
```



# changelog of last 50 commits
[![screen-capture](https://kaizhu256.github.io/node-electron-lite/build/screen-capture.gitLog.svg)](https://github.com/kaizhu256/node-electron-lite/commits)



# internal build-script
- build_ci.sh
```shell
# build_ci.sh

# this shell script will run the build for this package

shBuildCiInternalPost() {(set -e
    shReadmeBuildLinkVerify
)}

shBuildCiInternalPre() {(set -e
    ln -s ../../lib.electron.js node_modules/.bin/electron
    shReadmeTest example.js
    # save screen-capture
    cp /tmp/screen-capture.*.png "$npm_config_dir_build"
    shReadmeTest example.sh
    shNpmTestPublished
)}

shBuildCiPost() {(set -e
    return
)}

shBuildCiPre() {(set -e
    return
)}

# init env
eval $(utility2 source) && shBuildCi
```



# misc
- this package was created with [utility2](https://github.com/kaizhu256/node-utility2)
