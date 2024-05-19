import { io } from 'socket.io-client';

let socket;

export const getSocket = () => {
    if (!socket) {
        socket = io('https://master--code-pairs.netlify.app/room', { transports: ['websocket'] });
    }
    return socket;
};
