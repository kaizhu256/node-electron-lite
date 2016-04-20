#!/bin/sh
shNpmPostinstall() {(set -e
    # this function will run npm postinstall
    shDownload() {
        # this function will download electron
        if [ ! -s "$FILE_BIN" ]
        then
            mkdir -p "$DIR_TMP"
            if [ -f "/$FILE_BASE" ]
            then
                cp "/$FILE_BASE" "$DIR_TMP"
                touch "$DIR_TMP/$FILE_BASE.downloaded"
            fi
            # download electron
            if [ ! -f "$DIR_TMP/$FILE_BASE.downloaded" ]
            then
                printf "downloading $FILE_URL to $DIR_TMP/$FILE_BASE ...\n"
                curl -#L -o "$DIR_TMP/$FILE_BASE" "$FILE_URL"
                touch "$DIR_TMP/$FILE_BASE.downloaded"
            fi
            # unzip electron
            mkdir -p external
            unzip -d external -oq "$DIR_TMP/$FILE_BASE"
        fi
        # install electron
        if [ "$FILE_LINK" ]
        then
            rm -f "$FILE_LINK" && ln -s "../$FILE_BIN" "$FILE_LINK"
        fi
    }
    DIR_TMP="/tmp/$USER"
    case "$(uname)" in
    Darwin)
        # download electron
        FILE_BASE="electron-v0.36.12-darwin-x64.zip"
        FILE_BIN=external/Electron.app/Contents/MacOS/Electron
        FILE_LINK=external/electron
        FILE_URL=https://github.com/atom/electron/releases/download\
/v0.36.12/electron-v0.36.12-darwin-x64.zip
        shDownload
        # link electron
        rm -f "$FILE_LINK"
        ln -s Electron.app/Contents/MacOS/Electron "$FILE_LINK"
        ;;
    Linux)
        # install unzip
        export PATH="$(pwd):$PATH"
        # download electron
        FILE_BASE="electron-v0.36.12-linux-x64.zip"
        FILE_BIN=external/electron
        FILE_URL=https://github.com/atom/electron/releases/download\
/v0.36.12/electron-v0.36.12-linux-x64.zip
        shDownload
        ;;
    esac
)}

# run command
"$@"
