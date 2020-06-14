# medic-app

## Dependencies
Install these prerequisites in your machine
- cUrl
- Golang
- Python
- NodeJS & NPM or NVM
- Docker (Community Edition)
- Docker compose
- Hyperledger Fabric Binaries v1.4.3

## Step 1. Clone the project
`git clone https://github.com/rohitroyrr8/medic-app.git`

## Step 2. Generate Crypto Materials & Crypto config files
`cd network`

`./fabricNetwork generate`

## Step 3. Start the Fabric Nework
`./fabricNetwork up`

## Step 4. Installing & Instantiating chaincode
`./fabricNetwork install`

## Step 5. Upgrade chaincode
`./fabricNetwork update -v 1.2`

## Step 6. Start node application
`cd ../application`
`npm install`
`node dist/app.js`

## Step 6. Down the Fabric network
`./fabricNetwork down`
