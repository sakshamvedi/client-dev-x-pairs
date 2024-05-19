import { io } from 'socket.io-client';

let socket;

export const getSocket = () => {
    if (!socket) {
        socket = io('https://sever-dev-x-pairs-real-time-server-1.onrender.com/', { transports: ['websocket'] });
    }
    return socket;
};
