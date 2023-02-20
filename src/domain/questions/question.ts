import { Answer } from './answer';
import { QuestionInt } from 'src/domain/questions/interfaces/question.interface';
import { Professor } from '../users/professor';

export default abstract class Question<T> {
    private _id: number;
    private _description: string;
    private _image: string;
    private _answers: Answer[];
    private _tagsIds: string[];
    private _difficulty: number;
    private _professor: Professor;

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

    public get professor(): Professor {
        return this._professor;
    }

    public setProfessor(professor: Professor) {
        this._professor = professor;
    }

    public abstract get type(): string;

    public abstract get correctAnswer(): T;

    public setDataFromInt(question: QuestionInt) {
        if (question._id) {
            this.id = question._id;
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

        if (question.professor) {
            this._professor = new Professor();
            this._professor.setDataFromInt(question.professor);
        }
    }
}
