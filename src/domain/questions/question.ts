import { Answer } from './answer';
import { QuestionInt } from 'src/domain/questions/interfaces/question.interface';
import { Professor } from '../users/professor';
import { Tag } from '../tags/tag';

export default abstract class Question<T> {
    private _id: string;
    public description: string;
    public image: string;
    public answers: Answer[];
    public tags: Tag[];
    public difficulty: number;
    public professor: Professor;

    public get id(): string {
        return this._id;
    }

    public abstract get type(): string;

    public abstract get correctAnswer(): T;

    public setDataFromInt(question: QuestionInt) {
        if (question._id) {
            this._id = question._id;
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
            this.tags = question.tags.map((tag) => {
                const newTag = new Tag();
                newTag.setDataFromInt(tag);
                return newTag;
            });
        }

        if (question.difficulty) {
            this.difficulty = question.difficulty;
        }

        if (question.professor) {
            this.professor = new Professor();
            this.professor.setDataFromInt(question.professor);
        }
    }
}
