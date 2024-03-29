import { Inject, Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
import { WebSocketException } from './websocket-exception';
import { Professor } from '../../../domain/users/professor';
import { Player } from 'src/domain/users/player';
import { ProfessorRepository } from 'src/domain/users/repositories/professor.repository';
import { PlayerRepository } from 'src/domain/users/repositories/player.repository';
import Question from 'src/domain/questions/question';
import { QuestionsFindByIdService } from 'src/domain/questions/services/questions-find-by-id.service';
import { Tag } from 'src/domain/tags/tag';
import { TagsFindByTermService } from 'src/domain/tags/services/tags-find-by-term.service';
import { SimpleSelectionQuestion } from 'src/domain/questions/simple-selection-question';

interface ConnectedProfessor {
    [id: string]: { socket: Socket; professor: Professor };
}
interface ConnectedPlayer {
    [id: string]: {
        socket: Socket;
        player: Player;
        points: number;
        index: number;
    };
}
interface Games {
    [id: string]: {
        professor: Professor;
        player: Player[];
        questions: Question<any>[];
        tags: Tag[];
    };
}

@Injectable()
export class GameWsService {
    private connectedProfessor: ConnectedProfessor = {};

    private connectedPlayer: ConnectedPlayer = {};

    private games: Games = {};

    constructor(
        @Inject('ProfessorRepository')
        private readonly professorRepository: ProfessorRepository,

        @Inject('PlayerRepository')
        private readonly playerRepository: PlayerRepository,

        private readonly questionsFindByIdService: QuestionsFindByIdService,

        private readonly tagFindByTermService: TagsFindByTermService,
    ) {}

    removePlayerFromGames(socketId: string) {
        // delete player from games
        Object.keys(this.games).forEach((gameId) => {
            this.games[gameId];
            for (
                let index = 0;
                index < this.games[gameId].player.length;
                index++
            ) {
                const element = this.games[gameId].player[index];
                if (
                    element.id.toString() ===
                    this.connectedPlayer[socketId].player.id.toString()
                ) {
                    this.games[gameId].player.splice(index, 1);
                }
            }
        });
    }

    async registerProfessor(client: Socket, personId: string) {
        const professor = await this.professorRepository.findOneByTerm(
            personId,
        );

        if (!professor) {
            throw new WebSocketException('Professor not found');
        }

        if (!professor.isActive) {
            throw new WebSocketException('Professor not active');
        }

        this.checkProfessorConnection(professor);

        this.connectedProfessor[client.id] = {
            socket: client,
            professor: professor,
        };
    }

    async registerPlayer(client: Socket, personId: string) {
        const player = await this.playerRepository.findOneByTerm(personId);

        if (!player) {
            throw new WebSocketException('Player not found');
        }
        this.checkPlayerConnection(player);
        this.connectedPlayer[client.id] = {
            socket: client,
            player: player,
            points: 0,
            index: 0,
        };
    }
    generateId(): string {
        return Math.random().toString(36).substring(4, 8);
    }
    async createGame(
        professorId: string,
        questionsIds: string[],
        tagIds: string[],
    ) {
        const professor = this.connectedProfessor[professorId].professor;
        console.log(professor);
        const gameId = this.generateId();
        const questions = [];
        console.log(questionsIds);
        await questionsIds.forEach(async (questionId) => {
            const question = await this.questionsFindByIdService.execute(
                questionId,
            );
            questions.push(question ? question : new SimpleSelectionQuestion());
        });
        const tags: Tag[] = [];
        tagIds.forEach(async (tagId) => {
            const tag = await this.tagFindByTermService.execute(tagId);
            tags.push(tag ? tag : new Tag());
        });
        this.games[gameId] = {
            professor: professor,
            player: [],
            questions: questions,
            tags: tags,
        };
        return gameId;
    }
    addPlayerToGame(client: Socket, idGame: string) {
        const game = this.games[idGame];
        const playerToAdd = this.connectedPlayer[client.id].player;
        console.log(playerToAdd);
        if (game.player.includes(playerToAdd)) {
            return;
        }

        game.player.push(playerToAdd);
    }

    removeProfessor(clientId: string) {
        delete this.connectedProfessor[clientId];
    }

    removePlayer(clientId: string) {
        delete this.connectedPlayer[clientId];
    }

    getGameId(idGame: string) {
        return this.games[idGame];
    }
    getGameBySocketPlayerId(clientId: string) {
        const player = this.connectedPlayer[clientId].player;

        return Object.values(this.games).find((game) =>
            game.player.find((playerGame) => playerGame.id === player.id),
        );
    }

    async getGameBySocketProfessorId(clientId: string) {
        const professor = this.connectedProfessor[clientId].professor;

        return Object.values(this.games).find(
            (game) => game.professor.id.toString() === professor.id.toString(),
        );
    }
    getGames(): string[] {
        return Object.keys(this.games);
    }
    getConnectedProfessors(): string[] {
        return Object.keys(this.connectedProfessor);
    }
    getConnectedPlayers(): string[] {
        return Object.keys(this.connectedPlayer);
    }

    getProfessorById(id: string) {
        return Object.keys(this.connectedProfessor).find(
            (professor) =>
                this.connectedProfessor[professor].professor.id === id,
        );
    }

    getPlayerBySocketId(id: string) {
        return this.connectedPlayer[id];
    }

    getProfessor(): ConnectedProfessor {
        return this.connectedProfessor;
    }
    getPlayers(): any[] {
        return Object.values(this.connectedPlayer).map((player) => {
            return {
                player: player['player'],
                points: player['points'],
                index: player['index'],
            };
        });
    }

    getPlayersFullName() {
        return Object.values(this.connectedPlayer).map((player) => {
            return player.player.nickname;
        });
    }

    getPlayersFullNameGame(idGame: string): any {
        const game = this.games[idGame];
        return game.player.map((player) => {
            return player.nickname;
        });
    }
    getProfessorFullName() {
        return Object.values(this.connectedProfessor).map((professor) => {
            return professor.professor.name;
        });
    }

    private checkProfessorConnection(professor: Professor) {
        let exit: boolean = false;
        let clients: string[] = this.getConnectedProfessors();
        let counter = 0;
        while (!exit && counter < clients.length) {
            const connectedProfessor =
                this.connectedProfessor[clients[counter]];
            if (
                connectedProfessor.professor.id.toString() ===
                professor.id.toString()
            ) {
                connectedProfessor.socket.disconnect();
                exit = true;
            }
            counter++;
        }
    }

    checkPlayerConnection(player: Player) {
        let exit: boolean = false;
        let clients: string[] = this.getConnectedPlayers();
        let counter = 0;
        while (!exit && counter < clients.length) {
            const connectedPlayer = this.connectedPlayer[clients[counter]];

            if (connectedPlayer.player.id === player.id.toString()) {
                connectedPlayer.socket.disconnect();

                // connectedPlayer.socket.disconnect();
                exit = true;
            }
            counter++;
        }
    }
}
