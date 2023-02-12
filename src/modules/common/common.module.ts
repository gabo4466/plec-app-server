import { Module } from '@nestjs/common';
import { BCryptService } from '../../infrastructure/common/bcrypt/b-crypt.service';

@Module({
    providers: [{ provide: 'CryptService', useClass: BCryptService }],
    exports: ['CryptService'],
})
export class CommonModule {}
