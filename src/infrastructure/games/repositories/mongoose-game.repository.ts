import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Game } from 'src/domain/game/game';
import { GameRepository } from 'src/domain/game/repositories/game.repository';
import { MongooseGameDto } from '../data-base-dtos/mongoose/mongoose-game.dto';

export class MongooseGameRepository implements GameRepository {
    constructor(
        @InjectModel(MongooseGameDto.name)
        private readonly gameModel: Model<MongooseGameDto>,
    ) {}

    create(obj: Game): Promise<Game> {
        throw new Error('Method not implemented.');
    }
    findOneById(id: string): Promise<Game> {
        throw new Error('Method not implemented.');
    }
    addPlayerToGame(gameId: string, playerId: string): Promise<Game> {
        throw new Error('Method not implemented.');
    }
}
