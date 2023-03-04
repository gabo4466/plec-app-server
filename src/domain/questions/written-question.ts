import Question from 'src/domain/questions/question';
export class WrittenQuestion extends Question<string> {
    constructor() {
        super();
        this.type = 'written';
    }
    public get correctAnswer(): string {
        return this.answers[0].text;
    }
}
