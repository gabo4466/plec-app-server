import Question from '../question';

export interface QuestionsFilesRepository {
    uploadFile(
        file: Express.Multer.File,
        question: Question<any>,
        fileName: string,
    ): Promise<string>;

    getFile(fileName: string): Promise<Buffer>;
}
