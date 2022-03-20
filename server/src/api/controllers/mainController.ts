import {
  ConnectedSocket,
  MessageBody,
  OnConnect,
  OnDisconnect,
  OnMessage,
  SocketController,
  SocketIO,
} from "socket-controllers";
import { Server, Socket } from "socket.io";
import { RoomController } from "./roomController";

@SocketController()
export class MainController {
  @OnConnect()
  public onConnection(
    @ConnectedSocket() socket: Socket,
    @SocketIO() io: Server
  ): any {
    socket.emit("connection", {
      message: "connected",
      clientId: socket.id,
    });
    console.log("client " + socket.id + " connected");
  }

  @OnDisconnect()
  public onDisconecction(
    @ConnectedSocket() socket: Socket,
    @SocketIO() io: Server
  ): void {
    console.log("client " + socket.id + " disconnected");
  }
}
