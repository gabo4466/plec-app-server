import Question from 'src/domain/questions/question';
export class TrueFalseQuestion extends Question<string> {
    public get type(): string {
        return 'true-fasle';
    }
    public get correctAnswer(): string {
        return this.answers.find((answer) => answer.val === 1).text;
    }
}
