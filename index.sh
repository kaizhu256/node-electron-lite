#!/bin/sh

shNpmPostinstall() {(set -e
# this function will run npm postinstall
    case "$(uname)" in
    Darwin)
        FILE_BASE="electron-v1.3.7-darwin-x64.zip"
        FILE_BIN=external/Electron.app/Contents/MacOS/Electron
        FILE_URL=https://github.com/atom/electron/releases/download\
/v1.3.7/electron-v1.3.7-darwin-x64.zip
        ;;
    Linux)
        # init unzip
        export PATH="$(pwd):$PATH"
        FILE_BASE="electron-v1.3.7-linux-x64.zip"
        FILE_BIN=external/electron
        FILE_URL=https://github.com/atom/electron/releases/download\
/v1.3.7/electron-v1.3.7-linux-x64.zip
        ;;
    esac
    if [ ! -s "$FILE_BIN" ]
    then
        if [ ! -f "/tmp/$FILE_BASE" ]
        then
            FILE_TMP="$(mktemp "/tmp/$FILE_BASE.XXXXXXXX")"
            # copy cached electron-zipfile
            if [ -f "/$FILE_BASE" ]
            then
                cp "/$FILE_BASE" "$FILE_TMP"
            # download electron-zipfile
            else
                printf "downloading $FILE_URL to /tmp/$FILE_BASE ...\n"
                curl -#L -o "$FILE_TMP" "$FILE_URL"
            fi
            chmod 755 "$FILE_TMP"
            # handle race-condition
            mv "$FILE_TMP" "/tmp/$FILE_BASE" 2>/dev/null || true
        fi
        # unzip electron-zipfile
        mkdir -p external
        unzip -d external -oq "/tmp/$FILE_BASE"
    fi
)}

# run command
"$@"
