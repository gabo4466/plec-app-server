import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Professor, ProfessorSchema } from './model/Professor';
import { ProfessorService } from './model/services/professor.service';
import { AuthService } from './model/services/auth.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Professor.name,
                schema: ProfessorSchema,
            },
        ]),
    ],
    providers: [ProfessorService, AuthService],
    exports: [ProfessorService],
})
export class DomainModule {}
