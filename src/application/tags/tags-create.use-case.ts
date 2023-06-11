import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Tag } from 'src/domain/tags/tag';
import { Professor } from 'src/domain/users/professor';
import { TagsCreateService } from '../../domain/tags/services/tags-create.service';
import { TagException } from 'src/domain/tags/exceptions/tag.exception';
import { TagsFindByTermService } from '../../domain/tags/services/tags-find-by-term.service';

@Injectable()
export class TagsCreateUseCase {
    constructor(
        private readonly tagCreateService: TagsCreateService,
        private readonly tagsFindByTermService: TagsFindByTermService,
    ) {}

    async execute(tag: Tag, professor: Professor) {
        try {
            if (await this.tagsFindByTermService.execute(tag.name)) {
                throw new TagException(1);
            }

            const newTag = await this.tagCreateService.execute(tag, professor);
            return newTag;
        } catch (error) {
            if (error instanceof TagException) {
                error.manageException();
            } else {
                throw new InternalServerErrorException();
            }
        }
    }
}
