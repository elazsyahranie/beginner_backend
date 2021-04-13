const express = require('express')
const Route = express.Router()
// const { sayHello } = require('./movie_controller')

const movieController = require('./movie_controller')

Route.get('/hello', movieController.sayHello)
Route.get('/', movieController.getAllMovie)
Route.get('/:id', movieController.getMovieById)
Route.post('/', movieController.postMovie)
Route.patch('/:id', movieController.updateMovie)
Route.delete('/:id', movieController.deleteMovie)
// Route.get('/hello', (req, res) => {
//   res.status(200).send('Hello World')
// })

module.exports = Route
