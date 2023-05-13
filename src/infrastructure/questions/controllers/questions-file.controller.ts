import {
    BadRequestException,
    Controller,
    Get,
    Param,
    Post,
    Res,
    UploadedFile,
    UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Professor } from 'src/domain/users/professor';
import { Auth } from 'src/infrastructure/users/decorators/auth.decorator';
import { GetUser } from 'src/infrastructure/users/decorators/get-user.decorator';
import { fileFilter } from '../helpers/file-filter.helper';
import { QuestionUploadFileUseCase } from '../../../application/questions/question-upload-file.use-case';
import { QuestionGetFileUseCase } from 'src/application/questions/question-get-file.use-case';
import { Response } from 'express';
@Controller('questions/files')
export class QuestionsFileController {
    constructor(
        private readonly questionUploadFileUseCase: QuestionUploadFileUseCase,
        private readonly questionGetFileUseCase: QuestionGetFileUseCase,
    ) {}

    @Post(':questionId')
    @Auth()
    @UseInterceptors(
        FileInterceptor('file', {
            fileFilter: fileFilter,
        }),
    )
    async uploadFile(
        @UploadedFile() file: Express.Multer.File,
        @GetUser() user: Professor,
        @Param('questionId') questionId: string,
    ) {
        if (!file) {
            throw new BadRequestException(`File is required`);
        }
        return this.questionUploadFileUseCase.execute(file, user, questionId);
    }

    @Get(':filename')
    async getFile(@Param('filename') filename: string, @Res() res: Response) {
        return await this.questionGetFileUseCase.execute(filename, res);
    }
}
