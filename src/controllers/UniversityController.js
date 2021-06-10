const mongoose = require('mongoose')
const University = mongoose.model('University')
const errors = require('../strings/errors')
module.exports = {

  async index (req, res) {
    const universities = await University.paginate({}, { limit: 15 })
    return res.json(universities)
  },
  async insert (req, res) {
    const university = await University.create(req.body)
    if (!req.body.hasOwnProperty('name')) return res.json(errors.error500)
    return res.json(university)
  },
  async details (req, res) {
    const university_id = req.params.id

    if (!university_id.match(/^[0-9a-fA-F]{24}$/)) return res.json(errors.error404)

    const university = await University.findById(university_id)

    if (university) return res.json(university)

    return res.json(errors.error404)
  },
  async update (req, res) {
    const university = await University.findByIdAndUpdate(req.params.id, req.body, { new: true })
    return res.json(university)
  },
  async delete (req, res) {
    await University.findByIdAndRemove(req.params.id)
    return res.send()
  }
}
