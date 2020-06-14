export class History {
    private admissionDate: Date;
    private dischargeDate: Date;
    private ailment: string;
    private doctor: string;
    private comments: string;

    constructor(history: any) {
        if(history) {
            this.admissionDate = new Date(history.admissionDate);
            this.dischargeDate = new Date(history.dischargeDate);
            this.ailment = history.ailment;
            this.doctor = history.doctor;
            this.comments = history.comments;
        }
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
     * Getter $ailment
     * @return {string}
     */
	public get $ailment(): string {
		return this.ailment;
	}

    /**
     * Getter $doctor
     * @return {string}
     */
	public get $doctor(): string {
		return this.doctor;
	}

    /**
     * Getter $comments
     * @return {string}
     */
	public get $comments(): string {
		return this.comments;
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
     * Setter $ailment
     * @param {string} value
     */
	public set $ailment(value: string) {
		this.ailment = value;
	}

    /**
     * Setter $doctor
     * @param {string} value
     */
	public set $doctor(value: string) {
		this.doctor = value;
	}

    /**
     * Setter $comments
     * @param {string} value
     */
	public set $comments(value: string) {
		this.comments = value;
	}

}