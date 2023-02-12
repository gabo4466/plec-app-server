import { Module } from '@nestjs/common';
import { ProfessorCreateService } from '../../domain/users/services/professor/professor-create.service';
import { MongoDbProfessorRepository } from '../../infrastructure/users/repositories/mongodb-professor.repository';

@Module({
    providers: [
        ProfessorCreateService,
        {
            provide: 'ProfessorRepository',
            useClass: MongoDbProfessorRepository,
        },
    ],
})
export class UsersModule {}
