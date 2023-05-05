import Question from './question';

export class SimpleSelectionQuestion extends Question<string> {
    constructor() {
        super();
        this.type = 'simple-selection';
    }

    public get correctAnswer(): string {
        return this.answers.find((answer) => answer.val === 1).text;
    }
}
