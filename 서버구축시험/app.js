import express from "express";
import morgan from "morgan";
import memberRouter from './router/member.js';
import hotelRouter from './router/hotel.js';
import { config } from "./config.js";
import { connectDB } from "./db/database.js";

const app = express();

app.use(express.json());
app.use(morgan("dev"));

app.use('/member', memberRouter);
app.use('/hotel', hotelRouter);

app.use((req, res, next) => {
    res.sendStatus(404);
});

// DB 연결 테스트!
connectDB().then((db) => {
    console.log('몽구스를 사용하여 몽고DB에 연결 성공!')
    app.listen(config.host.port);
}).catch(console.error);