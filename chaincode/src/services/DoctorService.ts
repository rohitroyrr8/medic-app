import { MedicnetContext } from "../contract/MedicnetContract";
import { MedicResponse } from "../models/MedicResponse";
import { InvalidInputError } from "../errors/InvalidInputError";
import { CommonUtils } from "../utils/CommonUtils";
import { Encryptioutils } from "../utils/EncryptionUtils";
import log4js = require('log4js');
import { DocType } from "../enums/DocType";
import { QueryUtils } from "../utils/QueryUtils";
import { Doctor } from "../models/Doctor";

const logger = log4js.getLogger('Doctor Service');

export class DoctorService {
    public async save(ctx: MedicnetContext, request: string) {
        try {
            let doctor: Doctor = new Doctor(JSON.parse(request));
            if(CommonUtils.isObjectBlankOrEmpty(doctor)) { throw new InvalidInputError('doctor details is required.')};
            if(CommonUtils.isObjectBlankOrEmpty(doctor.$email)) { throw new InvalidInputError('doctor email is required.')};
            
            doctor.$createdOn = new Date();
            
            let encryptedKey: string = Encryptioutils.encryptString(doctor.$email);
            let compositeKey:string = CommonUtils.createCompositeKey(encryptedKey);

            doctor.encrypt();
            await ctx.stub.putState(compositeKey, Buffer.from(JSON.stringify(doctor)));
            return new MedicResponse(200, 'doctor created successfully.');
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
            queryString.selector.doctype = DocType.DOCTOR_DETAILS;

            const queryResult: Buffer = await QueryUtils.getResultForQueryString(ctx.stub, JSON.stringify(queryString));
            const patientResult = JSON.parse(queryResult.toString());

            let allDoctors: Doctor[] = [];

            for(const result of patientResult) {
                let data: any = result.record;
                allDoctors.push(new Doctor(data));
            }
            return new MedicResponse(200, 'doctor details fetched', allDoctors);
        } catch (error) {
            if(error instanceof InvalidInputError) {
                return new MedicResponse(422, error.message);
            }
            logger.warn(`something went wrong. ${error}`);
            return new MedicResponse(500, 'something went wrong.', [], error);
        }
    }
}