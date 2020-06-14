import { DocType } from "../enums/DocType";

export class Doctor {
    private readonly doctype: DocType;
    private name: string;
    private mobile: string;
    private email: string;
    private designation: string;
    private address: string;
    private createdOn: Date;

    constructor(doctor?: any) {
        if(doctor) {
            this.doctype = DocType.DOCTOR_DETAILS;
            this.name = doctor.name;
            this.mobile = doctor.mobile;
            this.email = doctor.email;
            this.designation = doctor.designation;
            this.address = doctor.address;
            this.createdOn = new Date(doctor.createdOn);
        }
    }
    encrypt() {

    }

    decrypt() {
        
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
     * Getter $designation
     * @return {string}
     */
	public get $designation(): string {
		return this.designation;
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
     * Setter $designation
     * @param {string} value
     */
	public set $designation(value: string) {
		this.designation = value;
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

    /**
     * Getter $createdOn
     * @return {Date}
     */
	public get $createdOn(): Date {
		return this.createdOn;
	}

    /**
     * Setter $createdOn
     * @param {Date} value
     */
	public set $createdOn(value: Date) {
		this.createdOn = value;
	}

}