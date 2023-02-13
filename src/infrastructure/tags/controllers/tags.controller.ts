import { Body, Controller, Post } from '@nestjs/common';
import { createTagDto } from '../dto/create-tag.dto';
import { TagCreateUseCase } from '../../../application/tags/tag-create.use-case';
import { Tag } from '../../../domain/tags/tag';
import { Auth } from 'src/infrastructure/users/decorators/auth.decorator';
import { GetUser } from 'src/infrastructure/users/decorators/get-user.decorator';
import { Professor } from '../../../domain/users/professor';

@Controller('tags')
export class TagsController {
    constructor(private readonly tagCreateUseCase: TagCreateUseCase) {}

    @Post()
    @Auth()
    async createTag(
        @Body() createTagDto: createTagDto,
        @GetUser() professor: Professor,
    ) {
        return professor.toObject();
        // const tag: Tag = new Tag();
        // this.tagCreateUseCase.execute();
    }
}
