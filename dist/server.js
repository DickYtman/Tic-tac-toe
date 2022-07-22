"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config();
const db_1 = __importDefault(require("./config/db"));
const PORT = process.env.PORT || 5000;
db_1.default();
const app = express();
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const userRoute_1 = __importDefault(require("./routes/userRoute"));
app.use('/users', userRoute_1.default);
app.listen(PORT, () => (console.info(`Server listening on port: ${PORT}`)));
