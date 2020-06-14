import * as express from 'express';
import { MedicResponse } from '../models/MedicResponse';

const fs = require('fs'); // FileSystem Library
const { FileSystemWallet, X509WalletMixin } = require('fabric-network'); // Wallet Library provided by Fabric
const path = require('path'); // Support library to build filesystem paths in NodeJs
const wallet = new FileSystemWallet('./identity/allparticipants');
import log4js = require('log4js');
const logger = log4js.getLogger('Authentication Handler');
const contractHelper = require('../helpers/contractHelper');

export default function authenticationhandler(app:express.Application) {
    let sess;
    async function dashboard(req: express.Request, res: express.Response) {
        let response: MedicResponse = null;
        try {
            // to check whether user is logged in or not
            sess = req.session;
            if(!sess.isLoggedIn) { res.redirect('/auth/login'); }
            else {res.render('dashboard', {title: 'hello world'});}
        } catch (error) {
            response = new MedicResponse(500, error.message);
        }
    }

    async function login(req: express.Request, res: express.Response) {
        let response: MedicResponse = null;
        try {
            sess = req.session;
            if(sess.isLoggedIn) { res.redirect('dashboard'); }
            res.render('login', {title: 'hello world'});
        } catch (error) {
            response = new MedicResponse(500, error.message);
        }
    }

    async function createAccount(req: express.Request, res: express.Response) {
        let response: MedicResponse = null;
        try {
            res.render('signup', {title: 'hello world'});
        } catch (error) {
            response = new MedicResponse(500, error.message);
        }
    }

    async function accountSetting(req: express.Request, res: express.Response) {
        let response: MedicResponse = null;
        try {
            sess = req.session;
            if(!sess.isLoggedIn) { res.redirect('/auth/login'); }
            res.render('accounts', {title: 'hello world'});
        } catch (error) {
            response = new MedicResponse(500, error.message);
        }
    }

    async function userProfile(req: express.Request, res: express.Response) {
        let response: MedicResponse = null;
        try {
            sess = req.session;
            if(!sess.isLoggedIn) { res.redirect('/auth/login'); }
            res.render('user-profile', {title: 'hello world'});
        } catch (error) {
            response = new MedicResponse(500, error.message);
        }
    }

    async function addToWallet(req: express.Request, res: express.Response) {
        let response: MedicResponse = null;
        try {
            let certificatePath: string = '/home/rohit/workspace/medicApp/network/crypto-config/peerOrganizations/allparticipants.medic-app.com/users/Admin@allparticipants.medic-app.com/msp/signcerts/Admin@allparticipants.medic-app.com-cert.pem';
            let privateKeyPath: string = '/home/rohit/workspace/medicApp/network/crypto-config/peerOrganizations/allparticipants.medic-app.com/users/Admin@allparticipants.medic-app.com/msp/keystore/72b4c6c6924e9886c10f50f6072c4b4eb4fab4a65afc9565bf6e4980abe317e1_sk';

            // Fetch the credentials from our previously generated Crypto Materials required to create this user's identity
            const certificate = fs.readFileSync(certificatePath).toString();
            // IMPORTANT: Change the private key name to the key generated on your computer
            const privatekey = fs.readFileSync(privateKeyPath).toString();

            // Load credentials into wallet
            const identityLabel = 'ALLPARTICIPANTS_ADMIN';
            const identity = X509WalletMixin.createIdentity('allparticipantsMSP', certificate, privatekey);

            await wallet.import(identityLabel, identity);
            response = new MedicResponse(200, 'Admin identity has been added to wallet');
            return res.status(response.$status).send(response);
        } catch (error) {
            logger.error(`Error while adding identity into wallet: ${error}`);
            response = new MedicResponse(500, 'Error while adding identity into wallet');
            return res.status(response.$status).send(response);
        }
    }

    async function performLogin(req:express.Request, res: express.Response) {
        try {
            const wallet = new FileSystemWallet('./identity/allparticipants');
            const userExists = await wallet.exists(req.query.name);
            if(userExists && req.query.password === 'adminpw') {
                sess = req.session;
                sess.isLoggedIn = true;
                res.redirect('/dashboard');
            } else {
                res.redirect('/auth/login');
            }
        } catch (error) {
            logger.error(`Error while autheticating user: ${error}`);
            res.redirect('/auth/login');
        }
    }

    function performLogout(req:express.Request, res: express.Response) {
        // window.sessionStorage.removeItem('isLoggedIn');
        // window.sessionStorage.removeItem('loggedInUser');
        sess = req.session;
        sess.isLoggedIn = false;
        res.redirect('/auth/login');
    }



    app.get('/auth/login', login);
    app.get('/auth/create-account', createAccount);

    app.get('/dashboard', dashboard);
    app.get('/', dashboard);
    
    app.get('/account/security', accountSetting);
    app.get('/account/profile', userProfile);

    app.post('/api/add-to-wallet', addToWallet);

    app.get('/api/auth/login', performLogin);
    app.get('/api/auth/logout', performLogout);
    //app.post('/api/auth/create-account', performRegister);
    

}