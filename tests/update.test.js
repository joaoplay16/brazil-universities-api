const chaiExclude = require('chai-exclude')
const expect = require('chai').use(chaiExclude).expect
require('../src/models/University')
const server = require('../index')
const request = require('supertest')
const { isValidMongoDbId } = require('../src/utils/validator')

describe('UPDATE UNIVERSITY', () => {
  const universityID = '60c15a93c349440f80599d30'

  const UPDATE_ROUTE = '/update/'

  const university = {
    name: 'New University',
    state_province: 'Unkonwn',
    domains: ['newuniversity.com'],
    web_pages: ['www.newuniversity.com']
  }

  it('Connection should return status 200', async () => {
    const response = await request(server)
      .put(`${UPDATE_ROUTE + universityID}`)
      .send(university)

    expect(response.status).to.be.equal(200)
  })

  it('Connection should return content-type "application/json" ', async () => {
    const response = await request(server)
      .put(`${UPDATE_ROUTE + universityID}`)
      .send(university)

    expect(response.type).to.be.equal('application/json')
  })

  it('Should return the university after update', async () => {
    const response = await request(server)
      .put(`${UPDATE_ROUTE + universityID}`)
      .send(university)

    expect(response.body).contains.keys(['_id', 'name', 'state_province', 'domains', 'web_pages'])
  })

  it('Should return status 404 when not found', async () => {
    const unknownUniversityId = '6bc6e0eefba960bfddf9b3c2'
    const response = await request(server)
      .put(`${UPDATE_ROUTE + unknownUniversityId}`)
      .send(university)

    expect(response.body.statusCode).to.be.equal(404)
  })

  it('Should return status 404 when id is invalid', async () => {
    const wrongUniversityId = '4546546548'

    const response = await request(server)
      .put(`${UPDATE_ROUTE + wrongUniversityId}`)
      .send(university)

    expect(isValidMongoDbId(wrongUniversityId)).to.be.equal(false)
    expect(response.body.statusCode).to.be.deep.equal(404)
  })

  it('Should return error 500 when fails', async () => {
    const response = await request(server)
      .put(`${UPDATE_ROUTE + universityID}`)
      .send({})

    expect(response.body.statusCode).to.be.equal(500)
  })
})
