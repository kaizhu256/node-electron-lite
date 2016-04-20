electron-lite
==============
minimal npm installer for electron with zero npm-dependencies

[![NPM](https://img.shields.io/npm/v/electron-lite.svg?style=flat-square)](https://www.npmjs.com/package/electron-lite) [![NPM](https://img.shields.io/npm/dm/electron-lite.svg?style=flat-square)](https://www.npmjs.com/package/electron-lite)



# todo
- merge test.js and index.sh into README.md
- none



# change since 2b8b2ee8
- npm publish 2016.3.2
- add file cli.js
- fix npm install
- none



# screen-capture
[![screen-capture](https://kaizhu256.github.io/node-electron-lite/build/screen-capture.testExampleJs.browser.png)](https://kaizhu256.github.io/node-electron-lite/build/screen-capture.testExampleJs.browser.png)



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



# documentation
#### this package will
- dynamically download and install electron @ 0.36.12 from https://github.com/atom/electron/releases

#### this package requires
- darwin or linux os

#### this package includes
- external linux unzip binary @ https://busybox.net/downloads/binaries/1.21.1/busybox-i486



# quickstart screen-capture example
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

#### output from shell
[![screen-capture](https://kaizhu256.github.io/node-electron-lite/build/screen-capture.testExampleJs.svg)](https://travis-ci.org/kaizhu256/node-electron-lite)

#### output from electron
[![screen-capture](https://kaizhu256.github.io/node-electron-lite/build/screen-capture.testExampleJs.browser.png)](https://kaizhu256.github.io/node-electron-lite/build/screen-capture.electron.png)



# npm-dependencies
- none



# package-listing
[![screen-capture](https://kaizhu256.github.io/node-electron-lite/build/screen-capture.gitLsTree.svg)](https://github.com/kaizhu256/node-electron-lite)



# package.json
```json
{
    "author": "kai zhu <kaizhu256@gmail.com>",
    "bin": {
        "electron": "cli.js"
    },
    "description": "minimal npm installer for electron with zero npm-dependencies",
    "devDependencies": {
        "utility2": "2016.1.5"
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
        "postinstall": "./index.sh shNpmPostinstall",
        "test": "export MODE_LINENO=0 && \
export NODE_ENV=test && \
utility2 shRun shReadmeExportFile package.json package.json && \
rm -fr external && \
npm run postinstall && \
./external/electron --version && \
utility2 test node test.js"
    },
    "version": "2016.3.2"
}
```



# changelog of last 50 commits
[![screen-capture](https://kaizhu256.github.io/node-electron-lite/build/screen-capture.gitLog.svg)](https://github.com/kaizhu256/node-electron-lite/commits)



# internal build-script
- build.sh

```shell
# build.sh

# this shell script will run the build for this package

shBuild() {
    # this function will run the main build
    # init env
    . node_modules/.bin/utility2 && shInit || return $?

    # run npm-test on published package
    shRun shNpmTestPublished || return $?

    # test example js script
    (export MODE_BUILD=testExampleJs &&
        export MODE_LINENO=0 &&
        shRunScreenCapture shReadmeTestJs example.js) || return $?
    # save screen-capture
    cp /tmp/app/screen-capture.*.png "$npm_config_dir_build" || return $?

    # run npm-test
    (export MODE_BUILD=npmTest &&
        shRunScreenCapture npm test) || return $?
}
shBuild

# save exit-code
EXIT_CODE=$?
# create package-listing
(export MODE_BUILD=gitLsTree &&
    shRunScreenCapture shGitLsTree) || exit $?
# create recent changelog of last 50 commits
(export MODE_BUILD=gitLog &&
    shRunScreenCapture git log -50 --pretty="%ai\u000a%B") || exit $?
# upload build-artifacts to github, and if number of commits > 16, then squash older commits
# export BUILD_GITHUB_UPLOAD_PRE_SH="rm -fr build" || exit $?
(export COMMIT_LIMIT=16 &&
    export MODE_BUILD=githubUpload &&
    shBuildGithubUpload) || exit $?
exit "$EXIT_CODE"
```
