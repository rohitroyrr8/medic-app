import {Context, Contract } from "fabric-contract-api";
import log4js = require('log4js');
import { StudentService } from "../services/StudentService";
import { PatientService } from "../services/PatientService";
import { DoctorService } from "../services/DoctorService";

const logger = log4js.getLogger('Medicnet Contract');

export class MedicnetContext extends Context {
    constructor() {
        super();
    }
}
export class MedicnetContract extends Contract {
    constructor() {
        super('com.medic-network.medicnet');
        logger.info('medicnet smartcontract initiated.');
    }

    public createContext() {
        return new MedicnetContext();
    }

    public async createStudent(ctx: MedicnetContext, request: string ) {
        return await new StudentService().createStudent(ctx, request);
    }

    public async getStudent(ctx: MedicnetContext, name: string) {
        return await new StudentService().getStudent(ctx, name);
    }

    public async getAllPatient(ctx: MedicnetContext) {
        return await new PatientService().index(ctx);
    }

    public async getPatient(ctx: MedicnetContext, request: string) {
        return await new PatientService().get(ctx, request);
    }

    public async savePatient(ctx: MedicnetContext, request: string) {
        return await new PatientService().save(ctx, request);
    }

    public async addPatientHistory(ctx: MedicnetContext, email: string, request: string) {
        return await new PatientService().addHistory(ctx, email, request);
    }

    public async getAllDoctor(ctx: MedicnetContext) {
        return await new DoctorService().index(ctx);
    }

    public async saveDoctor(ctx: MedicnetContext, request: string) {
        return await new DoctorService().save(ctx, request);
    }
}