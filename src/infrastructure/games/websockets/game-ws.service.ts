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
    [id: string]: { socket: Socket; player: Player };
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

    async registerPlayer(
        client: Socket,
        person: { id: string; idGame: string },
    ) {
        const player = await this.playerRepository.findOneByTerm(person.id);

        if (!player) {
            throw new WebSocketException('Player not found');
        }
        this.checkPlayerConnection(player);
        this.connectedPlayer[client.id] = {
            socket: client,
            player: player,
        };
    }
    generateId(): string {
        return Math.random().toString(36).substring(4, 8);
    }
    createGame(professorId: string, questionsIds: string[], tagIds: string[]) {
        const professor = this.connectedProfessor[professorId].professor;
        const gameId = this.generateId();
        const questions = [];
        questionsIds.forEach(async (questionId) => {
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
    addPlayerToGame(client: Socket, player: { id: string; idGame: string }) {
        const game = this.games[player.idGame];
        const playerToAdd = this.connectedPlayer[client.id].player;
        game.player.push(playerToAdd);
    }
    removeProfessor(clientId: string) {
        delete this.connectedProfessor[clientId];
    }

    removePlayer(clientId: string) {
        delete this.connectedPlayer[clientId];
    }

    getGames(): string[] {
        return Object.keys(this.games);
    }
    getConnectedProfessor(): string[] {
        return Object.keys(this.connectedProfessor);
    }
    getConnectedPlayers(): string[] {
        return Object.keys(this.connectedPlayer);
    }

    getProfessor(): ConnectedProfessor {
        return this.connectedProfessor;
    }

    getPlayersFullName() {
        return Object.values(this.connectedPlayer).map((player) => {
            return player.player.nickname;
        });
    }
    getProfessorFullName() {
        return Object.values(this.connectedProfessor).map((professor) => {
            return professor.professor.name;
        });
    }

    private checkProfessorConnection(professor: Professor) {
        let exit: boolean = false;
        let clients: string[] = this.getConnectedProfessor();
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
