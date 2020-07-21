const crypto = require('crypto');

const IV_LENGTH: number = 16; // For AES, this is always 16

export module CryptoHelper {
    export const crypto_helper = () => {
        return crypto_helper;
    };
    crypto_helper.crypto = crypto;
    crypto_helper.encrypt = (text:string):string => {
        let iv = crypto.randomBytes(IV_LENGTH);

        let cipher = crypto.createCipheriv(
            "aes-256-cbc",
            Buffer.from(crypto_helper.key),
            iv
        );
        let encrypted = cipher.update(text);

        encrypted = Buffer.concat([encrypted, cipher.final()]);

        return iv.toString("hex") + ":" + encrypted.toString("hex");
    };
    crypto_helper.decrypt = (text:string):string => {
        let textParts:string[] = text.split(":");
        const textPartsShifts:string = textParts.shift() as string;
        let iv = Buffer.from(textPartsShifts, "hex");
        let encryptedText = Buffer.from(textParts.join(":"), "hex");
        let decipher = crypto.createDecipheriv(
            "aes-256-cbc",
            Buffer.from(crypto_helper.key),
            iv
        );
        let decrypted = decipher.update(encryptedText);

        decrypted = Buffer.concat([decrypted, decipher.final()]);

        return decrypted.toString();
    };
    crypto_helper.key = process.env.ENCRYPTIONKEY; // Must be 256 bits (32 characters);
}