import { MedicnetContext } from "../contract/MedicnetContract";
import { MedicResponse } from "../models/MedicResponse";
import { InvalidInputError } from "../errors/InvalidInputError";
import { Patient } from "../models/Patient";
import { CommonUtils } from "../utils/CommonUtils";
import { Encryptioutils } from "../utils/EncryptionUtils";
import log4js = require('log4js');
import { DocType } from "../enums/DocType";
import { QueryUtils } from "../utils/QueryUtils";
import { PatientHistoryDetails } from "../models/PatientHistoryDetails";
import { Payment } from "../models/Payment";

const logger = log4js.getLogger('Patient Service');
export class PatientService {
   
    public async save(ctx: MedicnetContext, request: string) {
        try {
            let patient: Patient = new Patient(JSON.parse(request));
            if(CommonUtils.isObjectBlankOrEmpty(patient)) { throw new InvalidInputError('patient details is required.')};
            if(CommonUtils.isObjectBlankOrEmpty(patient.$email)) { throw new InvalidInputError('patient email is required.')};
            
            patient.$pastHistory = [];
            patient.$lastVisit = new Date();
            patient.$createdOn = new Date();
            
            let encryptedKey: string = Encryptioutils.encryptString(patient.$email);
            let compositeKey:string = CommonUtils.createCompositeKey(encryptedKey);

            patient.encrypt();
            await ctx.stub.putState(compositeKey, Buffer.from(JSON.stringify(patient)));
            return new MedicResponse(200, 'patient created successfully.');
        } catch (error) {
            if(error instanceof InvalidInputError) {
                return new MedicResponse(422, error.message);
            }
            logger.warn(`something went wrong. ${error}`);
            return new MedicResponse(500, 'something went wrong.', null, error);
        }
    }

    public async index(ctx: MedicnetContext) {
        try {
            let queryString: any = {};
            queryString.selector = {};
            queryString.selector.doctype = DocType.PATIENT_DETAILS;

            const queryResult: Buffer = await QueryUtils.getResultForQueryString(ctx.stub, JSON.stringify(queryString));
            const patientResult = JSON.parse(queryResult.toString());

            let allPatients: Patient[] = [];

            for(const result of patientResult) {
                let data: any = result.record;
                allPatients.push(new Patient(data));
            }
            return new MedicResponse(200, 'patient details fetched', allPatients);
        } catch (error) {
            if(error instanceof InvalidInputError) {
                return new MedicResponse(422, error.message);
            }
            logger.warn(`something went wrong. ${error}`);
            return new MedicResponse(500, 'something went wrong.', [], error);
        }
    }

    public async get(ctx: MedicnetContext, request: string) {
        try {
            let patient: Patient = new Patient(JSON.parse(request));
            if(CommonUtils.isObjectBlankOrEmpty(patient)) { throw new InvalidInputError('patient details is required.')};
            if(CommonUtils.isObjectBlankOrEmpty(patient.$email)) { throw new InvalidInputError('patient email is required.')};
            
            let encryptedKey: string = Encryptioutils.encryptString(patient.$email);
            let compositeKey: string = CommonUtils.createCompositeKey(encryptedKey);
            
            let responseBuffer: Buffer = await ctx.stub.getState(compositeKey);
            if(responseBuffer && responseBuffer.length <= 0) {
                throw new InvalidInputError('no patient details found.')
            }
            patient = new Patient(JSON.parse(responseBuffer.toString()));
            
            patient.decrypt();
            await ctx.stub.putState(compositeKey, Buffer.from(JSON.stringify(patient)));
            return new MedicResponse(200, 'patient fetched successfully.', patient);
        } catch (error) {
            if(error instanceof InvalidInputError) {
                return new MedicResponse(422, error.message);
            }
            logger.warn(`Error: ${error}`);
            return new MedicResponse(500, 'something went wrong.', null, error);
        }
    }

    public async addHistory(ctx: MedicnetContext, email: string, request: string) {
        try {
            let history: PatientHistoryDetails = new PatientHistoryDetails(JSON.parse(request));

            if(CommonUtils.isObjectBlankOrEmpty(email)) { throw new InvalidInputError('patient email is required.')};
            if(CommonUtils.isObjectBlankOrEmpty(history)) { throw new InvalidInputError('patient history is required.')};
            if(CommonUtils.isObjectBlankOrEmpty(history.$ailment)) { throw new InvalidInputError('patient history is required.')};
            if(CommonUtils.isObjectBlankOrEmpty(history.$diagnosis)) { throw new InvalidInputError('patient diagnosis is required.')};
            if(CommonUtils.isObjectBlankOrEmpty(history.$treatment)) { throw new InvalidInputError('patient treatment is required.')};
            if(CommonUtils.isObjectBlankOrEmpty(history.$payment.$amount)) { throw new InvalidInputError('patient payment amount is required.')};
            
            let encryptedKey: string = Encryptioutils.encryptString(email);
            let compositeKey:string = CommonUtils.createCompositeKey(encryptedKey);
            
            let responseBuffer: Buffer = await ctx.stub.getState(compositeKey);
            if(responseBuffer && responseBuffer.length <= 0) {
                throw new InvalidInputError('no patient details found.')
            }
            let patient = new Patient(JSON.parse(responseBuffer.toString()));
            
            history.$payment.$finalAmount = history.$payment.$amount - ((history.$payment.$tax/history.$payment.$amount)*100 + (history.$payment.$discount/history.$payment.$amount)*100);
            patient.$pastHistory = CommonUtils.isArrayNotNullOrEmpty(patient.$pastHistory) ? patient.$pastHistory : [];
            patient.$pastHistory.push(history);

            patient.decrypt();
            await ctx.stub.putState(compositeKey, Buffer.from(JSON.stringify(patient)));
            return new MedicResponse(200, 'patient history added.');
        } catch (error) {
            if(error instanceof InvalidInputError) {
                return new MedicResponse(422, error.message);
            }
            logger.warn(`something went wrong. ${error}`);
            return new MedicResponse(500, 'something went wrong.', null, error);
        }
    }
}