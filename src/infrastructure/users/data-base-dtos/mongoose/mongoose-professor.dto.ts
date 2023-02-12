import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Professor } from '../../../../domain/users/professor';

@Schema()
export class MongooseProfessorDto extends Document {
    email: string;
    name: string;
    linkedin: string;
    bio: string;
    password: string;
}

const ProfessorScheme = SchemaFactory.createForClass(MongooseProfessorDto);
