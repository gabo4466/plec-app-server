import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MongooseQuestionDto } from 'src/infrastructure/questions/data-base-dtos/mongoose/mongoose-question.dto';
import {
    AnswerSchema,
    MongooseAnswerDto,
} from 'src/infrastructure/questions/data-base-dtos/mongoose/mongoose-answer.dto';
import { MongooseQuestionRepository } from 'src/infrastructure/questions/repositories/mongoose-question.repository';
import { QuestionsController } from '../../infrastructure/questions/controllers/questions.controller';
import { UsersModule } from '../users/users.module';

@Module({
    controllers: [QuestionsController],
    imports: [
        MongooseModule.forFeature([
            {
                name: MongooseAnswerDto.name,
                schema: AnswerSchema,
            },
            {
                name: MongooseQuestionDto.name,
                schema: AnswerSchema,
                collection: 'questions',
            },
        ]),
        UsersModule,
    ],
    providers: [
        // Repositories

        {
            provide: 'QuestionRepository',
            useClass: MongooseQuestionRepository,
        },

        // Services

        // UseCases
    ],
    exports: ['QuestionRepository'],
})
export class QuestionsModule {}
