import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Professor } from 'src/domain/users/professor';

@Schema()
export class MongooseProfessorDto extends Document {
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
}

export const ProfessorSchema =
    SchemaFactory.createForClass(MongooseProfessorDto);
