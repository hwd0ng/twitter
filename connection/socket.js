import { Server } from 'socket.io';
import jwt from 'jsonwebtoken';
import { config } from '../config.js'

class Socket {
    constructor(server) {
        this.io = new Server(server, {
            cor: {
                origin: '*'      // 리액트는 3000, 로컬은 8080
            }
        })

        this.io.use((socket, next) => {
            const token = socket.handshake.auth.token;
            if(!token){
                return next(new Error('인증 에러1'));
            }
            jwt.verify(token, congfig.jwt.secretKey, (error, decoded) => {
                if(error){
                    return next(new Error('인증 에러2'))
                }
                next();
            })
        })
        this.io.on('connection', (socket) => {
            console.log('클라이언트 접속');
        });
    
    }
}

let socket;
export function initSocket(server) {
    if(!socket){
        socket = new Socket();
    }
}

export function getSocketIo(){
    if(!socket){
        throw new Error('먼저 init를 실행하세요!');
    }
    return socket.io;
}