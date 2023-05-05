import { Game } from '../game';

export interface GameRepository {
    create(obj: Game): Promise<Game>;
    findOneById(id: string): Promise<Game>;
    addPlayerToGame(gameId: string, playerId: string): Promise<Game>;
}
