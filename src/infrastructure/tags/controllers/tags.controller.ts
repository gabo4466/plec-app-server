import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { createTagDto } from '../dto/create-tag.dto';
import { TagsCreateUseCase } from 'src/application/tags/tags-create.use-case';
import { Tag } from 'src/domain/tags/tag';
import { Auth } from 'src/infrastructure/users/decorators/auth.decorator';
import { GetUser } from 'src/infrastructure/users/decorators/get-user.decorator';
import { Professor } from 'src/domain/users/professor';
import { PaginationDto } from '../../dto/pagination.dto';
import { TagsSearchUseCase } from '../../../application/tags/tags-search.use-case';

@Controller('tags')
export class TagsController {
    constructor(
        private readonly tagCreateUseCase: TagsCreateUseCase,
        private readonly tagsSearchUseCase: TagsSearchUseCase,
    ) {}

    @Post()
    @Auth()
    async createTag(
        @Body() createTagDto: createTagDto,
        @GetUser() professor: Professor,
    ) {
        const tag = new Tag();
        tag.setDataFromInt(createTagDto);
        return this.tagCreateUseCase.execute(tag, professor);
    }

    @Get()
    search(@Query() paginationDto: PaginationDto) {
        const { term = '', limit = 10, offset = 0 } = paginationDto;
        return this.tagsSearchUseCase.execute(term, offset, limit);
    }
}
