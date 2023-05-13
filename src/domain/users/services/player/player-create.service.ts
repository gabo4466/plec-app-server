import { Inject, Injectable } from '@nestjs/common';
import { Player } from '../../player';
import { PlayerRepository } from '../../repositories/player.repository';

@Injectable()
export class PlayerCreateService {
    constructor(
        @Inject('PlayerRepository')
        private readonly playerRepository: PlayerRepository,
    ) {}

    async execute(player: Player): Promise<Player> {
        return this.playerRepository
            .create(player)
            .then((playerCreated) => {
                return playerCreated;
            })
            .catch((error) => {
                throw error;
            });
    }
}
