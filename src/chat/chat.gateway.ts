import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from 'socket.io';
import { ChatMessageDTO, ChatRoomDTO } from "../DTO/chat.dto";

@WebSocketGateway( 80, {
    cors: {
        origin: '*'
    }
} )
export class ChatGateway {
    @WebSocketServer() server: Server;

    @SubscribeMessage( 'message' )
    handleMessages( @ConnectedSocket() socket: Socket, @MessageBody() data: ChatMessageDTO ): void {
        this.server.to( data.room ).emit( 'message', data.message );
    }

    @SubscribeMessage( 'events' )
    handleEvents( @MessageBody() message: string ): void {
        this.server.emit( 'message', message );
    }

    @SubscribeMessage( 'join' )
    joinRoom( @ConnectedSocket() socket: Socket, @MessageBody() data: ChatRoomDTO ) {
        socket.join( data.room );
        return {
            event: 'join',
            data: data.room
        }
    }

    @SubscribeMessage( 'leave' )
    leaveRoom( @ConnectedSocket() socket: Socket, @MessageBody() data: ChatRoomDTO ) {
        socket.leave( data.room );
        return {
            event: 'leave',
            data: data.room
        }
    }
}
