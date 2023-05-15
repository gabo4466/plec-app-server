import { Inject, Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
import { WebSocketException } from './websocket-exception';
import { Professor } from '../../../domain/users/professor';
import { Player } from 'src/domain/users/player';
import { ProfessorRepository } from 'src/domain/users/repositories/professor.repository';
import { PlayerRepository } from 'src/domain/users/repositories/player.repository';

interface ConnectedProfessor {
    [id: string]: { socket: Socket; professor: Professor };
}
interface ConnectedPlayer {
    [id: string]: { socket: Socket; player: Player };
}

@Injectable()
export class GameWsService {
    private connectedProfessor: ConnectedProfessor = {};

    private connectedPlayer: ConnectedPlayer = {};

    constructor(
        @Inject('ProfessorRepository')
        private readonly professorRepository: ProfessorRepository,

        @Inject('PlayerRepository')
        private readonly playerRepository: PlayerRepository,
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

    removeClient(clientId: string) {
        delete this.connectedProfessor[clientId];
    }

    getConnectedProfessor(): string[] {
        // console.log(this.connectedClients);
        return Object.keys(this.connectedProfessor);
    }
    getConnectedPlayers(): string[] {
        // console.log(this.connectedClients);
        return Object.keys(this.connectedProfessor);
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
        let clients: string[] = Object.keys(this.connectedProfessor);
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
        let clients: string[] = Object.keys(this.connectedPlayer);
        let counter = 0;
        while (!exit && counter < clients.length) {
            const connectedPlayer = this.connectedPlayer[clients[counter]];

            if (connectedPlayer.player.id.toString() === player.id.toString()) {
                connectedPlayer.socket.disconnect();
                exit = true;
            }
            counter++;
        }
    }
}
