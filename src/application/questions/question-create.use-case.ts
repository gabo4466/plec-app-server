import { Injectable } from '@nestjs/common';
import Question from 'src/domain/questions/question';
import { Professor } from 'src/domain/users/professor';

@Injectable()
export class QuestionCreateUseCase {
    constructor() {}

    public async execute(question: Question<any>, professor: Professor) {
        return 'Hello World!';
    }
}
