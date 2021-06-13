const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const requireDir = require('require-dir')
requireDir('./src/models')
require('dotenv').config()
const mainRoute = require('./src/routes/mainRoute')
const swaggerUI = require('swagger-ui-express')
const swaggerJsDoc = require('swagger-jsdoc')
const swaggerOptions = require('./src/config/swagger-options')

app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: false }))

const specs = swaggerJsDoc(swaggerOptions)
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs))

let {NODE_ENV, MONGODB_URI, SERVER_PORT, PORT} = process.env

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('DB connected ')
}).catch(err => {
  console.log('DB error ' + err)
})

app.use('/', mainRoute)

if (NODE_ENV !== 'test') {
  app.listen(PORT || SERVER_PORT, () => {
  })
}

module.exports = app
