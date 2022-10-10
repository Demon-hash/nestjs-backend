import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server } from 'socket.io';

@WebSocketGateway( 80, {
    cors: {
        origin: '*'
    }
} )
export class ChatGateway {
    @WebSocketServer() server: Server;

    @SubscribeMessage( 'message' )
    handleMessages( @MessageBody() message: string ): void {
        this.server.emit( 'message', message );
    }

    @SubscribeMessage( 'events' )
    handleEvents( @MessageBody() message: string ): void {
        this.server.emit( 'message', message );
    }
}
