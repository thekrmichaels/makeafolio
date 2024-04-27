const express = require('express')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const mongodb = require('./src/database/mongodb/connection')

const usersRouter = require('./routes/users')

mongodb()
const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.use('/users', usersRouter)

module.exports = app
