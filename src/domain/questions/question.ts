import { Answer } from './answer';
import { QuestionInt } from 'src/domain/questions/interfaces/question.interface';

export default abstract class Question<T> {
    private _id: number;
    private _description: string;
    private _image: string;
    private _answers: Answer[];
    private _tagsIds: string[];
    private _difficulty: number;

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

    public get tagsIds(): string[] {
        return this._tagsIds;
    }

    public set tagsIds(value: string[]) {
        this._tagsIds = value;
    }

    public get difficulty(): number {
        return this._difficulty;
    }

    public set difficulty(value: number) {
        this._difficulty = value;
    }

    public abstract get type(): string;

    public abstract get correctAnswer(): T;

    public setDataFromInt(question: QuestionInt) {
        if (question.id) {
            this.id = question.id;
        }
        if (question.description) {
            this.description = question.description;
        }
        if (question.image) {
            this.image = question.image;
        }
        if (question.answers) {
            this.answers = question.answers.map((answer) => {
                const newAnswer = new Answer();
                newAnswer.setDataFromInt(answer);
                return newAnswer;
            });
        }
        if (question.tags) {
            this.tagsIds = question.tags;
        }

        if (question.difficulty) {
            this.difficulty = question.difficulty;
        }
    }
}
