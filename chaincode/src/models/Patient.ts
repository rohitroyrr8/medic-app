import { DocType } from "../enums/DocType";
import { PatientHistoryDetails } from "./PatientHistoryDetails";
import { Encryptioutils } from "../utils/EncryptionUtils";
import { CommonUtils } from "../utils/CommonUtils";

export class Patient {
    private readonly doctype: DocType;
    private name: string;
    private mobile: string;
    private email: string;
    private dateOfBirth: Date;
    private address: string;
    private pastHistory: PatientHistoryDetails[];
    private lastVisit: Date;
    private createdOn: Date;

    constructor(patient: any) {
        if(patient) {
            this.doctype = DocType.PATIENT_DETAILS;
            this.name = patient.name;
            this.mobile = patient.mobile;
            this.email = patient.email;
            this.dateOfBirth = new Date(patient.dateOfBirth);
            this.pastHistory = [];
            if(CommonUtils.isArrayNotNullOrEmpty(patient.pastHistory)) {
                for(const item of patient.pastHistory) {
                    this.pastHistory.push(item);
                }
            }
            this.address = patient.address;
            this.lastVisit = new Date(patient.lastVisit);
            this.createdOn = new Date(patient.createdOn);
        }
    }
    encrypt(): void {
        
    }
    decrypt(): void {
        
    }
    /**
     * Getter $name
     * @return {string}
     */
	public get $name(): string {
		return this.name;
	}

    /**
     * Getter $mobile
     * @return {string}
     */
	public get $mobile(): string {
		return this.mobile;
	}

    /**
     * Getter $email
     * @return {string}
     */
	public get $email(): string {
		return this.email;
	}

    /**
     * Getter $dateOfBirth
     * @return {Date}
     */
	public get $dateOfBirth(): Date {
		return this.dateOfBirth;
	}

    /**
     * Getter $pastHistory
     * @return {PatientHistoryDetails[]}
     */
	public get $pastHistory(): PatientHistoryDetails[] {
		return this.pastHistory;
	}

    /**
     * Getter $lastVisit
     * @return {Date}
     */
	public get $lastVisit(): Date {
		return this.lastVisit;
	}

    /**
     * Getter $createdOn
     * @return {Date}
     */
	public get $createdOn(): Date {
		return this.createdOn;
	}

    /**
     * Setter $name
     * @param {string} value
     */
	public set $name(value: string) {
		this.name = value;
	}

    /**
     * Setter $mobile
     * @param {string} value
     */
	public set $mobile(value: string) {
		this.mobile = value;
	}

    /**
     * Setter $email
     * @param {string} value
     */
	public set $email(value: string) {
		this.email = value;
	}

    /**
     * Setter $dateOfBirth
     * @param {Date} value
     */
	public set $dateOfBirth(value: Date) {
		this.dateOfBirth = value;
	}

    /**
     * Setter $pastHistory
     * @param {PatientHistoryDetails[]} value
     */
	public set $pastHistory(value: PatientHistoryDetails[]) {
		this.pastHistory = value;
	}

    /**
     * Setter $lastVisit
     * @param {Date} value
     */
	public set $lastVisit(value: Date) {
		this.lastVisit = value;
	}

    /**
     * Setter $createdOn
     * @param {Date} value
     */
	public set $createdOn(value: Date) {
		this.createdOn = value;
	}

    /**
     * Getter $address
     * @return {string}
     */
	public get $address(): string {
		return this.address;
	}

    /**
     * Setter $address
     * @param {string} value
     */
	public set $address(value: string) {
		this.address = value;
	}
    
}