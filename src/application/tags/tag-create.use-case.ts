import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Tag } from 'src/domain/tags/tag';
import { Professor } from 'src/domain/users/professor';
import { TagCreateService } from '../../domain/tags/services/tag-create.service';

@Injectable()
export class TagCreateUseCase {
    constructor(private readonly tagCreateService: TagCreateService) {}

    async execute(tag: Tag, professor: Professor) {
        try {
            const newTag = await this.tagCreateService.execute(tag, professor);
            return newTag;
        } catch (error) {
            throw new InternalServerErrorException();
        }
    }
}
