import { Player } from '../users/player';

export class Game {
    public _id: string;

    public isFinished: boolean;

    public players: Player[];

    public points: {
        [playerId: string]: number;
    };

    public dateCreated: Date;
}
