import { Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { MongooseAnswerDto } from './mongoose-answer.dto';
import { QuestionInt } from 'src/domain/questions/interfaces/question.interface';
import { MongooseProfessorDto } from 'src/infrastructure/users/data-base-dtos/mongoose/mongoose-professor.dto';
import { Type } from 'class-transformer';

export class MongooseQuestionDto extends Document implements QuestionInt {
    @Prop({
        default: false,
    })
    verified: boolean;

    @Prop()
    description: string;

    @Prop()
    image: string;

    @Prop()
    difficulty: number;

    @Prop({
        type: [
            {
                type: MongooseAnswerDto,
            },
        ],
    })
    answers: MongooseAnswerDto[];

    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        ref: MongooseProfessorDto.name,
    })
    @Type(() => MongooseProfessorDto)
    professor: MongooseProfessorDto;
}

export const QuestionSchema = SchemaFactory.createForClass(MongooseQuestionDto);
