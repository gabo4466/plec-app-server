import { Module } from '@nestjs/common';
import { DomainModule } from '../domain/domain.module';
import { AuthUseCase } from './use-cases/auth.use-case';

@Module({
    imports: [DomainModule],
    providers: [AuthUseCase],
    exports: [AuthUseCase],
})
export class ApplicationModule {}
