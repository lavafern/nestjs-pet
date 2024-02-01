import { InternalServerErrorException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

export class Hashing {
    private saltRounds : number = 10;

    public HashPassword(myPlaintextPassword: string) : Promise<string> {
        return new Promise((resolve,reject) => {
            bcrypt.hash(myPlaintextPassword, this.saltRounds, function(err, hash) {
                // Store hash in your password DB.
                if (err) reject(new InternalServerErrorException("Failed to hash string"));
                resolve(hash);
            });
        });
    }

    public comparePassword(myPlaintextPassword: string, hash: string) : Promise<boolean> {
        return new Promise((resolve,reject) => {
            bcrypt.compare(myPlaintextPassword, hash, function(err, result) {
                if (err) reject(err);
                resolve(result);
            });
        });
    }
}
