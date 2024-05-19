import React, { useEffect } from 'react';
import { io } from 'socket.io-client';
import { useRecoilState } from 'recoil';
import { socketIdState } from './socketIdState';

const SocketProvider = ({ children }) => {
    const [socketId, setSocketId] = useRecoilState(socketIdState);

    useEffect(() => {
        const socket = io('http://localhost:3001', { transports: ['websocket'] });

        socket.on('connect', () => {
            setSocketId(socket.id);
        });

        return () => {
            socket.disconnect();
        };
    }, [setSocketId]);

    return (
        <>{children}</>
    );
};

export default SocketProvider;
