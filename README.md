electron-prebuilt-lite
==============
lightweight version of electron-prebuilt with zero npm-dependencies

[![NPM](https://img.shields.io/npm/v/electron-prebuilt-lite.svg?style=flat-square)](https://www.npmjs.org/package/electron-prebuilt-lite) [![NPM](https://img.shields.io/npm/dm/electron-prebuilt-lite.svg?style=flat-square)](https://www.npmjs.org/package/electron-prebuilt-lite)



# screen-capture
[![screen-capture](https://kaizhu256.github.io/node-electron-prebuilt-lite/build/screen-capture.testExampleJs.browser.png)](https://kaizhu256.github.io/node-electron-prebuilt-lite/build/screen-capture.testExampleJs.browser.png)



# build-status [![travis-ci.org build-status](https://api.travis-ci.org/kaizhu256/node-electron-prebuilt-lite.svg)](https://travis-ci.org/kaizhu256/node-electron-prebuilt-lite)

| git-branch : | [master](https://github.com/kaizhu256/node-electron-prebuilt-lite/tree/master) | [beta](https://github.com/kaizhu256/node-electron-prebuilt-lite/tree/beta) | [alpha](https://github.com/kaizhu256/node-electron-prebuilt-lite/tree/alpha)|
|--:|:--|:--|:--|
| build-artifacts : | [![build-artifacts](https://kaizhu256.github.io/node-electron-prebuilt-lite/glyphicons_144_folder_open.png)](https://github.com/kaizhu256/node-electron-prebuilt-lite/tree/gh-pages/build..master..travis-ci.org) | [![build-artifacts](https://kaizhu256.github.io/node-electron-prebuilt-lite/glyphicons_144_folder_open.png)](https://github.com/kaizhu256/node-electron-prebuilt-lite/tree/gh-pages/build..beta..travis-ci.org) | [![build-artifacts](https://kaizhu256.github.io/node-electron-prebuilt-lite/glyphicons_144_folder_open.png)](https://github.com/kaizhu256/node-electron-prebuilt-lite/tree/gh-pages/build..alpha..travis-ci.org)|

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
#### this package requires
- darwin or linux os
- unzip installed on os

#### this package will install into node_modules the external programs
- electron @ 0.35.0



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
        $ npm install kaizhu256/node-electron-prebuilt-lite#alpha && \
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
            process.exit(0);
            break;
        }
    };
    onNext();
}());
```

#### output from shell
[![screen-capture](https://kaizhu256.github.io/node-electron-prebuilt-lite/build/screen-capture.testExampleJs.svg)](https://travis-ci.org/kaizhu256/node-electron-prebuilt-lite)

#### output from electron
[![screen-capture](https://kaizhu256.github.io/node-electron-prebuilt-lite/build/screen-capture.testExampleJs.browser.png)](https://kaizhu256.github.io/node-electron-prebuilt-lite/build/screen-capture.electron.png)



# npm-dependencies
- none



# package-listing
- electron binary dynamically downloaded from https://github.com/atom/electron/releases

[![screen-capture](https://kaizhu256.github.io/node-electron-prebuilt-lite/build/screen-capture.gitLsTree.svg)](https://github.com/kaizhu256/node-electron-prebuilt-lite)



# package.json
```json
{
    "author": "kai zhu <kaizhu256@gmail.com>",
    "bin": {
        "electron-prebuilt-lite" : "index.js",
        "electron" : "external/electron"
    },
    "description": "lightweight version of electron-prebuilt with zero npm-dependencies",
    "devDependencies": {
        "utility2": "2015.11.3"
    },
    "keywords": [
        "atom", "atom-shell",
        "browser",
        "capture",
        "electron", "electron-prebuilt",
        "headless", "headless-browser",
        "scrape", "scraper", "screen", "screen-capture", "screencapture", "screenshot",
        "web", "web-scrape", "web-scraper"
    ],
    "license": "MIT",
    "name": "electron-prebuilt-lite",
    "os": ["darwin", "linux"],
    "repository" : {
        "type" : "git",
        "url" : "https://github.com/kaizhu256/node-electron-prebuilt-lite.git"
    },
    "scripts": {
        "build-ci": "node_modules/.bin/utility2 shRun shReadmeBuild",
        "postinstall": "./index.sh shNpmPostinstall",
        "preinstall": "mkdir -p external && touch external/electron",
        "test": "node_modules/.bin/utility2 shRun shReadmeExportPackageJson && \
rm -fr external && \
npm run-script postinstall && \
./external/electron --version || exit $?;"
    },
    "version": "2015.10.3"
}
```



# todo
- none



# change since 9fe8c225
- npm publish 2015.10.3
- fix linux build
- none



# changelog of last 50 commits
[![screen-capture](https://kaizhu256.github.io/node-electron-prebuilt-lite/build/screen-capture.gitLog.svg)](https://github.com/kaizhu256/node-electron-prebuilt-lite/commits)



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
    MODE_BUILD=testExampleJs MODE_LINENO=0 shRunScreenCapture \
        shReadmeTestJs example.js || return $?
    # save screen-capture
    cp /tmp/app/screen-capture.*.png $npm_config_dir_build || return $?

    # run npm-test
    MODE_BUILD=npmTest shRunScreenCapture npm test || return $?
}
shBuild

# save exit-code
EXIT_CODE=$?
# create package-listing
MODE_BUILD=gitLsTree shRunScreenCapture shGitLsTree || exit $?
# create recent changelog of last 50 commits
MODE_BUILD=gitLog shRunScreenCapture git log -50 --pretty="%ai\u000a%B" || exit $?
# upload build-artifacts to github, and if number of commits > 16, then squash older commits
COMMIT_LIMIT=16 shBuildGithubUpload || exit $?
exit $EXIT_CODE
```
