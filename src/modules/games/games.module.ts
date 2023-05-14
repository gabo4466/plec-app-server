import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GameCreateService } from 'src/domain/game/services/game-create.service';
import { MongooseGameRepository } from 'src/infrastructure/games/repositories/mongoose-game.repository';
import { GameCreateUseCase } from '../../application/games/game-create.use-case';
import {
    GameSchema,
    MongooseGameDto,
} from '../../infrastructure/games/data-base-dtos/mongoose/mongoose-game.dto';
import { GameWsGateway } from 'src/infrastructure/games/websockets/game-ws.gateway';
import { GameWsService } from 'src/infrastructure/games/websockets/game-ws.service';
import { UsersModule } from '../users/users.module';

@Module({
    controllers: [],
    imports: [
        MongooseModule.forFeature([
            {
                name: MongooseGameDto.name,
                schema: GameSchema,
                collection: 'games',
            },
        ]),
        UsersModule,
    ],
    providers: [
        // Services
        GameCreateService,

        // UseCases
        GameCreateUseCase,
        //Websockets
        GameWsService,
        GameWsGateway,
        // Repositories
        {
            provide: 'GameRepository',
            useClass: MongooseGameRepository,
        },
    ],
})
export class GamesModule {}
