#!/bin/sh

postinstall() {(set -e
# this function will run npm postinstall
    export PATH="$(pwd):$PATH"
    # install electron
    VERSION=v1.6.11
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
)}

# run command
"$@"
