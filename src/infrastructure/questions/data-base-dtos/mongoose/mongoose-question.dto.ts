import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { AnswerSchema, MongooseAnswerDto } from './mongoose-answer.dto';
import { QuestionInt } from 'src/domain/questions/interfaces/question.interface';
import { MongooseProfessorDto } from 'src/infrastructure/users/data-base-dtos/mongoose/mongoose-professor.dto';
import { Type } from 'class-transformer';
import { MongooseTagDto } from 'src/infrastructure/tags/data-base-dtos/mongoose/mongoose-tag.dto';

@Schema()
export class MongooseQuestionDto extends Document {
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
                type: AnswerSchema,
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

    @Prop({
        type: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: MongooseTagDto.name,
            },
        ],
    })
    @Type(() => MongooseTagDto)
    tags: MongooseTagDto[];

    @Prop()
    type: string;
}

export const QuestionSchema = SchemaFactory.createForClass(MongooseQuestionDto);
