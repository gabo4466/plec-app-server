import Question from './question';

export class MultipleSelectionQuestion extends Question<string[]> {
    public get correctAnswer(): string[] {
        return this.answers
            .filter((answer) => answer.val === 1)
            .map((answer) => answer.text);
    }

    public get type(): string {
        return 'multiple-selection';
    }
}
