import { Injectable } from '@nestjs/common';
import { Game } from 'src/domain/game/game';

@Injectable()
export class GameCreateUseCase {
    constructor() {}

    async execute(game: Game) {
        throw new Error('Method not implemented.');
    }
}
