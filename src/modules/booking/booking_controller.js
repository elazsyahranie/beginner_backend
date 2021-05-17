const helper = require('../../helpers/wrapper')
const bookingModel = require('./booking_model')

module.exports = {
  sayHello: (req, res) => {
    res.status(200).send('Hello World')
  },
  getAllBooking: async (req, res) => {
    try {
      let { page, limit } = req.query
      page = parseInt(page)
      limit = parseInt(limit)
      const totalData = await bookingModel.getDataCount()
      console.log('Total Data: ' + totalData)
      const totalPage = Math.ceil(totalData / limit)
      console.log('Total Page: ' + totalPage)
      const offset = page * limit - limit
      const pageInfo = {
        page,
        totalPage,
        limit,
        totalData
      }
      const result = await bookingModel.getDataAll(limit, offset)
      return helper.response(
        res,
        200,
        'Success Get Data',
        'Data',
        result,
        pageInfo
      )
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  getBookingById: async (req, res) => {
    try {
      const { id } = req.params
      const result = await bookingModel.getDataById(id)
      if (result.length > 0) {
        return helper.response(res, 200, 'Success Get Data By Id', result)
      } else {
        return helper.response(
          res,
          200,
          'Success Get Data By Id ... Not Found !',
          null
        )
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  postBooking: async (req, res) => {
    try {
      const {
        bookingPaymentMethod,
        bookingTicket,
        bookingTotalPrice
      } = req.body
      const setData = {
        booking_payment_method: bookingPaymentMethod,
        booking_ticket: bookingTicket,
        booking_total_price: bookingTotalPrice,
        movie_image: req.file ? req.file.filename : ''
      }
      console.log(setData)
      const result = await bookingModel.createData(setData)
      return helper.response(
        res,
        200,
        'Success Create New Payment Method',
        result
      )
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  updateBooking: async (req, res) => {
    try {
      const { id } = req.params

      const {
        bookingPaymentMethod,
        bookingTicket,
        bookingTotalPrice
      } = req.body
      const setData = {
        booking_payment_method: bookingPaymentMethod,
        booking_ticket: bookingTicket,
        booking_total_price: bookingTotalPrice,
        movie_image: req.file ? req.file.filename : ''
      }
      const result = await bookingModel.updateData(setData, id)
      return helper.response(res, 200, 'Success Update booking', result)
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  deleteBooking: async (req, res) => {
    try {
      const { id } = req.params

      const { bookingName, bookingPrice } = req.body
      const setData = {
        booking_name: bookingName,
        booking_price: bookingPrice
      }
      const result = await bookingModel.deleteData(setData, id)
      return helper.response(res, 200, 'Success Delete Booking', result)
      // console.log(req.params)
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  }
}
