import { Player } from 'src/domain/users/player';
import { Professor } from 'src/domain/users/professor';

export interface GameInt {
    _id?: string;

    questions: string[];

    professor: Professor;

    isFinished: boolean;

    players: Player[];

    points: {
        [playerId: string]: number;
    };

    dateCreated: Date;
}
