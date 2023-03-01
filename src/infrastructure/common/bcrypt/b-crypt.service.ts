import { Injectable } from '@nestjs/common';
import { CryptService } from '../../../domain/common/services/crypt.service';

import { compareSync, hashSync } from 'bcrypt';

@Injectable()
export class BCryptService implements CryptService {
    encrypt(term: string): string {
        return hashSync(term, process.env.SALT_ROUNDS);
    }
    compare(term: string, encrypted: string): boolean {
        return compareSync(term, encrypted);
    }
}
