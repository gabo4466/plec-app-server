import { AnswerInt } from './answer.interface';

export interface QuestionInt {
    id?: number;
    description?: string;
    answers?: AnswerInt[];
    type?: string;
    image?: string;
    tags?: string[];
    difficulty?: number;
}
