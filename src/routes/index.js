const express = require('express')
const Route = express.Router()
const movieRouter = require('../modules/movie/movie_routes')
const premiereRouter = require('../modules/premiere/premiere_routes')
const bookingRouter = require('../modules/booking/booking_routes')
const authRouter = require('../modules/auth/auth_routes') // Routing untuk folder 'auth'

// Route.get('/', (req, res) => {
//   res.status(200).send('Hello World')
// })

Route.use('/auth', authRouter) // Routing untuk folder 'auth'
Route.use('/movie', movieRouter)
Route.use('/premiere', premiereRouter)
Route.use('/booking', bookingRouter)

module.exports = Route
