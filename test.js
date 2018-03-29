/* istanbul instrument in package electron */
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
    switch (local.modeJs) {



    // run node js-env code - function
    case 'node':
        local.testCase_buildApidoc_default = function (options, onError) {
        /*
         * this function will test buildApidoc's default handling-behavior-behavior
         */
            options = { moduleDict: { electron: require('electron') } };
            local.buildApidoc(options, onError);
        };

        local.testCase_buildApp_default = function (options, onError) {
        /*
         * this function will test buildApp's default handling-behavior-behavior
         */
            local.testCase_buildReadme_default(options, local.onErrorDefault);
            local.testCase_buildTest_default(options, local.onErrorThrow);
            onError(null, options);
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
        break;
    }
}());
