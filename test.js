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
        local = {};
        // init isBrowser
        local.isBrowser = typeof window === "object" &&
            typeof window.XMLHttpRequest === "function" &&
            window.document &&
            typeof window.document.querySelectorAll === "function";
        // init global
        local.global = local.isBrowser
            ? window
            : global;
        // re-init local
        local = local.global.local = (local.global.utility2 ||
            require('utility2')).requireReadme();
        // init test
        local.testRunDefault(local);
    }());



    // run shared js-env code - function
    (function () {
        /* istanbul ignore next */
        local.testCase_buildApidoc_default = function (options, onError) {
        /*
         * this function will test buildApidoc's default handling-behavior-behavior
         */
            if (local.isBrowser) {
                onError(null, options);
                return;
            }
            try {
                local.electron = require('electron');
            } catch (errorCaught) {
                onError(null, options);
                return;
            }
            if (process.env.npm_config_mode_test_case === 'testCase_buildApidoc_default') {
                local.electron.NativeImage = local.electron.nativeImage.createEmpty().constructor;
                local.electron.WebContents = local.electron.webContents.create().constructor;
            }
            options = { moduleDict: { electron: local.electron } };
            local.buildApidoc(options, onError);
        };

        local.testCase_buildApp_default = function (options, onError) {
        /*
         * this function will test buildApp's default handling-behavior
         */
            if (local.isBrowser) {
                onError(null, options);
                return;
            }
            local.testCase_buildReadme_default(options, local.onErrorThrow);
            local.testCase_buildLib_default(options, local.onErrorThrow);
            local.testCase_buildTest_default(options, local.onErrorThrow);
            onError(null, options);
        };

        local.testCase_exampleJs_exit = function (options, onError) {
        /*
         * this function will test example.js's exit handling-behavior
         */
            if (local.isBrowser) {
                onError(null, options);
                return;
            }
            options = process.exit;
            process.exit = function () {
                process.exit = options;
                onError(null, options);
            };
        };
    }());
}());
