import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import mongoose, { Document } from 'mongoose';
import { ProfessorInt } from 'src/domain/users/interfaces/professor.interface';

@Schema()
export class MongooseProfessorDto extends Document implements ProfessorInt {
    @Prop({
        unique: true,
    })
    email: string;

    @Prop()
    name: string;

    @Prop()
    linkedin: string;

    @Prop()
    bio: string;

    @Prop()
    password: string;

    @Prop({
        default: ['user'],
    })
    roles: string[];

    @Prop({
        default: false,
    })
    isBanned: boolean;

    @Prop({
        default: true,
    })
    isActive: boolean;

    @Prop({
        type: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: MongooseProfessorDto.name,
            },
        ],
    })
    @Type(() => MongooseProfessorDto)
    followers: MongooseProfessorDto;

    @Prop({
        type: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: MongooseProfessorDto.name,
            },
        ],
    })
    @Type(() => MongooseProfessorDto)
    followed: MongooseProfessorDto;

    @Prop({
        default: false,
    })
    isVerified: boolean;
}

export const ProfessorSchema =
    SchemaFactory.createForClass(MongooseProfessorDto);
