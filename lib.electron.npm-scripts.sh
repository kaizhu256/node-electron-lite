#!/bin/sh

postinstall() {(set -e
# this function will run npm postinstall
    export PATH="$(pwd):$PATH"
    VERSION=v1.3.13
    case "$(uname)" in
    Darwin)
        FILE_BASE="electron-$VERSION-darwin-x64.zip"
        FILE_BIN=external/Electron.app/Contents/MacOS/Electron
        FILE_URL="https://github.com/electron/electron/releases/download/$VERSION/$FILE_BASE"
        ;;
    *)
        FILE_BASE="electron-$VERSION-linux-x64.zip"
        FILE_BIN=external/electron
        FILE_URL="https://github.com/electron/electron/releases/download/$VERSION/$FILE_BASE"
        # init busybox
        alias unzip="busybox unzip"
        ;;
    esac
    if [ ! -s "$FILE_BIN" ]
    then
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
                curl -#L -o "$FILE_TMP" "$FILE_URL"
            fi
            chmod 755 "$FILE_TMP"
            # mv file to prevent race-condition
            mv "$FILE_TMP" "/tmp/$FILE_BASE" 2>/dev/null || true
        fi
        # unzip file
        mkdir -p external
        unzip -d external -oq "/tmp/$FILE_BASE"
    fi
)}

# run command
"$@"
