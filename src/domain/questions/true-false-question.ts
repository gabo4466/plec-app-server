import Question from 'src/domain/questions/question';
export class TrueFalseQuestion extends Question<string> {
    constructor() {
        super();
        this.type = 'true-false';
    }
    public get correctAnswer(): string {
        return this.answers.find((answer) => answer.val === 1).text;
    }
}
