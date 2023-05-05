import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GameCreateService } from 'src/domain/game/services/game-create.service';
import { MongooseGameRepository } from 'src/infrastructure/games/repositories/mongoose-game.repository';
import { GameCreateUseCase } from '../../application/games/game-create.use-case';
import {
    GameSchema,
    MongooseGameDto,
} from '../../infrastructure/games/data-base-dtos/mongoose/mongoose-game.dto';

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
    ],
    providers: [
        // Services
        GameCreateService,

        // UseCases
        GameCreateUseCase,

        // Repositories
        {
            provide: 'GameRepository',
            useClass: MongooseGameRepository,
        },
    ],
})
export class GamesModule {}
