import { Controller, Post } from '@nestjs/common';

@Controller('games')
export class GamesController {
    constructor() {}

    @Post()
    async createGame() {
        return 'createGame';
    }
}
