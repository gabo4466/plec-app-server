import { Answer } from './answer';

export default abstract class Question<T> {
    private _id: number;
    private _description: string;
    private _image: string;
    private _answers: Answer[];

    public get id(): number {
        return this._id;
    }

    public set id(value: number) {
        this._id = value;
    }

    public get description(): string {
        return this._description;
    }

    public set description(value: string) {
        this._description = value;
    }

    public get image(): string {
        return this._image;
    }

    public set image(value: string) {
        this._image = value;
    }

    public get answers(): Answer[] {
        return this._answers;
    }

    public set answers(value: Answer[]) {
        this._answers = value;
    }

    public abstract get type(): string;

    public abstract get correctAnswer(): T;
}
