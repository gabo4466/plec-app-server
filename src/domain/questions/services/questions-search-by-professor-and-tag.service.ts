import { Inject, Injectable } from '@nestjs/common';
import { Tag } from 'src/domain/tags/tag';
import { Professor } from 'src/domain/users/professor';
import { QuestionsRepository } from '../repositories/questions.repository';

@Injectable()
export class QuestionsSearchByProfessorAndTagService {
    constructor(
        @Inject('QuestionsRepository')
        private readonly questionsRepository: QuestionsRepository,
    ) {}

    execute(professor: Professor, tag: Tag, offset: number, limit: number) {
        return this.questionsRepository
            .searchByProfessorAndTag(professor, tag, offset, limit)
            .then((questions) => {
                return questions;
            })
            .catch((error) => {
                throw error;
            });
    }
}
