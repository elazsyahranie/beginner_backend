const express = require('express')
const Route = express.Router()
// const { sayHello } = require('./booking_controller')

const bookingController = require('./booking_controller')

Route.get('/hello', bookingController.sayHello)
Route.get('/', bookingController.getAllBooking)
Route.get('/:id', bookingController.getBookingById)
Route.post('/', bookingController.postBooking)
Route.patch('/:id', bookingController.updateBooking)
Route.delete('/:id', bookingController.deleteBooking)
// Route.get('/hello', (req, res) => {
//   res.status(200).send('Hello World')
// })

module.exports = Route
