import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Player } from 'src/domain/users/player';
import { PlayerCreateService } from 'src/domain/users/services/player/player-create.service';
import { PlayerFindByTermService } from 'src/domain/users/services/player/player-find-by-term.service';

@Injectable()
export class PlayerCreateUseCase {
    constructor(
        private readonly playerCreateService: PlayerCreateService,
        private readonly playerFindByTermService: PlayerFindByTermService,
    ) {}

    async execute(newPlayer: Player) {
        try {
            let player = await this.playerFindByTermService.execute(
                newPlayer.email,
            );

            if (!player) {
                player = await this.playerCreateService.execute(newPlayer);
            }
            return player;
        } catch (error) {
            throw new InternalServerErrorException();
        }
    }
}
