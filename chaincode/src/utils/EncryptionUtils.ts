import * as crypto from "crypto";
import log4js = require('log4js');
import { CommonUtils } from "./CommonUtils";

const logger = log4js.getLogger('Encryption Utils');
export class Encryptioutils {

    private static ALGORITHM: string = 'aes256';
    private static ENCRYPTION_KEY: string = 'password';

    static encryptString(value: string): string {
        if(CommonUtils.isStringBlankOrNull(value)) {return ;}

        const cipher = crypto.createCipher(this.ALGORITHM, this.ENCRYPTION_KEY);
        const encrypted = cipher.update(value, 'utf8', 'hex') + cipher.final('hex');
        return encrypted.toString();
    }

    static decryptString(value: string): string {
        if(CommonUtils.isStringBlankOrNull(value)) { return;}

        const decipher = crypto.createDecipher(this.ALGORITHM, this.ENCRYPTION_KEY);
        const decrypted = decipher.update(value, 'hex', 'utf8') + decipher.final('utf8');
        return decrypted.toString();
    }

    static encryptNumber(value: number): string {
        if(value === null || value === undefined) {return;}

        const cipher = crypto.createCipher(this.ALGORITHM, this.ENCRYPTION_KEY);
        const encrypted = cipher.update(value.toString(), 'utf8', 'hex') + cipher.final('hex');
        return encrypted.toString();
    }

    static decryptNumber(value: string): number {
        if(CommonUtils.isStringBlankOrNull(value)) { return;}

        const decipher = crypto.createDecipher(this.ALGORITHM, this.ENCRYPTION_KEY);
        const decrypted = decipher.update(value, 'hex', 'utf8') + decipher.final('utf8');
        return Number(decrypted);
    }

}