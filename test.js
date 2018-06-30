/* istanbul instrument in package electron */
/* jslint-utility2 */
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
    var local;



    // run shared js-env code - init-before
    (function () {
        // init local
        local = require('utility2').requireReadme();
        local.global.local = local;
        // init test
        local.testRunInit(local);
    }());



    // run node js-env code - function
    (function () {
        // init electron
        local.electron = require('electron');

        local.testCase_buildApidoc_default = function (options, onError) {
        /*
         * this function will test buildApidoc's default handling-behavior-behavior
         */
            /* istanbul ignore next */
            if (process.env.npm_config_mode_test_case === 'testCase_buildApidoc_default') {
                local.electron.NativeImage = local.electron.nativeImage.createEmpty().constructor;
                local.electron.WebContents = local.electron.webContents.create().constructor;
            }
            options = { moduleDict: { electron: local.electron } };
            local.buildApidoc(options, onError);
        };

        local.testCase_buildLib_default = function (options, onError) {
        /*
         * this function will test buildLib's default handling-behavior-behavior
         */
            onError(null, options);
        };

        local.testCase_buildTest_default = function (options, onError) {
        /*
         * this function will test buildTest's default handling-behavior
         */
            onError(null, options);
        };

        local.testCase_exampleJs_exit = function (options, onError) {
        /*
         * this function will test example.js's exit handling-behavior
         */
            process.exit = function () {
                onError(null, options);
            };
        };

        local.testCase_webpage_default = function (options, onError) {
        /*
         * this function will test webpage's default handling-behavior
         */
            onError(null, options);
        };

        local.utility2.buildApp = function (options, onError) {
            onError(null, options);
        };
    }());
}());
