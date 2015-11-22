#!/bin/sh
shNpmPostinstall() {
    # this function will run npm postinstall
    local DIR_TMP FILE_BIN FILE_LINK FILE_TMP FILE_URL || return $?
    shDownload() {
        # this function will download electron
        if [ ! -s "$FILE_BIN" ]
        then
            # check if unzip is installed
            if ! (unzip > /dev/null 2>&1)
            then
                printf "ERROR - electron-lite requires 'unzip' to install\n" 1>&2 || \
                    return $?
                return 1
            fi
            # download electron
            if [ ! -f "$FILE_TMP.downloaded" ]
            then
                printf "downloading $FILE_URL to $FILE_TMP ...\n" || return $?
                mkdir -p $DIR_TMP || return $?
                curl -#L -o $FILE_TMP $FILE_URL || return $?
                touch $FILE_TMP.downloaded || return $?
            fi
        fi
        # unzip electron
        mkdir -p external || return $?
        unzip -d external -oq $FILE_TMP || return $?
        # install electron
        if [ "$FILE_LINK" ]
        then
            rm -f $FILE_LINK && ln -s ../$FILE_BIN $FILE_LINK || return $?
        fi
    }
    DIR_TMP=/tmp/$USER
    case $(uname) in
    Darwin)
        # download electron
        FILE_BIN=external/Electron.app/Contents/MacOS/Electron || return $?
        FILE_LINK=external/electron || return $?
        FILE_TMP=$DIR_TMP/electron-v0.35.1-darwin-x64.zip || return $?
        FILE_URL=https://github.com/atom/electron/releases/download\
/v0.35.1/electron-v0.35.1-darwin-x64.zip || return $?
        shDownload || return $?
        # link electron
        rm -f $FILE_LINK || return $?
        ln -s Electron.app/Contents/MacOS/Electron $FILE_LINK || return $?
        ;;
    Linux)
        # download electron
        FILE_BIN=external/electron || return $?
        FILE_TMP=$DIR_TMP/electron-v0.35.1-linux-x64.zip || return $?
        FILE_URL=https://github.com/atom/electron/releases/download\
/v0.35.1/electron-v0.35.1-linux-x64.zip || return $?
        shDownload || return $?
        ;;
    esac
}

# run command
"$1" "$2" "$3" "$4" "$5" "$6" "$7" "$8"
