import * as express from 'express';
import { MedicResponse } from '../models/MedicResponse';
import log4js = require('log4js');
const logger = log4js.getLogger('Doctor Handler');
const contractHelper = require('../helpers/contractHelper');

export default function doctorHandler(app:express.Application) {
    
    async function save(req: express.Request, res: express.Response) {
        let response: MedicResponse = null;
        try {
            const contract = await contractHelper.getContractInstance(req);
            const request = {
                name: 'Dr. Rohit Roy',
                email: 'rohitroyrr8@gmail.com',
                mobile: '+91-987654323',
                designation: 'Surgeon',
                address: 'Gurgaon'
            }
            const responseBuffer: Buffer = await contract.submitTransaction('saveDoctor', JSON.stringify(request));
            let response: any = JSON.parse(responseBuffer.toString());
            return res.status(200).send(response);
        } catch (error) {
            logger.error(`Error: ${error}`);
            response = new MedicResponse(500, 'something went wrong.', null, error);
            return res.status(response.$status).send(response);
        } finally {
            await contractHelper.disconnect();
        }
    }

    async function get(req: express.Request, res: express.Response) {
        let response: MedicResponse = null;
        try {
            const contract = await contractHelper.getContractInstance(req);
            const request = {
                id: '111',
            }
            const responseBuffer: Buffer = await contract.submitTransaction('getDoctor', JSON.stringify(request));
            let response: any = JSON.parse(responseBuffer.toString());
            return res.status(200).send(response);
        } catch (error) {
            logger.error(`Error: ${error}`);
            response = new MedicResponse(500, 'something went wrong.', null, error);
            return res.status(response.$status).send(response);
        } finally {
            await contractHelper.disconnect();
        }
    }

    async function index(req: express.Request, res: express.Response) {
        let response: MedicResponse = null;
        try {
            const contract = await contractHelper.getContractInstance(req);
            const request = {

            }
            const responseBuffer: Buffer = await contract.submitTransaction('getAllDoctor', JSON.stringify(request));
            let response: any = JSON.parse(responseBuffer.toString());
            return res.status(200).send(response);
        } catch (error) {
            logger.error(`Error: ${error}`);
            response = new MedicResponse(500, 'something went wrong.', null, error);
            return res.status(response.$status).send(response);
        } finally {
            await contractHelper.disconnect();
        }
    }

    async function listDoctors(req: express.Request, res: express.Response) {
        let response: MedicResponse = null;
        try {
            if(!req.session.isLoggedIn) { res.redirect('/auth/login'); }
            const contract = await contractHelper.getContractInstance(req);
            const request = {

            }
            const responseBuffer: Buffer = await contract.submitTransaction('getAllDoctor', JSON.stringify(request));
            let response: any = JSON.parse(responseBuffer.toString());
            res.render('doctors/index', {title: 'hello world', response: response});
        } catch (error) {
            response = new MedicResponse(500, error.message);
            return response;
        } finally {
            await contractHelper.disconnect();
        }
    }

    async function saveDoctor(req: express.Request, res: express.Response) {
        let response: MedicResponse = null;
        try {
            if(!req.session.isLoggedIn) { res.redirect('/auth/login'); }
            const contract = await contractHelper.getContractInstance(req);
            const request = {
                name: req.query.name,
                email: req.query.email,
                mobile: req.query.mobile,
                designation: req.query.designation,
                address: req.query.address
            }
            const responseBuffer: Buffer = await contract.submitTransaction('saveDoctor', JSON.stringify(request));
            let response: any = JSON.parse(responseBuffer.toString());
            res.redirect('/doctors');
        } catch (error) {
            response = new MedicResponse(500, error.message);
            return response;
        } finally {
            await contractHelper.disconnect();
        }
    }

    app.get('/api/doctor', index);
    app.post('/api/doctor/save', save);

    app.get('/doctors', listDoctors);
    app.get('/doctors/save', saveDoctor);

}

