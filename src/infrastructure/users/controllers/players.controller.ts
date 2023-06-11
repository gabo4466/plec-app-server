import { Body, Controller, Param, Patch, Post } from '@nestjs/common';
import { PlayerCreateUseCase } from 'src/application/users/player-create.use-case';
import { Player } from 'src/domain/users/player';
import { CreatePlayerDto } from '../dto/create-player.dto';
import { UpdatePlayerDto } from '../dto/update-player.dto';
import { PlayerUpdateUseCase } from '../../../application/users/player-update.use-case';

@Controller('users/players')
export class PlayersController {
    constructor(
        private readonly playerCreateUseCase: PlayerCreateUseCase,
        private readonly playerUpdateUseCase: PlayerUpdateUseCase,
    ) {}

    @Post('')
    async createPlayer(@Body() createPlayerDto: CreatePlayerDto) {
        const player = createPlayerDto as Player;

        return this.playerCreateUseCase.execute(player);
    }

    @Patch(':id')
    async updatePlayer(
        @Body() updatePlayerDto: UpdatePlayerDto,
        @Param('id') id: string,
    ) {
        const player = new Player();
        player._id = id;
        player.nickname = updatePlayerDto.nickname;
        return await this.playerUpdateUseCase.execute(player);
    }
}
