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
    const sendMessage = {
        message: message.message,
        sender: socket.id,
    }
    if (message.roomId) {
      socket.broadcast.to(message.roomId).emit("message", sendMessage);
    } else {
      socket.broadcast.emit("message", sendMessage);
    }
  }
}
