import {
    BadRequestException,
    Inject,
    Injectable,
    InternalServerErrorException,
} from '@nestjs/common';
import { QuestionsFilesRepository } from 'src/domain/questions/repositories/questions-files.repository';
import { QuestionsRepository } from 'src/domain/questions/repositories/questions.repository';
import { Professor } from 'src/domain/users/professor';
import { QuestionFindByIdUseCase } from './question-find-by-id.use-case';

@Injectable()
export class QuestionUploadFileUseCase {
    constructor(
        @Inject('QuestionsRepository')
        private readonly questionsRepository: QuestionsRepository,
        @Inject('QuestionsFilesRepository')
        private readonly questionsFilesRepository: QuestionsFilesRepository,
        private readonly questionFindByIdUseCase: QuestionFindByIdUseCase,
    ) {}

    async execute(
        file: Express.Multer.File,
        user: Professor,
        questionId: string,
    ) {
        const question = await this.questionFindByIdUseCase.execute(questionId);

        if (`${question.professor.id}` !== `${user.id}`) {
            throw new BadRequestException(
                'You are not the owner of this question',
            );
        }
        try {
            const url = await this.questionsFilesRepository.uploadFile(
                file,
                question,
                question.id,
            );
            question.image = url;
            await this.questionsRepository.update(question);
            return url;
        } catch (error) {
            if (error) {
                throw error;
            }
            throw new InternalServerErrorException();
        }
    }
}
