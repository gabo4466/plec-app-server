import { AnswerInt } from './interfaces/answer.interface';

export class Answer {
    public text: string;
    public val: number;

    public setDataFromInt(answer: AnswerInt) {
        this.text = answer.text;
        this.val = answer.val;
    }
}
