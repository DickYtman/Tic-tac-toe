"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config();
const server = require('http').createServer();
const io = require('socket.io')(server, {
    cors: {
        origin: "http://localhost:6000",
        methods: ["GET", "POST"]
    }
});
io.on('connection', (socket) => {
    socket.emit("hello", "world");
});
const db_1 = __importDefault(require("./config/db"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const PORT = process.env.PORT || 5000;
db_1.default();
const app = express();
app.use(cookie_parser_1.default());
app.use(express.static("public"));
app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ limit: '25mb' }));
app.use(express.urlencoded({ extended: false }));
const userRoute_1 = __importDefault(require("./routes/userRoute"));
app.use('/users', userRoute_1.default);
app.listen(PORT, () => (console.info(`Server listening on port: ${PORT}`)));
