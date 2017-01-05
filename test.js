/* istanbul instrument in package electron-lite */
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
        local.testCase_build_doc = function (options, onError) {
        /*
         * this function will test build's doc handling-behavior
         */
            options = { moduleDict: {
                'electron-lite': {
                    exampleFileList: [],
                    exports: require('electron')
                }
            } };
            local.buildDoc(options, onError);
        };

        local.testCase_build_readme = function (options, onError) {
        /*
         * this function will test build's readme handling-behavior
         */
            options = {};
            options.readmeFile = local.fs.readFileSync('README.md', 'utf8');
            options.readmeTemplate = local.templateReadme;
            local.buildReadmeElectronLite(options, onError);
        };
        break;
    }
    switch (local.modeJs) {



    // run node js-env code - post-init
    case 'node':
        // run test-server
        local.testRunServer(local);
        // start the repl-debugger
        local.replStart();
        break;
    }
}());
