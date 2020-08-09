import { Payment } from "./Payment";

export class PatientHistoryDetails {
    private ailment: string;
    private diagnosis: string;
    private treatment: string;
    private admissionDate: Date;
    private dischargeDate: Date;
    private attendingDoctor: string;
    private comment: string;
    private payment: Payment;
    private reportUrl: string;

    constructor(patientHistoryDetails: any) {
        if(patientHistoryDetails) {
            this.ailment = patientHistoryDetails.ailment;
            this.diagnosis = patientHistoryDetails.diagnosis;
            this.treatment = patientHistoryDetails.treatment;
            this.admissionDate = new Date(patientHistoryDetails.admissionDate);
            this.dischargeDate = new Date(patientHistoryDetails.dischargeDate);
            this.attendingDoctor = patientHistoryDetails.attendingDoctor;
            this.comment = patientHistoryDetails.comment;
            this.payment = new Payment(patientHistoryDetails.payment);
            this.reportUrl = patientHistoryDetails.reportUrl;
        }
    }
    encrypt(): void {

    }
    decrypt(): void {
        
    }

    /**
     * Getter $reportUrl
     * @return {string}
     */
	public get $reportUrl(): string {
		return this.reportUrl;
	}

    /**
     * Setter $reportUrl
     * @param {string} value
     */
	public set $reportUrl(value: string) {
		this.reportUrl = value;
	}
    
    /**
     * Getter $ailment
     * @return {string}
     */
	public get $ailment(): string {
		return this.ailment;
	}

    /**
     * Getter $diagnosis
     * @return {string}
     */
	public get $diagnosis(): string {
		return this.diagnosis;
	}

    /**
     * Getter $treatment
     * @return {string}
     */
	public get $treatment(): string {
		return this.treatment;
	}

    /**
     * Getter $admissionDate
     * @return {Date}
     */
	public get $admissionDate(): Date {
		return this.admissionDate;
	}

    /**
     * Getter $dischargeDate
     * @return {Date}
     */
	public get $dischargeDate(): Date {
		return this.dischargeDate;
	}

    /**
     * Getter $attendingDoctor
     * @return {string}
     */
	public get $attendingDoctor(): string {
		return this.attendingDoctor;
	}

    /**
     * Getter $comment
     * @return {string}
     */
	public get $comment(): string {
		return this.comment;
	}

    /**
     * Setter $ailment
     * @param {string} value
     */
	public set $ailment(value: string) {
		this.ailment = value;
	}

    /**
     * Setter $diagnosis
     * @param {string} value
     */
	public set $diagnosis(value: string) {
		this.diagnosis = value;
	}

    /**
     * Setter $treatment
     * @param {string} value
     */
	public set $treatment(value: string) {
		this.treatment = value;
	}

    /**
     * Setter $admissionDate
     * @param {Date} value
     */
	public set $admissionDate(value: Date) {
		this.admissionDate = value;
	}

    /**
     * Setter $dischargeDate
     * @param {Date} value
     */
	public set $dischargeDate(value: Date) {
		this.dischargeDate = value;
	}

    /**
     * Setter $attendingDoctor
     * @param {string} value
     */
	public set $attendingDoctor(value: string) {
		this.attendingDoctor = value;
	}

    /**
     * Setter $comment
     * @param {string} value
     */
	public set $comment(value: string) {
		this.comment = value;
	}

    /**
     * Getter $payment
     * @return {Payment}
     */
	public get $payment(): Payment {
		return this.payment;
	}

    /**
     * Setter $payment
     * @param {Payment} value
     */
	public set $payment(value: Payment) {
		this.payment = value;
	}
    
}