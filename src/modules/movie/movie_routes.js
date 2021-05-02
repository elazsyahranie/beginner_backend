const express = require('express')
const Route = express.Router()
// 1
// const { sayHello } = require('./movie_controller')
// 2
const movieController = require('./movie_controller')
const authMiddleware = require('../../middleware/auth')
const uploadFile = require('../../middleware/upload')
const redisMiddleware = require('../../middleware/redis')

Route.get('/hello', movieController.sayHello)
Route.get(
  '/',
  authMiddleware.authentication,
  redisMiddleware.getMovieRedis,
  authMiddleware.isAdmin,
  movieController.getAllMovie
)
Route.get(
  '/:id',
  redisMiddleware.getMovieByIdRedis,
  movieController.getMovieById
)
Route.get('/:id', movieController.getMovieById)
Route.post(
  '/',
  authMiddleware.authentication,
  authMiddleware.isAdmin,
  uploadFile,
  redisMiddleware.clearDataMovieRedis,
  movieController.postMovie
)
Route.patch(
  '/:id',
  authMiddleware.authentication,
  authMiddleware.isAdmin,
  uploadFile,
  redisMiddleware.clearDataMovieRedis,
  movieController.updateMovie
)
Route.delete(
  '/',
  redisMiddleware.clearDataMovieRedis,
  movieController.deleteMovie
)

// Route.get('/hello', (req, res) => {
//   res.status(200).send('Hello World')
// })

module.exports = Route
