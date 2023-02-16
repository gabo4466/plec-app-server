import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AnswerInt } from 'src/domain/questions/interfaces/answer.interface';

@Schema()
export class MongooseAnswerDto implements AnswerInt {
    @Prop()
    public text: string;
    @Prop()
    public val: number;
}

export const AnswerSchema = SchemaFactory.createForClass(MongooseAnswerDto);
