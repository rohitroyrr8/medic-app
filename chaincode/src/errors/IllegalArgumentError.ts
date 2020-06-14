export class IllegalArgumentError extends Error {
    constructor(message: string) {
        super();
        this.name = 'IllegalArgumentError';
        this.message = message;
    }

}