import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({ namespace: '/', cors: true })
export class UserGateway {
  @WebSocketServer()
  server: Server;

  notifyUserCreated(data: any) {
    this.server.emit('notification', data);
  }
}
