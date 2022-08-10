const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const server = require('http').createServer()
const io = require('socket.io')(server, {
    cors: {
        origin: "http://localhost:6000",
        methods: ["GET", "POST"]
    }
});

io.on('connection', (socket) =>{
    socket.emit("hello","world")
})

import connectDB from "./config/db"
import cookieParser from 'cookie-parser'
const PORT = process.env.PORT || 5000

connectDB()
const app = express()
app.use(cookieParser())
app.use(express.static("public"))

app.use(express.json({limit: '25mb'}));
app.use(express.urlencoded({limit: '25mb'}));
app.use(express.urlencoded({ extended: false}))

import userRoute from "./routes/userRoute"
import { METHODS } from "http"
app.use('/users', userRoute)

app.listen(PORT, () => (
    console.info(`Server listening on port: ${PORT}`)
))