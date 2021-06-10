const chaiExclude = require('chai-exclude')
const expect = require('chai').use(chaiExclude).expect
require('../src/models/University')
const server = require('../index')
const request = require('supertest')
const errors = require('../src/strings/errors')

describe('DELETE UNIVERSITY DETAILS TESTS', () => {
  const universityID = '60bfddf9b3c26bc6e0eefba9'

  const DELETE_ROUTE = '/remove/'

  it('Connection should return status 200', async () => {
    const response = await request(server)
      .delete(`${DELETE_ROUTE + universityID}`)

    expect(response.status).to.be.equal(200)
  })

  it('Connection should return content-type "application/json"', async () => {
    const response = await request(server)
      .delete(`${DELETE_ROUTE + universityID}`)

    expect(response.type).to.be.equal('application/json')
  })
  it('Id should match /^[0-9a-fA-F]{24}$/', async () => {
    const wrongUniversityId = '4546546548'

    const response = await request(server)
      .delete(`${DELETE_ROUTE + wrongUniversityId}`)

    expect(!!universityID.match(/^[0-9a-fA-F]{24}$/)).to.equal(true)

    expect(response.body.statusCode).to.be.equal(404)
  })
})
