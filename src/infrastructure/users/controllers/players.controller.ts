import { Body, Controller, Post } from '@nestjs/common';
import { PlayerCreateUseCase } from 'src/application/users/player-create.use-case';
import { CreatePlayerDto } from '../dto/create-player.dto';

@Controller('users/players')
export class PlayersController {
    constructor(private readonly playerCreateUseCase: PlayerCreateUseCase) {}

    @Post('')
    async createPlayer(@Body() createPlayerDto: CreatePlayerDto) {
        return 'works';
    }
}
