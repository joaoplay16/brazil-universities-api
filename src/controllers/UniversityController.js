const mongoose = require('mongoose')
const University = mongoose.model('University')
const errors = require('../strings/errors')
const { isValidMongoDbId } = require('../utils/validator')

module.exports = {

  async index (req, res) {
    const { universityName, pageNumber, pageLimit, stateProvince } = req.query
    const universities = await University.paginate(
      {
        name: { $regex: `${universityName || '.*'}`, $options: 'i' },
        state_province: { $regex: `${stateProvince || '.*'}`, $options: 'i' }
      },
      {
        page: pageNumber ? parseInt(pageNumber) : 1,
        limit: pageLimit ? parseInt(pageLimit) : 10
      })
    return res.json(universities)
  },
  async insert (req, res) {
    const university = await University.create(req.body)
    if (!req.body.hasOwnProperty('name')) return res.json(errors.error500)
    return res.json(university)
  },
  async details (req, res) {
    const universityId = req.params.id

    if (!isValidMongoDbId(universityId)) return res.json(errors.error404)

    const university = await University.findById(universityId)

    if (university) return res.json(university)

    return res.json(errors.error404)
  },
  async update (req, res) {
    const universityId = req.params.id

    if (!req.body.hasOwnProperty('name')) return res.json(errors.error500)

    if (!isValidMongoDbId(universityId)) return res.json(errors.error404)

    const university = await University.findByIdAndUpdate(universityId, req.body, { new: true, useFindAndModify: true })

    if (university) return res.json(university)

    return res.json(errors.error404)
  },
  async delete (req, res) {
    const universityId = req.params.id

    if (!isValidMongoDbId(universityId)) return res.json(errors.error404)

    const university = await University.findByIdAndRemove(universityId)

    if (university) return res.send(200)

    return res.json(errors.error404)
  }
}
