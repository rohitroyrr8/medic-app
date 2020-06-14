import * as express from 'express';
import authenticationhandler from './AuthenticationHandler';
import patientHandler from './PatientHandler';
import doctorHandler from  './DoctorHandler'

export default function entryPoint(app: express.Application) {
    authenticationhandler(app);
    patientHandler(app);
    doctorHandler(app);

}