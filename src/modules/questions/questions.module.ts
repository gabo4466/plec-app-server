import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
    MongooseQuestionDto,
    QuestionSchema,
} from 'src/infrastructure/questions/data-base-dtos/mongoose/mongoose-question.dto';
import { MongooseQuestionRepository } from 'src/infrastructure/questions/repositories/mongoose-question.repository';
import { QuestionsController } from '../../infrastructure/questions/controllers/questions.controller';
import { UsersModule } from '../users/users.module';
import { QuestionCreateUseCase } from 'src/application/questions/question-create.use-case';
import { QuestionsCreateService } from 'src/domain/questions/services/questions-create.service';
import { TagsModule } from '../tags/tags.module';
import { QuestionFindByIdUseCase } from 'src/application/questions/question-find-by-id.use-case';
import { QuestionsFindByIdService } from 'src/domain/questions/services/questions-find-by-id.service';
import { FirebaseQuestionsFilesRepository } from 'src/infrastructure/questions/repositories/firebase-questions-files.repository';
import { QuestionsFileController } from 'src/infrastructure/questions/controllers/questions-file.controller';
import { QuestionUploadFileUseCase } from 'src/application/questions/question-upload-file.use-case';
import { QuestionGetFileUseCase } from 'src/application/questions/question-get-file.use-case';
import { QuestionSearchUseCase } from 'src/application/questions/question-search.use-case';
import { QuestionsSearchByProfessorAndTagService } from 'src/domain/questions/services/questions-search-by-professor-and-tag.service';
import { QuestionsFindByProfessorService } from 'src/domain/questions/services/questions-find-by-professor.service';

@Module({
    controllers: [QuestionsController, QuestionsFileController],
    imports: [
        MongooseModule.forFeature([
            // {
            //     name: MongooseAnswerDto.name,
            //     schema: AnswerSchema,
            // },
            {
                name: MongooseQuestionDto.name,
                schema: QuestionSchema,
                collection: 'questions',
            },
        ]),
        UsersModule,
        TagsModule,
    ],
    providers: [
        // Repositories
        {
            provide: 'QuestionsRepository',
            useClass: MongooseQuestionRepository,
        },
        {
            provide: 'QuestionsFilesRepository',
            useClass: FirebaseQuestionsFilesRepository,
        },

        // Services
        QuestionsCreateService,
        QuestionsFindByIdService,
        QuestionsSearchByProfessorAndTagService,
        QuestionsFindByProfessorService,

        // UseCases
        QuestionCreateUseCase,
        QuestionFindByIdUseCase,
        QuestionUploadFileUseCase,
        QuestionGetFileUseCase,
        QuestionSearchUseCase,
    ],
    exports: [
        'QuestionsRepository',
        'QuestionsFilesRepository',
        QuestionFindByIdUseCase,
        QuestionsFindByProfessorService,
    ],
})
export class QuestionsModule {}
