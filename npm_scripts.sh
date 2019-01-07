#!/bin/sh
# jslint utility2:true

shMain () {(set -e
# this function will run the main program
    printf "running command 'npm run $*' ...\n" 1>&2
    ARG1="$1"
    # run command - custom
    case "$1" in
    # npm postinstall --electron-version=v1.0
    postinstall)
        VERSION="${npm_config_electron_version:-v2.0.16}"
        FILE_URL="$(cat releases.txt | grep -m 1 -F "$VERSION." ||
            cat releases.txt | grep -m 1 -F "$VERSION")"
        FILE_BASE="$(printf "$FILE_URL" | sed -e "s/.*\///")"
        FILE_BIN=external/electron
        UNZIP="./busybox-i486 unzip"
        case "$(uname)" in
        Darwin)
            FILE_BASE="$(printf "$FILE_BASE" | sed -e "s/linux/darwin/")"
            FILE_BIN=external/Electron.app/Contents/MacOS/Electron
            FILE_URL="$(printf "$FILE_URL" | sed -e "s/linux/darwin/")"
            UNZIP=unzip
            ;;
        esac
        if (printf "$FILE_BASE" | grep -q -E "atom")
        then
            FILE_BIN="$(printf "$FILE_BIN" | sed -e "s/Electron/Atom/g" -e "s/electron/atom/g")"
        fi
        # init external/electron
        rm -fr external && mkdir -p external
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
                    curl -#Lfo "$FILE_TMP" "$FILE_URL"
                fi
                chmod 644 "$FILE_TMP"
                # mv file to prevent race-condition
                mv "$FILE_TMP" "/tmp/$FILE_BASE" 2>/dev/null || true
            fi
            # unzip file
            $UNZIP -d external -oq "/tmp/$FILE_BASE"
            # init external/electron
            if [ ! -f external/electron ]
            then
                ln -fs "$PWD/$FILE_BIN" external/electron
            fi
        fi
        ;;
    start)
        export NODE_BINARY=./lib.electron.js
        ;;
    test)
        export NODE_BINARY=./lib.electron.js
        ;;
    esac
    # run command - default
    case "$ARG1" in
    build-ci)
        if [ "$npm_package_nameLib" = utility2 ]
        then
            ./lib.utility2.sh shReadmeTest build_ci.sh
            return
        fi
        utility2 shReadmeTest build_ci.sh
        ;;
    eval)
        shift
        "$@"
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
    printf "... finished running command 'npm run $*'\n" 1>&2
)}

shNpmReleasesFetch () {(set -e
# this function will fetch the list of all electron-releases
# example usage:
# npm run eval shNpmReleasesFetch
    if [ "$GITHUB_TOKEN" ]
    then
        AUTHORIZATION="Authorization: token $GITHUB_TOKEN"
    fi
    PAGE=0
    rm -f .releases.txt
    (
    while true
    do
        PAGE="$((PAGE+1))"
        printf "curl \
https://api.github.com/repos/electron/electron/releases?page=$PAGE&per_page=100\n" | \
            tee -a .releases.txt
        curl -#Lf -H "$AUTHORIZATION" \
"https://api.github.com/repos/electron/electron/releases?page=$PAGE&per_page=100" | \
        grep -o -E "https:.*\.zip" >> .releases.txt
        if [ "$?" != 0 ]
        then
            break
        fi
    done
    ) || true
)}

shNpmReleasesMinorVersions () {(set -e
# this function will print latest minor-releases of electron to stdout
# example usage:
# npm run eval shNpmReleasesMinorVersions
        node -e '
/* jslint utility2:true */
(function () {
"use strict";
var dict;
dict = {};
require("fs").readFileSync("releases.txt", "utf8").replace((
    /(v\d+?\.\d+?)\.\d.*?\//g
), function (match0, match1) {
    switch (dict[match1] || match1) {
    case "v0.3":
    case "v0.4":
    case true:
        return;
    }
    dict[match1] = true;
    console.log(match0.slice(0, -1));
});
}());
'
)}

shNpmReleasesParse () {(set -e
# this function will parse the list of all electron-releases
# example usage:
# npm run eval shNpmReleasesParse
    cat .releases.txt |
        grep -E "https:.*(electron-|atom-shell).*\.zip" | \
        grep -E "(linux|linux-x64|atom-shell)\.zip" | tee releases.txt
)}

# run command
shMain "$npm_lifecycle_event" "$(node -e 'console.log(
    JSON.parse(process.env.npm_config_argv).original.join(" ").replace((/^(?:run )?\S+ /), "")
)')"
