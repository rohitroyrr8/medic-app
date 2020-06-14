export class Payment {
    private amount: number;
    private tax: number;
    private discount: number;
    private finalAmount: number;

    constructor(payment?: any) {
        if(payment) {
            this.amount = payment.amount;
            this.tax = payment.tax;
            this.discount = payment.discount;
            this.finalAmount = payment.finalAmount;
        }
    }

    /**
     * Getter $amount
     * @return {number}
     */
	public get $amount(): number {
		return this.amount;
	}

    /**
     * Getter $tax
     * @return {number}
     */
	public get $tax(): number {
		return this.tax;
	}

    /**
     * Getter $discount
     * @return {number}
     */
	public get $discount(): number {
		return this.discount;
	}

    /**
     * Getter $finalAmount
     * @return {number}
     */
	public get $finalAmount(): number {
		return this.finalAmount;
	}

    /**
     * Setter $amount
     * @param {number} value
     */
	public set $amount(value: number) {
		this.amount = value;
	}

    /**
     * Setter $tax
     * @param {number} value
     */
	public set $tax(value: number) {
		this.tax = value;
	}

    /**
     * Setter $discount
     * @param {number} value
     */
	public set $discount(value: number) {
		this.discount = value;
	}

    /**
     * Setter $finalAmount
     * @param {number} value
     */
	public set $finalAmount(value: number) {
		this.finalAmount = value;
	}

}