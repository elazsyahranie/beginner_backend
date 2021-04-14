const helper = require('../../helpers/wrapper')
const movieModel = require('./movie_model')

module.exports = {
  sayHello: (req, res) => {
    res.status(200).send('Hello World')
  },
  getAllMovie: async (req, res) => {
    try {
      let { page, limit } = req.query
      page = parseInt(page)
      limit = parseInt(limit)
      const totalData = await movieModel.getDataCount()
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
      const result = await movieModel.getDataAll(limit, offset)
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
  getMovieById: async (req, res) => {
    try {
      const { id } = req.params
      const result = await movieModel.getDataById(id)
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
  postMovie: async (req, res) => {
    try {
      console.log(req.body)
      const { movieName, movieCategory, movieReleaseDate } = req.body
      const setData = {
        movie_name: movieName,
        movie_category: movieCategory,
        movie_release_date: movieReleaseDate,
        movie_updated_at: new Date(Date.now())
      }
      const result = await movieModel.createData(setData)
      return helper.response(res, 200, 'Success Create Data', result)
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  updateMovie: async (req, res) => {
    try {
      const { id } = req.params

      const {
        movieName,
        movieCategory,
        movieReleaseDate,
        movieDuration
      } = req.body
      const setData = {
        movie_name: movieName,
        movie_category: movieCategory,
        movie_release_date: movieReleaseDate,
        movie_duration: movieDuration
      }
      const result = await movieModel.updateData(setData, id)
      return helper.response(res, 200, 'Success Update Movie', result)
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  deleteMovie: async (req, res) => {
    try {
      const { id } = req.params

      const { movieName, movieCategory, movieReleaseDate } = req.body
      const setData = {
        movie_name: movieName,
        movie_category: movieCategory,
        movie_release_date: movieReleaseDate
      }
      const result = await movieModel.updateData(setData, id)
      return helper.response(res, 200, `Success Delete Movie ${id}`, result)
      // console.log(req.params)
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  }
}
