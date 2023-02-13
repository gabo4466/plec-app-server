import { Body, Controller, Post } from '@nestjs/common';
import { TagCreateService } from '../../../domain/tags/services/tag-create.service';
import { createTagDto } from '../dto/create-tag.dto';

@Controller('tags')
export class tagsController {
    constructor(private readonly tagCreateService: TagCreateService) {}

    @Post()
    async createTag(@Body() createTagDto: createTagDto) {
        //TODO:
    }
}
