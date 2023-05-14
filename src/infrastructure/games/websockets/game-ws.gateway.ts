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
            id: client.handshake.headers.idPlayer as string,
            idGame: client.handshake.headers.idGame as string,
        };

        let payload: JwtPayload;
        if (token) {
            try {
                payload = this.jtwService.verify(token);
                await this.gameWsService.registerProfessor(
                    client,
                    payload.id_user,
                );
            } catch (error) {
                client.disconnect;
                return;
            }
        } else if (player) {
            try {
                await this.gameWsService.registerPlayer(client, player);
            } catch (error) {
                client.disconnect;
                return;
            }
        } else {
            client.disconnect;
            return;
        }

        console.log(payload);
        console.log(client.id);

        this.wss.emit('clients-updated', {
            clients: this.gameWsService.getConnectedProfessor(),
        });
    }

    handleDisconnect(client: Socket) {
        this.gameWsService.removeClient(client.id);

        this.wss.emit(
            'clients-updated',
            this.gameWsService.getConnectedProfessor(),
        );
    }
}
