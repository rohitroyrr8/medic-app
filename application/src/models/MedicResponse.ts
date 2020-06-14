export class MedicResponse {
    private status: number;
    private message: string;
    private body: any;
    private error: any;

    constructor(status?: number, message?: string, body?: any, error?: any) {
        this.status = status;
        this.message = message;
        this.body = body;
        this.error = error;
    }

    /**
     * Getter $status
     * @return {number}
     */
	public get $status(): number {
		return this.status;
	}

    /**
     * Getter $message
     * @return {string}
     */
	public get $message(): string {
		return this.message;
	}

    /**
     * Getter $body
     * @return {any}
     */
	public get $body(): any {
		return this.body;
	}

    /**
     * Getter $error
     * @return {any}
     */
	public get $error(): any {
		return this.error;
	}

    /**
     * Setter $status
     * @param {number} value
     */
	public set $status(value: number) {
		this.status = value;
	}

    /**
     * Setter $message
     * @param {string} value
     */
	public set $message(value: string) {
		this.message = value;
	}

    /**
     * Setter $body
     * @param {any} value
     */
	public set $body(value: any) {
		this.body = value;
	}

    /**
     * Setter $error
     * @param {any} value
     */
	public set $error(value: any) {
		this.error = value;
	}
    
}