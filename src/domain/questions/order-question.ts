import Question from 'src/domain/questions/question';
export class OrderQuestion extends Question<string[]> {
    public get type(): string {
        return 'order';
    }
    public get correctAnswer(): string[] {
        return this.answers
            .sort((answer1, answer2) => {
                if (answer1.val > answer2.val) {
                    return 1;
                } else if (answer1.val < answer2.val) {
                    return -1;
                } else {
                    return 0;
                }
            })
            .map((answer) => answer.text);
    }
}
