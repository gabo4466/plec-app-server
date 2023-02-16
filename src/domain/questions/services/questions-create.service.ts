import { Injectable, Inject } from '@nestjs/common';
import Question from '../question';
import { QuestionRepository } from '../repositories/question.repository';

@Injectable()
export class QuestionsCreateService {
    constructor(
        @Inject('QuestionRepository')
        private readonly questionRepository: QuestionRepository,
    ) {}

    public async execute(question: Question<any>) {
        return this.questionRepository
            .create(question)
            .then((question) => {
                return question;
            })
            .catch((error) => {
                throw error;
            });
    }
}
