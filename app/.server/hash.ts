import { pbkdf2, pbkdf2Sync } from "pbkdf2";
import crypto,{KeyObject, generateKey} from 'crypto';
import argon from 'argon2';



const DERIVATION_ROUNDS = 4500;
const PASSWORD_KEY_SIZE = 32;
const IV_SIZE = 16;
const ALGORITHM = 'aes-256-cbc';
const SALT =  crypto.createHash('sha512').update('MY_SALT_PASSWORD_SHOULD_BE_LONG_CHARACTER').digest();
const key = crypto.pbkdf2Sync('SECRET_BLUE_MARINADE_COMMONLY', SALT,DERIVATION_ROUNDS, PASSWORD_KEY_SIZE, 'sha512');
const iv = crypto.randomBytes(IV_SIZE);


//
// plaintext -> hash -> encrypt -> hex
// hex -> decrypt -> verify hash
//
export function encryptText(password: string): string  {
   
   
   let cipher = crypto.createCipheriv(ALGORITHM, key, iv);
   let encrypted = cipher.update(password, 'utf8', 'hex') + cipher.final('hex');
   return iv.toString('hex')+'___'+encrypted;
}

export  function decryptText(text: string) :  string{
   const [iv, encryptedText] = text.split('___');

   let decipher = crypto.createDecipheriv(ALGORITHM, key,Buffer.from(iv, 'hex'));
   
   let decrypted = decipher.update(encryptedText, 'hex', 'utf8') + decipher.final('utf8');

   return String(decrypted);
}

function removeIV(text : string) : string {
   return text.split('___')[1];
}

export const hashPassword = async (password: string): Promise<string> => {
   return await argon.hash(password);
}

export const verifyPassword = async (password: string, hash: string): Promise<boolean> => {
   console.log('password ::: ', password);
   console.log('hash ::: ', hash);
   return await argon.verify(hash, password);
}

