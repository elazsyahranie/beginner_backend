const helper = require('../../helpers/wrapper')
const premiereModel = require('./premiere_model')

module.exports = {
  sayHello: (req, res) => {
    res.status(200).send('Hello World')
  },
  getAllPremiere: async (req, res) => {
    try {
      let { page, limit } = req.query
      page = parseInt(page)
      limit = parseInt(limit)
      const totalData = await premiereModel.getDataCount()
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
      const result = await premiereModel.getDataAll(limit, offset)
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
  getPremiereById: async (req, res) => {
    try {
      const { id } = req.params
      const result = await premiereModel.getDataById(id)
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
  postPremiere: async (req, res) => {
    try {
      console.log(req.body)
      const { premiereName, premierePrice } = req.body
      const setData = {
        premiere_name: premiereName,
        premiere_price: premierePrice,
        premiere_updated_at: new Date(Date.now())
      }
      const result = await premiereModel.createData(setData)
      return helper.response(res, 200, 'Success Create Data', result)
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  updatePremiere: async (req, res) => {
    try {
      const { id } = req.params

      const { premiereName, premierePrice } = req.body
      const setData = {
        premiere_name: premiereName,
        premiere_price: premierePrice
      }
      const result = await premiereModel.updateData(setData, id)
      return helper.response(res, 200, 'Success Update Premiere', result)
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  deletePremiere: async (req, res) => {
    try {
      console.log(req.params)
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  }
}
