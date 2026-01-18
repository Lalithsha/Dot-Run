import { Server, Socket } from 'socket.io';
import { Server as HttpServer } from 'http';
import path from 'path';

const createWsServer = (httpServer: HttpServer) => {
  const io = new Server(httpServer, {
    cors: {
      origin: 'http://localhost:3000',
      methods: ['GET', 'POST'],
      credentials: true,
    },
  });

  io.on('connection', async socket => {
    console.log('a user connected');
    // Auth checks should happen here

    const host = socket.handshake.headers.host;
    if (!host) {
      return socket.disconnect();
    }
    // const userId = await getUserIdFromHost(host);
    // if (!userId) {
    //   return socket.disconnect();
    // }
    // store socket id in the database

    socket.emit('loaded', {
      rootContent: await fetchDir('/workspace', ''),
    });
  });
};

export default createWsServer;
