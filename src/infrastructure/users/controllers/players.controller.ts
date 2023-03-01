import { Body, Controller, Post } from '@nestjs/common';
import { PlayerCreateUseCase } from 'src/application/users/player-create.use-case';
import { Player } from 'src/domain/users/player';
import { CreatePlayerDto } from '../dto/create-player.dto';

@Controller('users/players')
export class PlayersController {
    constructor(private readonly playerCreateUseCase: PlayerCreateUseCase) {}

    @Post('')
    async createPlayer(@Body() createPlayerDto: CreatePlayerDto) {
        const player = createPlayerDto as Player;

        return this.playerCreateUseCase.execute(player);
    }
}
