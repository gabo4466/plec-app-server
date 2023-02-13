import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ProfessorInt } from '../../../../domain/users/interfaces/professor.interface';

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
}

export const ProfessorSchema =
    SchemaFactory.createForClass(MongooseProfessorDto);
