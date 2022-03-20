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

@SocketController()
export class MainController {
  @OnConnect()
  public onConnection(
    @ConnectedSocket() socket: Socket,
    @SocketIO() io: Server
  ): any {
    socket.emit(
      "connection",
      "Connected To Socket Server : client id " + socket.id
    );
    console.log("New connection : " + socket.id);
  }

  @OnDisconnect()
  public onDisconecction(): void {
    console.log("Disconnected");
  }
}
