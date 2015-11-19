#!/bin/sh
shNpmPostinstall() {
    # this function will run npm postinstall
    local DIR_TMP FILE_BIN FILE_LINK FILE_TMP FILE_URL || return $?
    shDownloadAndInstall() {
        # this function will download and install electron and slimerjs
        if [ ! -f $FILE_BIN ]
        then
            # check if unzip is installed
            if ! (unzip > /dev/null 2>&1)
            then
                printf "ERROR - electron-prebuilt-lite requires 'unzip' to install\n" 1>&2 || \
                    return $?
                return 1
            fi
            # download electron
            if [ ! -f $FILE_TMP.downloaded ]
            then
                printf "downloading $FILE_URL to $FILE_TMP ...\n" || return $?
                mkdir -p $DIR_TMP && curl -#L -o $FILE_TMP $FILE_URL || return $?
                touch $FILE_TMP.downloaded || return $?
            fi
            # unzip electron
            mkdir -p external && unzip -d external -q $FILE_TMP || return $?
        fi
        # install electron
        if [ "$FILE_LINK" ]
        then
            rm -f $FILE_LINK && ln -s ../$FILE_BIN $FILE_LINK || return $?
        fi
    }
    DIR_TMP=/tmp/$USER
    case $(uname) in
    Darwin)
        # download and install electron
        FILE_BIN=external/Electron.app/Contents/MacOS/Electron || return $?
        FILE_LINK=external/electron || return $?
        FILE_TMP=$DIR_TMP/electron-v0.35.0-darwin-x64.zip || return $?
        FILE_URL=https://github.com/atom/electron/releases/download\
/v0.35.0/electron-v0.35.0-darwin-x64.zip || return $?
        shDownloadAndInstall || return $?
        ;;
    Linux)
        # download and install electron
        FILE_BIN=external/electron || return $?
        FILE_TMP=$DIR_TMP/electron-v0.35.0-linux-x64.zip || return $?
        FILE_URL=https://github.com/atom/electron/releases/download\
/v0.35.0/electron-v0.35.0-linux-x64.zip || return $?
        shDownloadAndInstall || return $?
        ;;
    esac
}

# run command
"$1" "$2" "$3" "$4" "$5" "$6" "$7" "$8"
