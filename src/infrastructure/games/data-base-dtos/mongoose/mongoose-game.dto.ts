import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import mongoose, { Document } from 'mongoose';
import { MongooseProfessorDto } from 'src/infrastructure/users/data-base-dtos/mongoose/mongoose-professor.dto';
import { MongoosePlayerDto } from '../../../users/data-base-dtos/mongoose/mongoose-player.dto';

@Schema()
export class MongooseGameDto extends Document {
    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        ref: MongooseProfessorDto.name,
    })
    @Type(() => MongooseProfessorDto)
    professor: MongooseProfessorDto;

    @Prop({
        default: new Date(),
    })
    dateCreated: Date;

    @Prop({
        type: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: MongoosePlayerDto.name,
            },
        ],
    })
    @Type(() => MongoosePlayerDto)
    players: MongoosePlayerDto;
}

export const GameSchema = SchemaFactory.createForClass(MongooseGameDto);
