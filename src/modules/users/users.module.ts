import { Module } from '@nestjs/common';
import { ProfessorCreateService } from '../../domain/users/services/professor/professor-create.service';
import { MongooseProfessorRepository } from '../../infrastructure/users/repositories/mongoose-professor.repository';
import { AuthUsersController } from '../../infrastructure/users/controllers/auth-users.controller';
import { ProfessorRegisterUseCase } from '../../application/users/professor-register.use-case';
import { ProfessorCheckService } from '../../domain/users/services/professor/professor-check.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
    MongooseProfessorDto,
    ProfessorSchema,
} from '../../infrastructure/users/data-base-dtos/mongoose/mongoose-professor.dto';
import { CommonModule } from '../common/common.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/infrastructure/users/strategies/jwt.strategie';
import { ProfessorLoginUseCase } from 'src/application/users/professor-login.use-case';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: MongooseProfessorDto.name,
                schema: ProfessorSchema,
                collection: 'professor',
            },
        ]),
        PassportModule.register({
            defaultStrategy: 'jwt',
        }),

        JwtModule.registerAsync({
            imports: [],
            inject: [],
            useFactory: () => {
                return {
                    secret: process.env.JWT_SECRET,
                    signOptions: {
                        expiresIn: '12h',
                    },
                };
            },
        }),

        CommonModule,
    ],
    controllers: [AuthUsersController],
    providers: [
        // USE CASES
        ProfessorRegisterUseCase,
        ProfessorLoginUseCase,

        // SERVICES
        ProfessorCreateService,
        ProfessorCheckService,

        // REPOSITORIES
        {
            provide: 'ProfessorRepository',
            useClass: MongooseProfessorRepository,
        },

        // STRATEGIES
        JwtStrategy,
    ],
    exports: [JwtStrategy, PassportModule, JwtModule],
})
export class UsersModule {}
