import { Module } from '@nestjs/common';
import { ProfessorCreateService } from '../../domain/users/services/professor/professor-create.service';
import { MongooseProfessorRepository } from '../../infrastructure/users/repositories/mongoose-professor.repository';

@Module({
    providers: [
        ProfessorCreateService,
        {
            provide: 'ProfessorRepository',
            useClass: MongooseProfessorRepository,
        },
    ],
})
export class UsersModule {}
