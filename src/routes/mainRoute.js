const express = require('express')
const route = express.Router()
const errors = require('../strings/errors')
const messages = require('../strings/messages')

const UniversityController = require('../controllers/UniversityController')

route.get('/', (req, res) => {
  res.json(messages.homeMessage)
})

route.get('/search', UniversityController.index)

route.get('/details/:id', UniversityController.details)

route.put('/update/:id', UniversityController.update)

route.post('/new', UniversityController.insert)

route.delete('/remove/:id', UniversityController.delete)

route.get('*', (req, res) => {
  res.json(errors.error404)
})
module.exports = route
