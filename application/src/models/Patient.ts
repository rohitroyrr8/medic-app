import { History } from "./History";

export class Patient {
    private name: string;
    private email: string;
    private phone: string;
    private pastHistory: History[];
    
    constructor(patient: any) {
        if(patient) {
            this.name = patient.name;
            this.email = patient.email;
            this.phone = patient.phone;
            this.pastHistory = [];
            for(const item of patient.pastHistory) {
                this.pastHistory.push(item);
            }
        }
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
     * Getter $phone
     * @return {string}
     */
	public get $phone(): string {
		return this.phone;
	}

    /**
     * Getter $pastHistory
     * @return {History[]}
     */
	public get $pastHistory(): History[] {
		return this.pastHistory;
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
     * Setter $phone
     * @param {string} value
     */
	public set $phone(value: string) {
		this.phone = value;
	}

    /**
     * Setter $pastHistory
     * @param {History[]} value
     */
	public set $pastHistory(value: History[]) {
		this.pastHistory = value;
	}

}