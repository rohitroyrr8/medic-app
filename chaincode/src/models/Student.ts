import { DocType } from "../enums/DocType";
import { Encryptioutils } from "../utils/EncryptionUtils";

export class Student {
    private docType: DocType;
    private id: number;
    private name: string;
    private email: string;
    private school: string;
    private createdOn: Date;
    private updatedOn: Date;

    constructor(studentDto?: any) {
        if(studentDto) {
            this.docType = DocType.STUDENT_DETAILS;
            this.id = studentDto.id;
            this.name = studentDto.name;
            this.email = studentDto.email;
            this.school = studentDto.school;
            this.createdOn = new Date(studentDto.createdOn);
            this.updatedOn = new Date(studentDto.updatedOn);
        }
    }

    encrypt(): void {
        this.email = Encryptioutils.encryptString(this.email);
    }
    decrypt(): void {
        this.email = Encryptioutils.decryptString(this.email);
    }
    /**
     * Getter $docType
     * @return {DocType}
     */
	public get $docType(): DocType {
		return this.docType;
	}

    /**
     * Getter $id
     * @return {number}
     */
	public get $id(): number {
		return this.id;
	}

    /**
     * Getter $name
     * @return {string}
     */
	public get $name(): string {
		return this.name;
	}

    /**
     * Getter $email
     * @return {string}
     */
	public get $email(): string {
		return this.email;
	}

    /**
     * Getter $school
     * @return {string}
     */
	public get $school(): string {
		return this.school;
	}

    /**
     * Getter $createdOn
     * @return {Date}
     */
	public get $createdOn(): Date {
		return this.createdOn;
	}

    /**
     * Getter $updatedOn
     * @return {Date}
     */
	public get $updatedOn(): Date {
		return this.updatedOn;
	}

    /**
     * Setter $docType
     * @param {DocType} value
     */
	public set $docType(value: DocType) {
		this.docType = value;
	}

    /**
     * Setter $id
     * @param {number} value
     */
	public set $id(value: number) {
		this.id = value;
	}

    /**
     * Setter $name
     * @param {string} value
     */
	public set $name(value: string) {
		this.name = value;
	}

    /**
     * Setter $email
     * @param {string} value
     */
	public set $email(value: string) {
		this.email = value;
	}

    /**
     * Setter $school
     * @param {string} value
     */
	public set $school(value: string) {
		this.school = value;
	}

    /**
     * Setter $createdOn
     * @param {Date} value
     */
	public set $createdOn(value: Date) {
		this.createdOn = value;
	}

    /**
     * Setter $updatedOn
     * @param {Date} value
     */
	public set $updatedOn(value: Date) {
		this.updatedOn = value;
	}

}