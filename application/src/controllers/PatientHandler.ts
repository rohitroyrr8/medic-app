import * as express from 'express';
import { MedicResponse } from '../models/MedicResponse';
import log4js = require('log4js');
const logger = log4js.getLogger('Patient Handler');
const contractHelper = require('../helpers/contractHelper');

export default function patientController(app:express.Application) {
    
    async function save(req: express.Request, res: express.Response) {
        let response: MedicResponse = null;
        try {
            const contract = await contractHelper.getContractInstance(req);
            const request = {
                name: 'Rohit Kumar',
                email: 'rohitroyrr8@gmail.com',
                mobile: '456434535',
                dateOfBirth: '2020-01-12',
                address: 'Sector 10, Grugaon',
                school: 'Amity university'
            }
            const patientBuffer: Buffer = await contract.submitTransaction('savePatient', JSON.stringify(request));
            let patientResponse: any = JSON.parse(patientBuffer.toString());
            return res.status(200).send(patientResponse);
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
                email: 'rohitroyrr8@gmail.com',
            }
            const patientBuffer: Buffer = await contract.submitTransaction('getPatient', JSON.stringify(request));
            let patientResponse: any = JSON.parse(patientBuffer.toString());
            return res.status(200).send(patientResponse);
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
            
            const patientBuffer: Buffer = await contract.submitTransaction('getAllPatient');
            let patientResponse: any = JSON.parse(patientBuffer.toString());
            return res.status(200).send(patientResponse);
        } catch (error) {
            logger.error(`Error: ${error}`);
            response = new MedicResponse(500, 'something went wrong.', null, error);
            return res.status(response.$status).send(response);
        } finally {
            await contractHelper.disconnect();
        }
    }

    async function addHistory(req: express.Request, res: express.Response) {
        let response: MedicResponse = null;
        try {
            const contract = await contractHelper.getContractInstance(req);
            const request = {
                ailment: 'cataract',
                diagnosis: 'cataract classified somewhere',
                treatment: 'cataract surgery',
                admissionDate: '2020-05-29',
                dischargeDate: '2020-06-04',
                attendingDoctor: 'Dr Jon Doe',
                comment: 'all went well.'

            }
            const patientBuffer: Buffer = await contract.submitTransaction('addPatientHistory', 'rohitroyrr8@gmail.com', JSON.stringify(request));
            let patientResponse: any = JSON.parse(patientBuffer.toString());
            return res.status(200).send(patientResponse);
        } catch (error) {
            logger.error(`Error: ${error}`);
            response = new MedicResponse(500, 'something went wrong.', null, error);
            return res.status(response.$status).send(response);
        } finally {
            await contractHelper.disconnect();
        }
    }

    async function listPatients(req: express.Request, res: express.Response) {
        let response: MedicResponse = null;
        try {
            if(!req.session.isLoggedIn) { res.redirect('/auth/login'); }
            const contract = await contractHelper.getContractInstance(req);
            
            const patientBuffer: Buffer = await contract.submitTransaction('getAllPatient');
            let patientResponse: any = JSON.parse(patientBuffer.toString());
            
            res.render('patients/list', {title: 'Patient Lists', response: patientResponse, email: ''});
        } catch (error) {
            response = new MedicResponse(500, error.message);
        } finally {
            await contractHelper.disconnect();
        }
    }

    async function listPayments(req: express.Request, res: express.Response) {
        let response: MedicResponse = null;
        try {
            if(!req.session.isLoggedIn) { res.redirect('/auth/login'); }
            const contract = await contractHelper.getContractInstance(req);
            
            const patientBuffer: Buffer = await contract.submitTransaction('getAllPatient');
            let patientResponse: any = JSON.parse(patientBuffer.toString());
            
            res.render('payments/index', {title: 'Payment Lists', response: patientResponse});
        } catch (error) {
            response = new MedicResponse(500, error.message);
        } finally {
            await contractHelper.disconnect();
        }
    }

    async function showPatients(req: express.Request, res: express.Response) {
        let response: MedicResponse = null;
        try {
            if(!req.session.isLoggedIn) { res.redirect('/auth/login'); }
            const contract = await contractHelper.getContractInstance(req);
            const request = {
                email: req.query.email
            }
            const patientBuffer: Buffer = await contract.submitTransaction('getPatient', JSON.stringify(request));
            let patientResponse: any = JSON.parse(patientBuffer.toString());

            res.render('patients/show', {title: 'Show Patient Details', patient: patientResponse.body, email: req.query.email});
        } catch (error) {
            response = new MedicResponse(500, error.message);
        } finally {
            await contractHelper.disconnect();
        }
    }

    async function savePatient(req: express.Request, res: express.Response) {
        let response: MedicResponse = null;
        try {
            if(!req.session.isLoggedIn) { res.redirect('/auth/login'); }
            const contract = await contractHelper.getContractInstance(req);
            const request = {
                name:  req.query.name,
                email: req.query.email,
                mobile: req.query.mobile,
                dateOfBirth: req.query.dateOfBirth,
                address: req.query.address
            }
            let patientBuffer: Buffer = await contract.submitTransaction('savePatient', JSON.stringify(request));
            let patientResponse: any = JSON.parse(patientBuffer.toString());
            let message = 'Patient details saved.';
            if(patientResponse.status !== 200) {
                message = 'Something went wrong.';
            }

            patientBuffer = await contract.submitTransaction('getAllPatient');
            patientResponse  = JSON.parse(patientBuffer.toString());
            res.redirect('/patients')
            // res.render('patients/list', {title: 'Patient Lists', message: message, response: patientResponse});
        } catch (error) {
            logger.error(`Error: ${error}`);
            response = new MedicResponse(500, 'something went wrong.', null, error);
            return res.status(response.$status).send(response);
        } finally {
            await contractHelper.disconnect();
        }
    }

    async function savePatientHistory(req: express.Request, res: express.Response) {
        let response: MedicResponse = null;
        try {
            if(!req.session.isLoggedIn) { res.redirect('/auth/login'); }
            const contract = await contractHelper.getContractInstance(req);
            const request = {
                ailment:  req.query.ailment,
                diagnosis: req.query.diagnosis,
                treatment: req.query.treatment,
                admissionDate: req.query.admissionDate,
                dischargeDate: req.query.dischargeDate,
                comment: req.query.comment,
                payment: {
                    amount: req.query.amount,
                    tax: req.query.tax,
                    discount: req.query.discount,
                }
                
            }
            let patientBuffer: Buffer = await contract.submitTransaction('addPatientHistory', req.query.email, JSON.stringify(request));
            let patientResponse: any = JSON.parse(patientBuffer.toString());
            console.log(patientResponse);
            let message = 'Patient details saved.';
            if(patientResponse.status !== 200) {
                message = 'Something went wrong.';
            }

            patientBuffer = await contract.submitTransaction('getAllPatient');
            patientResponse  = JSON.parse(patientBuffer.toString());
            res.redirect('/patients')
            // res.render('patients/list', {title: 'Patient Lists', message: message, response: patientResponse});
        } catch (error) {
            logger.error(`Error: ${error}`);
            response = new MedicResponse(500, 'something went wrong.', null, error);
            return res.status(response.$status).send(response);
        } finally {
            await contractHelper.disconnect();
        }
    }
    app.get('/api/patient', index);
    app.get('/api/patient/show', get);
    app.post('/api/patient/save', save);
    app.post('/api/patient/history/save', addHistory);

    app.get('/patients', listPatients);
    app.get('/payments', listPayments);
    app.get('/patients/show', showPatients);
    app.get('/patients/save', savePatient);
    app.get('/patients/history/save', savePatientHistory);
}

