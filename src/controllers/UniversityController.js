const mongoose = require('mongoose')
const University = mongoose.model('University')
const errors = require('../strings/errors')
const { isValidMongoDbId } = require('../utils/validator')

module.exports = {

  async index (req, res) {
    const { universityName, pageNumber, pagesLimit, stateProvince } = req.query
    const universities = await University.paginate(
      {
        name: { $regex: `${universityName || '.*'}`, $options: 'i' },
        state_province: { $regex: `${stateProvince || '.*'}`, $options: 'i' }
      },
      {
        page: pageNumber ? parseInt(pageNumber) : 1,
        limit: pagesLimit ? parseInt(pagesLimit) : 10
      })
    return res.json(universities)
  },
  async insert (req, res) {
    const newUniversity = req.body
    if (!newUniversity.hasOwnProperty('name') || newUniversity.name === '') { return res.status(500).send(errors.error500) }

    const university = await University.create(newUniversity)

    return res.status(201).send(university)
  },
  async details (req, res) {
    const universityId = req.params.id

    if (!isValidMongoDbId(universityId)) { return res.status(500).send(errors.error500) }

    const university = await University.findById(universityId)

    if (university) return res.json(university)

    return res.send(404).json(errors.error404)
  },
  async update (req, res) {
    const universityId = req.params.id

    if (!req.body.hasOwnProperty('name') || newUniversity.name === '') { return res.json(errors.error500) }

    if (!isValidMongoDbId(universityId)) { return res.status(500).send(errors.error500) }

    const university = await University.findByIdAndUpdate(universityId, req.body, { new: true, useFindAndModify: true })

    if (university) return res.json(university)

    return res.send(404).json(errors.error404)
  },
  async delete (req, res) {
    const universityId = req.params.id

    if (!isValidMongoDbId(universityId)) { return res.json(errors.error500) }

    const university = await University.findByIdAndRemove(universityId)

    if (university) return res.send(200)

    return res.send(404).json(errors.error404)
  }
}
