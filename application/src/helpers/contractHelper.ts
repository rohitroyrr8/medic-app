import { FileSystemWallet, Gateway, X509WalletMixin } from "fabric-network";
import * as path from 'path';
import log4js = require('log4js');

const logger = log4js.getLogger('Contract Helper');
const fs = require('fs');
const yaml = require('js-yaml');

let gateway: Gateway = new Gateway();

async function getContractInstance(req: any) {

	const wallet = new FileSystemWallet('./identity/allparticipants');

	const fabricUserName = 'ALLPARTICIPANTS_ADMIN';
	const profile = `connection-profile-allparticipants.yaml`;
	const ccpPath = path.resolve(__dirname, '..', 'resources', profile);
	
	let connectionProfile = yaml.safeLoad(fs.readFileSync(ccpPath, 'utf8'));

	let connectionOptions = {
		wallet: wallet,
		identity: fabricUserName,
		discovery: { enabled: true, asLocalhost: true }
	};

	// Connect to gateway using specified parameters
	logger.info('.... connecting to fabric gateway');
	await gateway.connect(connectionProfile, connectionOptions);
	const channel = await gateway.getNetwork('medicchannel');
	const contract = await channel.getContract('medicnet');

	return contract;
}

async function disconnect() {
    logger.info('.... disconnecting from fabric gateway');
}

module.exports.getContractInstance = getContractInstance;
module.exports.disconnect = disconnect;
