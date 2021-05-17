const bcrypt = require('bcrypt') // Untuk enkripsi password. Dengan bcrypt, setelah dienkripsi, tidak bisa didekripsi
const jwt = require('jsonwebtoken')
const helper = require('../../helpers/wrapper') // Helper untuk response
const authModel = require('./auth_model')
require('dotenv').config()
const nodemailer = require('nodemailer')

module.exports = {
  register: async (req, res) => {
    try {
      const { userEmail, userPassword, userName, userId } = req.body // Destructuring data yang ditangkap dari request body
      const salt = bcrypt.genSaltSync(10) // Berapa putaran enkripsinya?
      const encryptPassword = bcrypt.hashSync(userPassword, salt) // Hashing atau enkripsi userPassword, dirubah jadi "huruf dan angka ga jelas"
      console.log(`before Encrypt = ${userPassword}`) // Password asli, sebelum di encrypt. Masih jelas
      console.log(`after Encrypt = ${encryptPassword}`) // Password setelah di encrypt, jadi "huruf dan angka gajelas"
      const setData = {
        user_id: userId,
        user_email: userEmail,
        user_status: 'Unverified',
        user_password: encryptPassword // Simpan password yang sudah dienkripsi (encryptPassword), bukan yang asli (userPassword)
      } // Untuk menghubungkan kolom pada database dengan variable pada file auth_controller
      let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: process.env.SMTP_EMAIL, // generated ethereal user
          pass: process.env.SMTP_PASSWORD // generated ethereal password
        }
      })

      const mailOptions = {
        from: '"Jualkarcis 👻" <elazaribrahim95@gmail.com>', // sender address
        to: userEmail, // list of receivers
        subject: 'Jualkarcis - Activation Email', // Subject line
        html: `<b>Click here to activate</b><a href='http://localhost:3001/api/v1/auth/${authModel.user_status}'>Click</>` // html body
      }

      await transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error)
          return helper.response(res, 400, 'Email Not Send !')
        } else {
          console.log('Email sent: ' + info.response)
          return helper.response(res, 200, 'Success Register User')
        }
      })
      console.log(setData)
      const result = await authModel.register(setData)
      delete result.user_password
      return helper.response(res, 200, 'Success Register User', result)
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error) // Error Message
    }
  },
  login: async (req, res) => {
    try {
      const { userEmail, userPassword } = req.body // Destructuring data yang ditangkap dari request body
      const checkEmailUser = await authModel.getDataConditions({
        user_email: userEmail
      })
      if (checkEmailUser.length > 0) {
        // Artinya, jika alamat email yang kita gunakkan untuk login sudah terdaftar di website kita...
        const checkPassword = bcrypt.compareSync(
          userPassword,
          checkEmailUser[0].user_password
        )
        if (checkPassword) {
          const payload = checkEmailUser[0]
          delete payload.user_password // Nanti di postman, passwordnya yang asli tidak akan terlihat
          const token = jwt.sign({ ...payload }, 'RAHASIA', {
            expiresIn: '24h' // Akan expire dalam waktu 24 jam, lebih dari itu harug login lagi
          })
          const result = { ...payload, token }
          return helper.response(res, 200, 'Success login !', result) // ...jika password yang kita masukkan benar
        } else {
          return helper.response(res, 400, 'Wrong password !') // Kalau password salah
        }
      } else {
        return helper.response(res, 404, 'Email / Account Not registered')
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  activation: async (req, res) => {
    try {
      const { id } = req.params
      const setData = {
        user_status: 'Active'
      }
      const result = await authModel.updateData(setData, id)
      return helper.response(res, 200, 'Account Have Been Verified !', result)
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  }
}
