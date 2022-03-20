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
    console.log("Message From", socket.id, ":", message);
    const sendingMessage = {
      clientId: socket.id,
      message: message.message,
      sender: message.sender,
      roomId: message.roomId,
    };
    socket.to(message.roomId).emit("message", sendingMessage);
  }
}
