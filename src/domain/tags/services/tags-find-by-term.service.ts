import { Inject } from '@nestjs/common';
import { TagRepository } from 'src/domain/tags/repositories/tag.repository';
import { Tag } from '../tag';

export class TagsFindByTermService {
    constructor(
        @Inject('TagRepository')
        private readonly tagRepository: TagRepository,
    ) {}

    public async execute(term: string) {
        return this.tagRepository
            .findOneByTerm(term)
            .then((tag) => {
                return tag;
            })
            .catch((error) => {
                if (error) {
                    throw error;
                }
                return new Tag();
            });
    }
}
