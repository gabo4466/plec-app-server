import Question from 'src/domain/questions/question';
export class OfftopicQuestion extends Question<string> {
    constructor() {
        super();
        this.type = 'offtopic';
    }

    public get correctAnswer(): string {
        return this.answers.find((answer) => answer.val === 1).text;
    }
}
