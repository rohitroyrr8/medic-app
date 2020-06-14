#!/bin/bash

function cook() {
    
    echo $'\n'""$'\n'
    echo $'\n'"Info: Building the code!"$'\n'
    echo $'\n'""$'\n'
    
    if ! npm run prepublishOnly; then
        echo $'\n'"Failure: Alas! There was an issue cooking your code..!"$'\n'
        exit 1
    fi
}

function transport() {
    
    echo $'\n'""$'\n'
    echo $'\n'"Info: Moving the package to the container!"$'\n'
    echo $'\n'""$'\n'
    
    if ! docker cp ../pharma-smart-contract cli.trueclaim.com:/opt/gopath/src/github.com; then
        echo $'\n'"Failure: Failed moving the package!"$'\n'
        exit 1
    fi
}

function serve() {

    echo $'\n'""$'\n'
    echo $'\n'"Info: Deploying from CLI!"$'\n'
    echo $'\n'""$'\n'
    
    if ! docker exec cli.trueclaim.com scripts/upgrade_chaincode.sh $1; then
        echo $'\n'"Failure: Failed deploying the package!"$'\n'
        exit 1
    fi
}

if [ "$1" = "-v" ]; then	
    shift
fi
VERSION=$1;shift

cook
transport
serve $VERSION