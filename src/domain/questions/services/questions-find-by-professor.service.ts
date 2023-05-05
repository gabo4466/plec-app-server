import { Inject } from '@nestjs/common';
import { QuestionsRepository } from '../repositories/questions.repository';
import { Professor } from 'src/domain/users/professor';

export class QuestionsFindByProfessorService {
    constructor(
        @Inject('QuestionsRepository')
        private readonly questionRepository: QuestionsRepository,
    ) {}

    async execute(professor: Professor) {
        return this.questionRepository
            .findByProfessor(professor)
            .then((questions) => {
                return questions;
            })
            .catch((error) => {
                throw error;
            });
    }
}
