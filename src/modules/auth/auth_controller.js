const bcrypt = require('bcrypt') // Untuk enkripsi password. Dengan bcrypt, setelah dienkripsi, tidak bisa didekripsi
const jwt = require('jsonwebtoken')
const helper = require('../../helpers/wrapper') // Helper untuk response
const authModel = require('./auth_model')

module.exports = {
  register: async (req, res) => {
    try {
      const { userEmail, userPassword, userName } = req.body // Destructuring data yang ditangkap dari request body
      const salt = bcrypt.genSaltSync(10) // Berapa putaran enkripsinya?
      const encryptPassword = bcrypt.hashSync(userPassword, salt) // Hashing atau enkripsi userPassword, dirubah jadi "huruf dan angka ga jelas"
      console.log(`before Encrypt = ${userPassword}`) // Password asli, sebelum di encrypt. Masih jelas
      console.log(`after Encrypt = ${encryptPassword}`) // Password setelah di encrypt, jadi "huruf dan angka gajelas"
      const setData = {
        user_name: userName,
        user_email: userEmail,
        user_password: encryptPassword // Simpan password yang sudah dienkripsi (encryptPassword), bukan yang asli (userPassword)
      } // Untuk menghubungkan kolom pada database dengan variable pada file auth_controller
      // --TUGAS--
      // kondisi cek email apakah ada di dalam database ?
      // jike ada response gagal = msg = email sudah pernah di daftarkan
      // jika tidak ada = menjalankan proses model register user
      const result = await authModel.register(setData)
      // delete result.user_password
      return helper.response(res, 200, 'Success Register User', result) // Error Message
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
  }
}
