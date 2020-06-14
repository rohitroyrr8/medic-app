import { type } from "os";
import { TypeMismatchError } from "../errors/TypeMismatchError";

export class RunTypeValidationUtils {
    public static setNumber(value: number): number {
        if(!value) { return value; }
        if(typeof(value) === 'number') { return value; }
        else {throw new TypeMismatchError(`${value} as ${typeof(value)} can not be parsed as number`)};
    }
    
    public static setString(value: string): string {
        if(!value) { return value; }
        if(typeof(value) === 'string') { return value; }
        else {throw new TypeMismatchError(`${value} as ${typeof(value)} can not be parsed as string`)};
    }
}