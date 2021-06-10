const chaiExclude = require('chai-exclude')
const expect = require('chai').use(chaiExclude).expect
require('../src/models/University')
const server = require('../index')
const request = require('supertest')
const { isValidMongoDbId } = require('../src/utils/validator')

describe('GET UNIVERSITY DETAILS', () => {
  const DETAILS_ROUTE = '/details/'
  const UNIVERSITY_ID = '60c15a93c349440f80599d30'

  it('Connection should return status 200', async () => {
    const response = await request(server)
      .get(`${DETAILS_ROUTE + UNIVERSITY_ID}`)

    expect(response.status).to.be.equal(200)
  })

  it('Connection should return content-type "application/json" ', async () => {
    const response = await request(server)
      .get(`${DETAILS_ROUTE + UNIVERSITY_ID}`)

    expect(response.type).to.be.equal('application/json')
  })

  it('Should contains keys (_id, name, state_province, web_pages, domains )', async () => {
    const response = await request(server)
      .get(`${DETAILS_ROUTE + UNIVERSITY_ID}`)

    const univercity = response.body

    expect(univercity).contains.keys('_id', 'name', 'state_province', 'web_pages', 'domains')
  })

  it('Should return status 404 when no not found', async () => {
    const unknownUniversityId = '6bc6e0eefba960bfddf9b3c1'
    const response = await request(server)
      .get(`${DETAILS_ROUTE + unknownUniversityId}`)

    expect(response.body.statusCode).to.be.equal(404)
  })

  it('Should return status 404 when id is invalid', async () => {
    const wrongUniversityId = 'dkaspofjaspPKz'
    const response = await request(server)
      .get(`${DETAILS_ROUTE + wrongUniversityId}`)

    expect(isValidMongoDbId(wrongUniversityId)).to.be.equal(false)
    expect(response.body.statusCode).to.be.equal(404)
  })
})
