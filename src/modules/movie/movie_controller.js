const redis = require('redis')
const client = redis.createClient()
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
      client.setex(
        `getmovie:${JSON.stringify(req.query)}`,
        3600,
        JSON.stringify({ result, pageInfo })
      )
      return helper.response(res, 200, 'Success Get Data', result, pageInfo)
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  getMovieById: async (req, res) => {
    try {
      const { id } = req.params
      const result = await movieModel.getDataById(id)
      if (result.length > 0) {
        client.set(`getmovie:${id}`, JSON.stringify(result))
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
      const {
        movieName,
        movieCategory,
        movieReleaseDate
        //   movieDuration,
        //   movieSynopsis
      } = req.body
      const setData = {
        movie_name: movieName,
        movie_category: movieCategory,
        movie_release_date: movieReleaseDate,
        movie_image: req.file ? req.file.filename : ''
      }
      console.log(setData)
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
        movieDuration,
        movieCasts,
        movieSynopsis
      } = req.body
      const setData = {
        movie_name: movieName,
        movie_category: movieCategory,
        movie_release_date: movieReleaseDate,
        movie_duration: movieDuration,
        movie_casts: movieCasts,
        movie_synopsis: movieSynopsis,
        movie_image: req.file ? req.file.filename : ''
      }
      const result = await movieModel.updateData(setData, id)
      return helper.response(res, 200, 'Success Update Movie', result)
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  deleteMovie: async (req, res) => {
    try {
      // 1. buat request di post
      // 2. set up controller dan model
      // 3. men-delete data yang ada di dala folder upload fs.unlink
      const { id } = req.params
      const result = await movieModel.deleteData(id)
      return helper.response(res, 200, `Success Delete Movie ${id}`, result)
      // console.log(req.params)
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  }
}
