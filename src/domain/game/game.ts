import { Player } from '../users/player';
import { Professor } from '../users/professor';
import { GameInt } from './interfaces/game.interface';

export class Game {
    public _id: string;

    public questions: string[];

    public professor: Professor;
    public isFinished: boolean;

    public players: Player[];

    public points: {
        [playerId: string]: number;
    };

    public dateCreated: Date;

    setDataFromInt(game: GameInt) {
        if (game._id) {
            this._id = game._id;
        }
        if (game.questions) {
            this.questions = game.questions;
        }
        if (game.professor) {
            this.professor = game.professor;
        }
        if (game.isFinished !== undefined) {
            this.isFinished = game.isFinished;
        }
        if (game.players) {
            this.players = game.players;
        }
        if (game.points) {
            this.points = game.points;
        }
        if (game.dateCreated) {
            this.dateCreated = game.dateCreated;
        }
    }
}
