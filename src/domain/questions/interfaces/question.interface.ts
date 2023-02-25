import { TagInt } from 'src/domain/tags/interfaces/tag.interface';
import { ProfessorInt } from 'src/domain/users/interfaces/professor.interface';
import { AnswerInt } from './answer.interface';

export interface QuestionInt {
    _id?: number;
    description?: string;
    answers?: AnswerInt[];
    type?: string;
    image?: string;
    tags?: TagInt[];
    difficulty?: number;
    professor?: ProfessorInt;
}
