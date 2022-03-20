import { useSocketServer } from "socket-controllers";
import { Server } from "socket.io";
import { ChatController } from "./api/controllers/chatController";
import { MainController } from "./api/controllers/mainController";
import { RoomController } from "./api/controllers/roomController";

export default (httpServer) => {
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
    },
  });

  useSocketServer(io, {
    controllers: [MainController, RoomController, ChatController],
  });

  return io;
};
