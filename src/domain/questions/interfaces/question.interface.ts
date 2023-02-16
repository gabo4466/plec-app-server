import { ProfessorInt } from 'src/domain/users/interfaces/professor.interface';
import { AnswerInt } from './answer.interface';

export interface QuestionInt {
    _id?: number;
    description?: string;
    answers?: AnswerInt[];
    type?: string;
    image?: string;
    tags?: string[];
    difficulty?: number;
    professor?: ProfessorInt;
}
