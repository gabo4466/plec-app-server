import { Module } from '@nestjs/common';
import { AuthController } from './auth/controllers/auth.controller';
import { DomainModule } from '../domain/domain.module';
import { ApplicationModule } from '../application/application.module';

@Module({
    controllers: [AuthController],
    imports: [DomainModule, ApplicationModule],
})
export class InfrastructureModule {}
