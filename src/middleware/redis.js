const redis = require('redis')
const client = redis.createClient()
const helper = require('../helpers/wrapper')

module.exports = {
  getMovieByIdRedis: (req, res, next) => {
    const { id } = req.params // Destructuring untuk ${id}
    client.get(`getmovie:${id}`, (error, result) => {
      if (!error && result != null) {
        return helper.response(
          res,
          200,
          'Success Get Data By ID',
          JSON.parse(result)
        )
      } else {
        console.log('data tidak ada di dalam redis')
        next()
      }
    })
  },
  getMovieRedis: (req, res, next) => {
    client.get(`getmovie:${JSON.stringify(req.query)}`, (error, result) => {
      if (!error && result != null) {
        console.log('data ada di dalam redis')
        const newResult = JSON.parse(result) // {data, pageInfo}
        console.log(newResult)
        return helper.response(
          res,
          200,
          'Success Get Movie',
          newResult.result,
          newResult.pageInfo
        )
      } else {
        console.log('data tidak ada di dalam redis')
        next()
      }
    })
  },
  clearDataMovieRedis: (req, res, next) => {
    // [1] cari kunci yang berawalan getMovie
    client.keys('getmovie*', (_error, result) => {
      // console.log(result) // ['getmovie:1', 'getmovie:{page limit ..}']
      if (result.length > 0) {
        result.forEach((item) => {
          client.del(item)
          console.log(item)
        })
      }
      next()
    })
  }
}
