const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
import connectDB from "./config/db"
const PORT = process.env.PORT || 5000

connectDB()
const app = express()

app.use(express.static("public"))
app.use(express.json())
app.use(express.urlencoded({ extended: false}))


app.listen(PORT, () => (
    console.info(`Server listening on port: ${PORT}`)
))