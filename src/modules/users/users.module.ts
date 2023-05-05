import { Module } from '@nestjs/common';
import { ProfessorCreateService } from 'src/domain/users/services/professor/professor-create.service';
import { MongooseProfessorRepository } from '../../infrastructure/users/repositories/mongoose-professor.repository';
import { AuthUsersController } from '../../infrastructure/users/controllers/auth-users.controller';
import { ProfessorRegisterUseCase } from 'src/application/users/professor-register.use-case';
import { ProfessorCheckService } from 'src/domain/users/services/professor/professor-check.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
    MongooseProfessorDto,
    ProfessorSchema,
} from '../../infrastructure/users/data-base-dtos/mongoose/mongoose-professor.dto';
import { CommonModule } from '../common/common.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/infrastructure/users/strategies/jwt.strategy';
import { ProfessorLoginUseCase } from 'src/application/users/professor-login.use-case';
import { ProfessorSearchService } from 'src/domain/users/services/professor/professor-search.service';
import { ProfessorSearchUseCase } from 'src/application/users/professor-search.use-case';
import { UsersController } from '../../infrastructure/users/controllers/users.controller';
import { ProfessorUpdateService } from 'src/domain/users/services/professor/professor-update.service';
import { ProfessorUpdateUseCase } from 'src/application/users/professor-update.use-case';

import { ProfessorDeleteService } from 'src/domain/users/services/professor/professor-delete.service';
import { ProfessorDeleteUseCase } from 'src/application/users/professor-delete.use-case';
import { ProfessorProfileUseCase } from 'src/application/users/professor-profile.use-case';
import { ProfessorProfileService } from 'src/domain/users/services/professor/professor-profile.service';
import { ProfessorFollowUseCase } from 'src/application/users/professor-follow.use-case';
import { ProfessorFollowService } from 'src/domain/users/services/professor/professor-follow.service';
import { ProfessorRoleUpdateUseCase } from 'src/application/users/professor-role-update.use-case';
import { ProfessorRoleUpdateService } from 'src/domain/users/services/professor/professor-role-update.service';
import { ProfessorActivateUseCase } from 'src/application/users/professor-activate.use-case';
import { ProfessorVerifyUseCase } from 'src/application/users/professor-verify.use-case';
import { ProfessorActivateService } from 'src/domain/users/services/professor/professor-activate.service';
import { ProfessorVerifyService } from 'src/domain/users/services/professor/professor-verify.service';
import { ProfessorModSearchUseCase } from 'src/application/users/professor-mod-search.use-case';
import { ProfessorModSearchService } from 'src/domain/users/services/professor/professor-mod-search.service';
import { ModUsersController } from 'src/infrastructure/users/controllers/mod-users.controller';
import { ProfessorUnfollowUseCase } from 'src/application/users/professor-unfollow.use-case';
import { ProfessorUnfollowService } from 'src/domain/users/services/professor/professor-unfollow.service';
import { PlayersController } from 'src/infrastructure/users/controllers/players.controller';
import { PlayerCreateUseCase } from 'src/application/users/player-create.use-case';
import {
    MongoosePlayerDto,
    PlayerSchema,
} from 'src/infrastructure/users/data-base-dtos/mongoose/mongoose-player.dto';
import { MongoosePlayerRepository } from 'src/infrastructure/users/repositories/mongoose-player.repository';
import { PlayerCreateService } from 'src/domain/users/services/player/player-create.service';
import { PlayerFindByTermService } from 'src/domain/users/services/player/player-find-by-term.service';
import { PlayerUpdateService } from 'src/domain/users/services/player/player-update.service';
import { PlayerUpdateUseCase } from 'src/application/users/player-update.use-case';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: MongooseProfessorDto.name,
                schema: ProfessorSchema,
                collection: 'professor',
            },
            {
                name: MongoosePlayerDto.name,
                schema: PlayerSchema,
                collection: 'player',
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
    controllers: [
        AuthUsersController,
        UsersController,
        ModUsersController,
        PlayersController,
    ],
    providers: [
        // USE CASES
        ProfessorRegisterUseCase,
        ProfessorLoginUseCase,
        ProfessorSearchUseCase,
        ProfessorUpdateUseCase,
        ProfessorDeleteUseCase,
        ProfessorProfileUseCase,
        ProfessorRoleUpdateUseCase,
        ProfessorActivateUseCase,
        ProfessorVerifyUseCase,
        ProfessorModSearchUseCase,
        ProfessorFollowUseCase,
        ProfessorUnfollowUseCase,

        PlayerCreateUseCase,
        PlayerUpdateUseCase,

        // SERVICES
        ProfessorCreateService,
        ProfessorCheckService,
        ProfessorSearchService,
        ProfessorUpdateService,
        ProfessorDeleteService,
        ProfessorProfileService,
        ProfessorFollowService,
        ProfessorRoleUpdateService,
        ProfessorActivateService,
        ProfessorVerifyService,
        ProfessorModSearchService,
        ProfessorUnfollowService,

        PlayerCreateService,
        PlayerFindByTermService,
        PlayerUpdateService,

        // REPOSITORIES
        {
            provide: 'ProfessorRepository',
            useClass: MongooseProfessorRepository,
        },
        {
            provide: 'PlayerRepository',
            useClass: MongoosePlayerRepository,
        },

        // STRATEGIES
        JwtStrategy,
    ],
    exports: [
        JwtStrategy,
        PassportModule,
        JwtModule,
        'ProfessorRepository',
        'PlayerRepository',
        ProfessorCheckService,
    ],
})
export class UsersModule {}
