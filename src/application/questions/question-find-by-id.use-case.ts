import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { QuestionsException } from 'src/domain/questions/exceptions/QuestionsException';
import { QuestionsFindByIdService } from 'src/domain/questions/services/questions-find-by-id.service';

@Injectable()
export class QuestionFindByIdUseCase {
    constructor(
        private readonly questionFindByIdService: QuestionsFindByIdService,
    ) {}

    public async execute(id: string) {
        try {
            const question = await this.questionFindByIdService.execute(id);
            return question;
        } catch (error) {
            if (error instanceof QuestionsException) {
                error.manageException();
            } else {
                throw new InternalServerErrorException();
            }
        }
    }
}
