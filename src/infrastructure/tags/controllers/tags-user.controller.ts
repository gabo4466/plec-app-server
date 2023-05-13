import { Controller, Get, Param } from '@nestjs/common';
import { TagsByUserUseCase } from 'src/application/tags/tags-by-user.use-case';

@Controller('tags-users')
export class TagsUserController {
    constructor(private readonly tagsByUserUseCase: TagsByUserUseCase) {}

    @Get('/:id')
    async getTagsByUser(@Param('id') id: string) {
        return this.tagsByUserUseCase.execute(id);
    }
}
