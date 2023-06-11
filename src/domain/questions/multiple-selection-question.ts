import Question from './question';

export class MultipleSelectionQuestion extends Question<string[]> {
    constructor() {
        super();
        this.type = 'multiple-selection';
    }

    public get correctAnswer(): string[] {
        return this.answers
            .filter((answer) => answer.val === 1)
            .map((answer) => answer.text);
    }
}
