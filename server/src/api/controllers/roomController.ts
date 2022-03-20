import {
  ConnectedSocket,
  MessageBody,
  OnMessage,
  SocketController,
  SocketIO,
} from "socket-controllers";
import { Server, Socket } from "socket.io";

@SocketController()
export class RoomController {
  @OnMessage("join_room")
  public joinRoom(
    @SocketIO() io: Server,
    @ConnectedSocket() socket: Socket,
    @MessageBody() message: any
  ): void {
    socket.join(message.roomId);
    socket.broadcast.to(message.roomId).emit("joined_room", {
      type: "system",
      sender: "system",
      clientId: socket.id,
      roomId: message.roomId,
    });
  }

  @OnMessage("leave_room")
  public leaveRoom(
    @ConnectedSocket() socket: Socket,
    @MessageBody() message: any
  ) {
    socket.leave(message.roomId);
    socket.broadcast.to(message.roomId).emit("leaved_room", {
      type: "system",
      clientId: socket.id,
      roomId: message.roomId,
    });
  }
}
