const express = require('express')
const Route = express.Router()

const { register, login, activation } = require('./auth_controller')

Route.post('/login', login)
Route.post('/register', register)
Route.post('/activation', activation)
module.exports = Route
