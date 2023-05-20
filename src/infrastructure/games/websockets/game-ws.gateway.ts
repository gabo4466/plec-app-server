import {
    OnGatewayConnection,
    OnGatewayDisconnect,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets';
import { GameWsService } from './game-ws.service';
import { Server, Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'src/domain/users/interfaces/jwt-payload.interface';
import { CreateGameDto } from '../dto/create-game.dto';

@WebSocketGateway({ cors: true })
export class GameWsGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer() wss: Server;

    constructor(
        private readonly gameWsService: GameWsService,
        private readonly jtwService: JwtService,
    ) {}

    async handleConnection(client: Socket) {
        const token = client.handshake.headers.authentication as string;
        const playerId = client.handshake.headers.idplayer as string;

        let payload: JwtPayload;

        if (
            token != null &&
            token.length > 0 &&
            playerId != null &&
            playerId.length > 0
        ) {
            client.disconnect();
            return;
        }
        if (token && token.length > 0) {
            try {
                payload = this.jtwService.verify(token);
                await this.gameWsService.registerProfessor(
                    client,
                    payload.id_user,
                );

                this.wss.emit(
                    'professors-updated',
                    this.gameWsService.getProfessorFullName(),
                );
            } catch (error) {
                console.log(error);
                client.disconnect();
                return;
            }
        } else if (playerId && playerId.length > 0) {
            try {
                await this.gameWsService.registerPlayer(client, playerId);

                // this.wss.emit(
                //     'players-updated',
                //     this.gameWsService.getPlayersFullName(),
                // );
            } catch (error) {
                client.disconnect();
                return;
            }
        } else {
            client.disconnect();
            return;
        }
    }

    handleDisconnect(client: Socket) {
        const token = client.handshake.headers.authentication as string;

        if (token != null && token.length > 0) {
            this.gameWsService.removeProfessor(client.id);
            this.wss.emit(
                'professors-updated',
                this.gameWsService.getConnectedProfessor(),
            );
        } else {
            this.gameWsService.removePlayer(client.id);

            this.wss.emit(
                'players-updated',
                this.gameWsService.getConnectedPlayers(),
            );
        }
    }

    @SubscribeMessage('message-from-professor')
    onProfessorCreateGame(client: Socket, payload: CreateGameDto) {
        const { questionsIds = [], tag = [] } = payload;

        const idGame = this.gameWsService.createGame(
            client.id,
            questionsIds,
            tag,
        );

        client.emit('idGame', { idGame: idGame });

        const professorsNamespace = this.wss.of('/orders');

        professorsNamespace.on('connection', (socket) => {
            socket.join(idGame);
            professorsNamespace.to(idGame).emit('connected', client.id);
        });
    }

    @SubscribeMessage('message-from-players')
    onPlayerJoinGame(client: Socket, idGame: string) {
        console.log(idGame);
        if (!idGame || idGame.length < 1) {
            client.disconnect();
            return;
        }

        const games = this.gameWsService.getGames();

        const userNamespace = this.wss.of('/users');

        if (games.includes(idGame)) {
            this.gameWsService.addPlayerToGame(client, idGame);
            userNamespace.on('connection', (socket) => {
                socket.join(idGame);
                this.wss.emit(
                    'connected',
                    'connected' + client.id + ' ' + idGame,
                );
            });

            this.wss.emit(
                'players-updated',
                this.gameWsService.getPlayersFullNameGame(idGame),
            );
        } else {
            client.disconnect();
        }
    }
}