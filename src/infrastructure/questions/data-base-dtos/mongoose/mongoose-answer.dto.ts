import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class MongooseAnswerDto {
    @Prop()
    public text: string;
    @Prop()
    public val: number;
}

export const AnswerSchema = SchemaFactory.createForClass(MongooseAnswerDto);
