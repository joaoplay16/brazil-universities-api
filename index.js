const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const requireDir = require('require-dir')
requireDir('./src/models')
const db = require('./src/config/db')
const mainRoute = require('./src/routes/mainRoute')
const swaggerUI = require('swagger-ui-express')
const swaggerJsDoc = require('swagger-jsdoc')
const swaggerOptions = require('./src/config/swagger-options')

app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: false }))

const specs = swaggerJsDoc(swaggerOptions)
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs))

mongoose.connect(db.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('DB connected ')
}).catch(err => {
  console.log('DB error ' + err)
})

app.use('/', mainRoute)

if (process.env.NODE_ENV !== 'test') {
  app.listen(process.env.PORT || 8080, () => {
  })
}

module.exports = app
