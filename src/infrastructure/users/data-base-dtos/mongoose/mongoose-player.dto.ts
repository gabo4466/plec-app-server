import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import mongoose, { Document } from 'mongoose';

@Schema()
export class MongoosePlayerDto {
    @Prop({
        unique: true,
    })
    email: string;

    @Prop()
    nickname: string;

    // @Prop({
    //     default: 0,
    // })
    // experience: number;
}

export const PlayerSchema = SchemaFactory.createForClass(MongoosePlayerDto);
