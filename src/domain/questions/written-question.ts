import Question from 'src/domain/questions/question';
export class WrittenQuestion extends Question<string> {
    public get type(): string {
        return 'written';
    }
    public get correctAnswer(): string {
        return this.answers[0].text;
    }
}
