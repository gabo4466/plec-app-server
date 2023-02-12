import { Module } from '@nestjs/common';
import { ProfessorCreateService } from '../../domain/users/services/professor/professor-create.service';
import { MongooseProfessorRepository } from '../../infrastructure/users/repositories/mongoose-professor.repository';
import { AuthUsersController } from '../../infrastructure/users/controllers/auth-users.controller';
import { ProfessorRegisterUseCase } from '../../application/users/professor-register.use-case';
import { ProfessorCheckService } from '../../domain/users/services/professor/professor-check.service';

@Module({
    controllers: [AuthUsersController],
    providers: [
        // USE CASES
        ProfessorRegisterUseCase,

        // SERVICES
        ProfessorCreateService,
        ProfessorCheckService,

        // REPOSITORIES
        {
            provide: 'ProfessorRepository',
            useClass: MongooseProfessorRepository,
        },
    ],
})
export class UsersModule {}
