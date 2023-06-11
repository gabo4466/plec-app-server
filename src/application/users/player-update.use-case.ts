import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { UserException } from 'src/domain/users/exceptions/user.exception';
import { Player } from 'src/domain/users/player';
import { PlayerUpdateService } from 'src/domain/users/services/player/player-update.service';

@Injectable()
export class PlayerUpdateUseCase {
    constructor(private readonly playerUpdateService: PlayerUpdateService) {}

    async execute(player: Player) {
        try {
            return await this.playerUpdateService.execute(player);
        } catch (error) {
            throw new InternalServerErrorException();
        }
    }
}
