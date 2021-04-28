const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const compression = require('compression')
const bodyParser = require('body-parser')
const routerNavigation = require('./routes')

const app = express()

const port = 3001

app.use(morgan('dev'))
app.use(cors())
app.options('*', cors())
app.use(helmet())
app.use(compression())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/api/v1', routerNavigation)
app.use('/api', express.static('src/upload'))

// app.post('/movie', (req, res) => {
//   console.log('Post Movie Works !')
//   console.log(req.body)
//   // res.status(404).send('Hello World')
// })

app.listen(port, () => {
  console.log(`Express app is listen on port ${port} !`)
})
