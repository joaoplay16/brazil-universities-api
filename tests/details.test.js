const chaiExclude = require('chai-exclude')
const expect = require('chai').use(chaiExclude).expect
require('../src/models/University')
const server = require('../index')
const request = require('supertest')

describe('GET UNIVERSITY DETAILS TESTS', () => {
  const DETAILS_ROUTE = '/details/'
  const UNIVERSITY_ID = '60bfddf9b3c26bc6e0eefba9'

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

  it('Should return a non-empty object', async () => {
    const response = await request(server)
      .get(`${DETAILS_ROUTE + UNIVERSITY_ID}`)

    const document = response.body

    expect(document).to.not.equal(null || undefined)
  })

  it('Should contains keys (_id, name, state_province, web_pages, domains )', async () => {
    const response = await request(server)
      .get(`${DETAILS_ROUTE + UNIVERSITY_ID}`)

    const univercity = response.body

    expect(univercity).contains.keys('_id', 'name', 'state_province', 'web_pages', 'domains')
  })

  it('Should return status 404 when no not found', async () => {
    const unknownUniversityId = '6bc6e0eefba960bfddf9b3c2'
    const response = await request(server)
      .get(`${DETAILS_ROUTE + unknownUniversityId}`)

    expect(response.body.statusCode).to.be.equal(404)
  })

  it('Should return status 404 when id is invalid', async () => {
    const invalidID = 'dkaspofjaspPKz'
    const response = await request(server)
      .get(`${DETAILS_ROUTE + invalidID}`)

    expect(response.body.statusCode).to.be.equal(404)
  })
})
