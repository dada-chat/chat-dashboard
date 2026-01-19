import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export const getDashboardSocket = () => {
  if (!socket) {
    socket = io(process.env.NEXT_PUBLIC_SOCKET_URL, {
      transports: ["websocket"],
      withCredentials: false,
    });
  }
  return socket;
};

export const disconnectDashboardSocket = () => {
  if (socket) {
    console.log("[Socket] 소켓 연결 해제");
    socket.disconnect();
    socket = null;
  }
};
