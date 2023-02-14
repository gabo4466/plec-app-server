import { Inject, Injectable } from '@nestjs/common';
import { TagRepository } from '../repositories/tag.repository';
@Injectable()
export class TagsSearchService {
    constructor(
        @Inject('TagRepository')
        private readonly tagRepository: TagRepository,
    ) {}

    async execute(term: string, offset: number, limit: number) {
        return this.tagRepository
            .search(term, offset, limit)
            .then((tags) => {
                return tags;
            })
            .catch((error) => {
                throw error;
            });
    }
}
