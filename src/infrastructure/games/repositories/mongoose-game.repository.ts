import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';
import { Game } from 'src/domain/game/game';
import { GameRepository } from 'src/domain/game/repositories/game.repository';
import { MongooseGameDto } from '../data-base-dtos/mongoose/mongoose-game.dto';

export class MongooseGameRepository implements GameRepository {
    constructor(
        @InjectModel(MongooseGameDto.name)
        private readonly gameModel: Model<MongooseGameDto>,
    ) {}

    create(game: Game): Promise<Game> {
        // return new Promise(async (resolve, reject) => {
        //     try {
        //         const mongooseGame = await this.gameModel.create(obj);
        //         const game = new Game();
        //         game.setDataFromGame(mongooseGame);
        //         resolve(game);
        //     } catch (error) {
        //         reject(error);
        //     }
        // // });
        // return new Promise(async (resolve, reject) => {
        //     try {
        //         let mongooseGame: MongooseGameDto;
        //         // eslint-disable-next-line prefer-const
        //         mongooseGame = await this.gameModel.create(
        //             this.setDataFromGame(game),
        //         );
        //         const newGame = new Game();
        //         newGame.setDataFromInt(mongooseGame);
        //         resolve(newGame);
        //     } catch (error) {
        //         reject(error);
        //     }
        // });
        throw new Error('Method not implemented.');
    }
    findOneById(id: string): Promise<Game> {
        throw new Error('Method not implemented.');
    }
    addPlayerToGame(gameId: string, playerId: string): Promise<Game> {
        throw new Error('Method not implemented.');
    }
    private setDataFromGame(game: Game) {
        return {
            players: game.players,
            questions: game.questions,
            professor: game.professor,
            points: game.points,
        };
    }
}
