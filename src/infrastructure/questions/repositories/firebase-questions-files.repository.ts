import { Injectable } from '@nestjs/common';
import Question from 'src/domain/questions/question';
import { QuestionsFilesRepository } from 'src/domain/questions/repositories/questions-files.repository';
import { getStorage } from 'firebase-admin/storage';

@Injectable()
export class FirebaseQuestionsFilesRepository
    implements QuestionsFilesRepository
{
    async getFile(fileName: string): Promise<Buffer> {
        const storage = getStorage().bucket(process.env.FIRESTORAGE_BUCKET);

        const file = await storage.file(`questions/${fileName}`).download();

        return file[0];
    }

    async uploadFile(
        file: Express.Multer.File,
        question: Question<any>,
    ): Promise<string> {
        const storage = getStorage().bucket(process.env.FIRESTORAGE_BUCKET);

        file.filename = `${question.id}.${file.mimetype.split('/')[1]}`;

        await storage.file(`questions/${file.filename}`).save(file.buffer, {
            contentType: file.mimetype,
        });

        return `${process.env.HOST_API}questions/files/${file.filename}`;
    }
}
