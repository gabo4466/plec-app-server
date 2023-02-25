import { AnswerInt } from './interfaces/answer.interface';

export class Answer {
    private _text: string;
    private _val: number;

    public get text(): string {
        return this._text;
    }

    public set text(value: string) {
        this._text = value;
    }

    public get val(): number {
        return this._val;
    }

    public set val(value: number) {
        this._val = value;
    }

    public setDataFromInt(answer: AnswerInt) {
        this.text = answer.text;
        this.val = answer.val;
    }
}
