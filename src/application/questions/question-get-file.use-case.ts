import {
    Inject,
    Injectable,
    InternalServerErrorException,
} from '@nestjs/common';
import { Response } from 'express';
import { QuestionsFilesRepository } from 'src/domain/questions/repositories/questions-files.repository';

@Injectable()
export class QuestionGetFileUseCase {
    constructor(
        @Inject('QuestionsFilesRepository')
        private readonly questionsFilesRepository: QuestionsFilesRepository,
    ) {}

    async execute(filename: string, res: Response) {
        try {
            const buffer = await this.questionsFilesRepository.getFile(
                filename,
            );
            res.writeHead(200, {
                'Content-Type': `image/${filename.split('.')[1]}`,
            });
            res.end(buffer, 'binary');
        } catch (error) {
            throw new InternalServerErrorException();
        }
    }
}
