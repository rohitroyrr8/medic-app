export class InvalidInputError extends Error {
    constructor(message: string) {
        super();
        this.name = 'InvalidInputError';
        this.message = message;
    }

}