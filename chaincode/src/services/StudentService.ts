import { MedicResponse } from "../models/MedicResponse";
import { CommonUtils } from "../utils/CommonUtils";
import { Student } from "../models/Student";
import { InvalidInputError } from "../errors/InvalidInputError";
import { parse } from "querystring";
import { Encryptioutils } from "../utils/EncryptionUtils";
import { MedicnetContext } from "../contract/MedicnetContract";
import log4js = require('log4js');

const logger = log4js.getLogger('Student Service');

export class StudentService {
    /**
     * 
     * @param ctx 
     * @param request 
     */
    public async createStudent(ctx: MedicnetContext, request: string) {
        try {
            let student: Student = new Student(JSON.parse(request));
            if(CommonUtils.isObjectBlankOrEmpty(student)) { throw new InvalidInputError('student details connot be null or empty.')};
            if(CommonUtils.isObjectBlankOrEmpty(student.$name)) { throw new InvalidInputError('student name connot be null or empty.')};

            let encryptId: string = Encryptioutils.encryptNumber(student.$id);
            let encryptName: string = Encryptioutils.encryptString(student.$name);

            let compositeKey:string = CommonUtils.createCompositeKey(encryptName);

            student.encrypt();
            await ctx.stub.putState(compositeKey, Buffer.from(JSON.stringify(student)));
            return new MedicResponse(200, 'student created successfully.', student);
        } catch (error) {
            logger.warn(`something went wrong. ${error}`);
            return new MedicResponse(500, 'something went wrong.', null, error);
        }
    }

    /**
     * 
     * @param ctx 
     * @param studenId 
     * @param studentName 
     */
    public async getStudent(ctx:MedicnetContext, studentName: string) {
        try {
            // if(!id || id === undefined || id === 0) { throw new InvalidInputError('student id connot be null or empty.')};
            if(CommonUtils.isStringBlankOrNull(studentName)) { throw new InvalidInputError('student name cannot be null or empty.')};

            // let encryptId: string = Encryptioutils.encryptNumber(id);
            let encryptName: string = Encryptioutils.encryptString(studentName);

            let compositeKey:string = CommonUtils.createCompositeKey(encryptName);

            const studentBuffer = await ctx.stub.getState(compositeKey);
            let student: Student = null;
            if(studentBuffer && studentBuffer.length > 0) {
                student = new Student(JSON.parse(studentBuffer.toString()));
            }
            if(!student) {
                return new MedicResponse(200, 'no exising student found.');
            }
            student.decrypt();
            return new MedicResponse(200, 'Student details fetched.', student);
        } catch (error) {
            logger.warn(`something went wrong. ${error}`);
            return new MedicResponse(500, 'something went wrong.', null, error);
        }
    }
}