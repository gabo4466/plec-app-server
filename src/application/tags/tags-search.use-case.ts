import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { TagsSearchService } from 'src/domain/tags/services/tags-search.service';
@Injectable()
export class TagsSearchUseCase {
    constructor(private readonly tagsSearchService: TagsSearchService) {}

    async execute(term: string, offset: number, limit: number) {
        try {
            const tags = await this.tagsSearchService.execute(
                term,
                offset,
                limit,
            );
            return tags;
        } catch (error) {
            throw new InternalServerErrorException();
        }
    }
}
