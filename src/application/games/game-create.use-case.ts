import { Injectable } from '@nestjs/common';
import { Game } from 'src/domain/game/game';
import { GameCreateService } from '../../domain/game/services/game-create.service';
import { GameRepository } from '../../domain/game/repositories/game.repository';

@Injectable()
export class GameCreateUseCase {
    constructor(
        private readonly gameCreateService: GameCreateService,
        private readonly gameRepository: GameRepository,
    ) {}

    execute(game: Game) {
        this.gameCreateService.createGame(game);
    }
}
