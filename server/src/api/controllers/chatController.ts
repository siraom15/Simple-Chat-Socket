import {
  ConnectedSocket,
  MessageBody,
  OnMessage,
  SocketController,
  SocketIO,
} from "socket-controllers";
import { Server, Socket } from "socket.io";

@SocketController()
export class ChatController {
  @OnMessage("message")
  public message(
    @SocketIO() io: Server,
    @ConnectedSocket() socket: Socket,
    @MessageBody() message: any
  ) {
    const sendingMessage = {
      clientId: socket.id,
      ...message,
    };
    socket.broadcast.to(message.roomId).emit("message", sendingMessage);
  }
}
