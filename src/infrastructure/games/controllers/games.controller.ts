import { Body, Controller, Post } from '@nestjs/common';
import { GameCreateUseCase } from 'src/application/games/game-create.use-case';
import { Auth } from 'src/infrastructure/users/decorators/auth.decorator';
import { CreateGameDto } from '../dto/create-game.dto';

@Controller('games')
export class GamesController {
    constructor(private readonly gameCreateUseCase: GameCreateUseCase) {}

    // @Post()
    // @Auth()
    // async createGame(@Body() createGameDto: CreateGameDto) {
    //     const { questions } = createGameDto;
    //     return this.gameCreateUseCase.execute(game);
    // }
}
