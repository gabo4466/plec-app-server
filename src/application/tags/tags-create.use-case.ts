import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Tag } from 'src/domain/tags/tag';
import { Professor } from 'src/domain/users/professor';
import { TagsCreateService } from '../../domain/tags/services/tags-create.service';

@Injectable()
export class TagsCreateUseCase {
    constructor(private readonly tagCreateService: TagsCreateService) {}

    async execute(tag: Tag, professor: Professor) {
        try {
            // TODO: FIRST CHECK IF TAG ALREADY EXISTS
            const newTag = await this.tagCreateService.execute(tag, professor);
            return newTag;
        } catch (error) {
            throw new InternalServerErrorException();
        }
    }
}
