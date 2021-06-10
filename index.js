const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const requireDir = require('require-dir')
requireDir('./src/models')
const db = require('./src/config/db')
const mainRoute = require('./src/routes/mainRoute')

app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: false }))

mongoose.connect(db.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  // console.log('DB connected ')
}).catch(err => {
  // console.log('DB error ' + err)
})

app.use('/', mainRoute)

if (process.env.NODE_ENV !== 'test') {
  app.listen(process.env.PORT || 8080, () => {
  })
}

module.exports = app
