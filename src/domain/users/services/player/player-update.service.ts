import { Inject, Injectable } from '@nestjs/common';
import { Player } from '../../player';
import { PlayerRepository } from '../../repositories/player.repository';

@Injectable()
export class PlayerUpdateService {
    constructor(
        @Inject('PlayerRepository')
        private readonly playerRepository: PlayerRepository,
    ) {}

    async execute(player: Player) {
        return this.playerRepository
            .update(player)
            .then((player) => {
                return player;
            })
            .catch((error) => {
                throw error;
            });
    }
}
