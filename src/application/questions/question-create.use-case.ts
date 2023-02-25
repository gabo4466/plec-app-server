import { Injectable, InternalServerErrorException } from '@nestjs/common';
import Question from 'src/domain/questions/question';
import { QuestionsCreateService } from 'src/domain/questions/services/questions-create.service';

@Injectable()
export class QuestionCreateUseCase {
    constructor(
        private readonly questionCreateService: QuestionsCreateService,
    ) {}

    public async execute(question: Question<any>) {
        try {
            const questionCreated = await this.questionCreateService.execute(
                question,
            );
            return questionCreated;
        } catch (error) {
            throw new InternalServerErrorException();
        }
    }
}
