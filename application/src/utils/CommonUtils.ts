export class CommonUtils {
    static isStringBlankOrNull(value: string): boolean {
        if(!value || !value.trim()) {
            return true;
        }
        return false;
    }

    static isStringNotBlankorNull(value: string): boolean {
        return !this.isStringBlankOrNull(value);
    }

    static isObjectBlankOrEmpty(obj: any): boolean {
        if(!obj || Object.keys(obj).length === 0) {
            return true;
        }
        return false;
    }

    static isObjectNotBlankOrEmpty(obj: any): boolean {
        return !this.isObjectBlankOrEmpty(obj);
    }

    static isArrayNullorEmpty(arr: any[]): boolean {
        return !arr || arr.length === 0;
    }

    static isArrayNotNullOrEmpty(arr: any[]): boolean {
        return !this.isArrayNullorEmpty(arr);
    }

    static createCompositeKey(...args: string[]): string {
        if(CommonUtils.isArrayNullorEmpty(args)) {
            throw new Error('Argument of composite key cannot be null or empty.');
        }
        let compositeKey:string = args[0];
        for(let i = 1; i < args.length; i++) {
            compositeKey = `${compositeKey}_${args[i]}`;
        }

        return compositeKey;
    }
}