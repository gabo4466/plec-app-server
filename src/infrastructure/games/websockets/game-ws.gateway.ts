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
import { WebSocketException } from './websocket-exception';
import { StartGameDto } from '../dto/start-game.dto';

@WebSocketGateway({ cors: true })
export class GameWsGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer() wss: Server;

    constructor(
        private readonly gameWsService: GameWsService,
        private readonly jtwService: JwtService,
    ) {}

    async handleConnection(client: Socket) {
        const token = client.handshake.headers.authentication as string;
        const player = {
            id: client.handshake.headers.idplayer as string,
            idGame: client.handshake.headers.idgame as string,
        };
        let payload: JwtPayload;

        if (
            token != null &&
            token.length > 0 &&
            player.id != null &&
            player.id.length > 0 &&
            player.idGame != null &&
            player.idGame.length > 0
        ) {
            client.disconnect();
            return;
        }
        if (token != null && token.length > 0) {
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
        } else if (
            player.id != null &&
            player.id.length > 0 &&
            player.idGame != null &&
            player.idGame.length > 0
        ) {
            try {
                await this.gameWsService.registerPlayer(client, player);

                this.wss.emit(
                    'players-updated',
                    this.gameWsService.getPlayersFullName(),
                );
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
    generateId = () => Math.random().toString(36).substring(4, 8);

    @SubscribeMessage('message-from-client')
    onMessageFromClient(client: Socket, payload: StartGameDto) {
        client.emit('idGame', { idGame: this.generateId() });
    }
}
