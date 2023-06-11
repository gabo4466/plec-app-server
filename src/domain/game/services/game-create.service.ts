import { Inject, Injectable } from '@nestjs/common';
import { Game } from '../game';
import { GameRepository } from '../repositories/game.repository';

@Injectable()
export class GameCreateService {
    constructor(
        @Inject('GameRepository')
        private readonly gameRepository: GameRepository,
    ) {}

    async createGame(game: Game): Promise<Game> {
        return this.gameRepository
            .create(game)
            .then((game) => {
                return game;
            })
            .catch((error) => {
                throw error;
            });
    }
}
