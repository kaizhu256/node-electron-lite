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
    var local;



    // run shared js-env code - init-before
    (function () {
        // init local
        local = {};
        // init modeJs
        local.modeJs = 'node';
        // init global
        local.global = global;
        switch (local.modeJs) {
        // re-init local from example.js
        case 'node':
            local = (local.global.utility2_rollup || require('utility2'))
                .requireReadme();
            break;
        }
        // init exports
        local.global.local = local;
        local.electron = require('electron');
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
            onError();
        };

        local.testCase_buildReadme_default = function (options, onError) {
        /*
         * this function will test buildReadme's default handling-behavior-behavior
         */
            options = {};
            local.buildReadme(options, onError);
        };

        local.testCase_webpage_default = function (options, onError) {
        /*
         * this function will test webpage's default handling-behavior
         */
            setTimeout(onError, 10000, options);
        };
        break;
    }
    switch (local.modeJs) {



    // run node js-env code - init-after
    case 'node':
        // run test-server
        local.testRunServer(local);
        break;
    }
}());
