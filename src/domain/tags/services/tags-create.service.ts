import { Inject, Injectable } from '@nestjs/common';
import { TagRepository } from '../repositories/tag.repository';
import { Professor } from '../../users/professor';
import { Tag } from '../tag';

@Injectable()
export class TagsCreateService {
    constructor(
        @Inject('TagRepository')
        private readonly tagRepository: TagRepository,
    ) {}

    async execute(tag: Tag, professor: Professor) {
        return this.tagRepository
            .create(tag, professor)
            .then((tagCreated) => {
                return tagCreated;
            })
            .catch((error) => {
                throw error;
            });
    }
}
