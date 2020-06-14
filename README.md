# certification-network
The education can utilise the feature set of blockchain to reduce the difficulties faced in the traditional certification process. By using hyperledger fabric network , you can set up a distributed between the education authority, employer and collleges or universities. Cerfication details can be immutably stored and accessed from the blockchain by anyone in a permissioned way by any organization

## Dependencies
Install these prerequisites in your machine
- cUrl
- Golang
- Python
- NodeJS & NPM: https://nodejs.org
- Docker (Community Edition)
- Docker compose
- Hyperledger Fabric Binaries

## Step 1. Clone the project
`git clone https://github.com/rohitroyrr8/certification-network`

## Step 2. Generate Crypto Materials & Crypto config files
`cd network`

`./fabricNetwork generate`

## Step 3. Start the Fabric Nework
`./fabricNetwork up`

## Step 4. Installing & Instantiating chaincode
`./fabricNetwork install`

## Step 5. Invoke Smart contract functions 
`docker ps -a`

`docker exec -it chaicode /bin/bash`

`npm start-dev`

----on another terminal
`docker exec -it peer-container-id bash`

`npm run start-dev`

## Step 6. Down the Fabric network
`./fabricNetwork down`
