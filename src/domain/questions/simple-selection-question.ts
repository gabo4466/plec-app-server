import Question from './question';

export class SimpleSelectionQuestion extends Question<string> {
    public get correctAnswer(): string {
        return this.answers.find((answer) => answer.val === 1).text;
    }

    public get type(): string {
        return 'simple-selection';
    }
}
