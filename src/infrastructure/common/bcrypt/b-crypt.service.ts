import { Injectable } from '@nestjs/common';
import { CryptService } from '../../../domain/common/services/crypt.service';

import { compareSync, hashSync } from 'bcrypt';

@Injectable()
export class BCryptService implements CryptService {
    // TODO: Get Rounds from env variable
    encrypt(term: string): string {
        return hashSync(term, 10);
    }
    compare(term: string, encrypted: string): boolean {
        return compareSync(term, encrypted);
    }
}
