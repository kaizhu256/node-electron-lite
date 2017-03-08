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



    // run shared js-env code - pre-init
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
                .requireExampleJsFromReadme();
            local.global.local = local;
            break;
        }
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
            options.customize = function () {
                // search-and-replace - customize readmeTo
                [
                    // customize demo
                    (/\n\[!\[package-listing\][\S\s]*?\n# documentation\n/),
                    // customize test-server
                    (/\n\| git-branch : \|[\S\s]*?\n\| test-report : \|/),
                    // customize quickstart
                    (/\n# quickstart[\S\s]*?\n# package.json\n/)
                ].forEach(function (rgx) {
                    options.readmeFrom.replace(rgx, function (match0) {
                        options.readmeTo = options.readmeTo.replace(rgx, match0);
                    });
                });
            };
            local.buildReadme(options, onError);
        };
        break;
    }
    switch (local.modeJs) {



    // run node js-env code - post-init
    case 'node':
        // run test-server
        local.testRunServer(local);
        break;
    }
}());
