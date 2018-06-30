#!/bin/sh
# jslint-utility2

shMain() {(set -e
# this function will run the main program
    # run command custom
    case "$1" in
    postinstall)
        export PATH="$(pwd):$PATH"
        # install electron
        # v0.24.0
        # v0.25.1
        # v0.26.1
        # v0.27.1
        # v0.28.1
        # v0.29.1
        # v0.30.1
        # v0.31.1
        # v0.32.1
        # v0.33.1
        # v0.34.1
        # v0.35.1
        # v0.36.1
        # v0.37.1
        # v1.0.1
        # v1.1.1
        # v1.2.1
        # v1.3.1
        # v1.4.1
        # v1.5.1
        # v1.6.1
        # v1.7.1
        # v1.8.1
        # v2.0.1
        VERSION="${npm_config_electron_version:-v1.7.15}"
        FILE_BASE="electron-$VERSION-linux-x64.zip"
        FILE_BIN=external/electron
        FILE_URL="https://github.com/electron/electron/releases/download/$VERSION/$FILE_BASE"
        UNZIP="./busybox unzip"
        case "$(uname)" in
        Darwin)
            FILE_BASE="electron-$VERSION-darwin-x64.zip"
            FILE_BIN=external/Electron.app/Contents/MacOS/Electron
            FILE_URL="https://github.com/electron/electron/releases/download/$VERSION/$FILE_BASE"
            UNZIP=unzip
            ;;
        esac
        # init external/electron
        mkdir -p external && rm -f external/electron
        for DIR in /bin /usr/bin /usr/local/bin
        do
            if [ "$($DIR/electron --version 2>/dev/null || true)" = "$VERSION" ]
            then
                ln -fs "$DIR/electron" external/electron
                break
            fi
        done
        if [ ! -f external/electron ]
        then
            # install file
            if [ ! -f "/tmp/$FILE_BASE" ]
            then
                FILE_TMP="$(mktemp "/tmp/$FILE_BASE.XXXXXXXX")"
                # copy cached file
                if [ -f "/$FILE_BASE" ]
                then
                    cp "/$FILE_BASE" "$FILE_TMP"
                # download file
                else
                    printf "downloading $FILE_URL to /tmp/$FILE_BASE ...\n"
                    curl -#Lo "$FILE_TMP" "$FILE_URL"
                fi
                chmod 644 "$FILE_TMP"
                # mv file to prevent race-condition
                mv "$FILE_TMP" "/tmp/$FILE_BASE" 2>/dev/null || true
            fi
            # unzip file
            $UNZIP -d external -oq "/tmp/$FILE_BASE"
            # init external/electron
            [ -f external/electron ] || ln -fs "$PWD/$FILE_BIN" external/electron
        fi
        ;;
    start)
        export NODE_BINARY=./lib.electron.js
        ;;
    test)
        export NODE_BINARY=./lib.electron.js
        ;;
    esac

    # run command default
    case "$1" in
    build-ci)
        if [ "$npm_package_nameLib" = utility2 ]
        then
            ./lib.utility2.sh shReadmeTest build_ci.sh
            return
        fi
        utility2 shReadmeTest build_ci.sh
        ;;
    heroku-postbuild)
        if [ "$npm_package_nameLib" = utility2 ]
        then
            ./lib.utility2.sh shDeployHeroku
            return
        fi
        npm install kaizhu256/node-utility2#alpha --prefix .
        utility2 shDeployHeroku
        ;;
    eval)
        shift
        "$@"
        ;;
    start)
        export PORT=${PORT:-8080}
        if [ -f assets.app.js ]
        then
            node assets.app.js
        else
            if [ "$npm_package_nameLib" = utility2 ]
            then
                export npm_config_mode_auto_restart=1
                ./lib.utility2.sh shRun shIstanbulCover test.js
                return
            fi
            utility2 start test.js
        fi
        ;;
    test)
        if [ "$npm_package_nameLib" = utility2 ]
        then
            export PORT=$(./lib.utility2.sh shServerPortRandom)
            export PORT_REPL=$(./lib.utility2.sh shServerPortRandom)
            export npm_config_mode_auto_restart=1
            export npm_config_timeout_default=60000
            ./lib.utility2.sh test test.js
            return
        fi
        export PORT=$(utility2 shServerPortRandom)
        utility2 test test.js
        ;;
    utility2)
        shift
        if [ "$npm_package_nameLib" = utility2 ]
        then
            ./lib.utility2.sh "$@"
            return
        fi
        utility2 "$@"
        ;;
    esac
)}

# run command
eval shMain "$npm_lifecycle_event" "$(node -e "
// <script>
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
'use strict';
console.log(
    JSON.parse(process.env.npm_config_argv).original.join(' ').replace((/^(?:run )?\S+ /), '')
);
// </script>
"
)"
