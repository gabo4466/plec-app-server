import { Injectable, Inject } from '@nestjs/common';
import Question from '../question';
import { QuestionsRepository } from '../repositories/questions.repository';

@Injectable()
export class QuestionsCreateService {
    constructor(
        @Inject('QuestionsRepository')
        private readonly questionRepository: QuestionsRepository,
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
