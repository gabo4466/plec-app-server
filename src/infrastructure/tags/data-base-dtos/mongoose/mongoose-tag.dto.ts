import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import mongoose, { Document } from 'mongoose';
import { TagInt } from 'src/domain/tags/interfaces/tag.interface';
import { MongooseProfessorDto } from '../../../users/data-base-dtos/mongoose/mongoose-professor.dto';

@Schema()
export class MongooseTagDto extends Document implements TagInt {
    @Prop()
    name: string;
    @Prop()
    color: string;

    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        ref: MongooseProfessorDto.name,
    })
    @Type(() => MongooseProfessorDto)
    professor: MongooseProfessorDto;
}

export const TagSchema = SchemaFactory.createForClass(MongooseTagDto);
