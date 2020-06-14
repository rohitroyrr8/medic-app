export class TypeMismatchError extends Error {
    constructor(message: string) {
        super();
        this.name = 'TypeMismatchError';
        this.message = message;
    }
}