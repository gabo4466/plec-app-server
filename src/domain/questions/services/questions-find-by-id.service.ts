import { Inject, Injectable } from '@nestjs/common';
import { QuestionsException } from '../exceptions/QuestionsException';
import { QuestionsRepository } from '../repositories/questions.repository';

@Injectable()
export class QuestionsFindByIdService {
    constructor(
        @Inject('QuestionsRepository')
        private readonly questionsRepository: QuestionsRepository,
    ) {}

    async execute(id: string) {
        return this.questionsRepository
            .findOneByTerm(id)
            .then((question) => {
                return question;
            })
            .catch((error) => {
                if (error) {
                    throw error;
                } else {
                    throw new QuestionsException(2);
                }
            });
    }
}
