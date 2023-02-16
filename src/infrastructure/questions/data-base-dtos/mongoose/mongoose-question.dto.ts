import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { MongooseAnswerDto } from './mongoose-answer.dto';

export class MongooseQuestionDto extends Document {
    @Prop({
        default: false,
    })
    verified: boolean;

    @Prop()
    description: string;

    @Prop()
    image: string;

    @Prop({
        type: [
            {
                type: MongooseAnswerDto,
            },
        ],
    })
    answers: MongooseAnswerDto[];
}

export const QuestionSchema = SchemaFactory.createForClass(MongooseQuestionDto);
