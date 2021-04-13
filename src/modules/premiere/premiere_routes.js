const express = require('express')
const Route = express.Router()
// const { sayHello } = require('./premiere_controller')

const premiereController = require('./premiere_controller')

Route.get('/hello', premiereController.sayHello)
Route.get('/', premiereController.getAllPremiere)
Route.get('/:id', premiereController.getPremiereById)
Route.post('/', premiereController.postPremiere)
Route.patch('/:id', premiereController.updatePremiere)
Route.delete('/:id', premiereController.deletePremiere)
// Route.get('/hello', (req, res) => {
//   res.status(200).send('Hello World')
// })

module.exports = Route
