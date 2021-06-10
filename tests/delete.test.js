const chaiExclude = require('chai-exclude')
const expect = require('chai').use(chaiExclude).expect
require('../src/models/University')
const server = require('../index')
const request = require('supertest')
const { isValidMongoDbId } = require('../src/utils/validator')

describe('DELETE UNIVERSITY DETAILS', () => {
  const universityID = '60c15c987a89f10f80906402'

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

  it('Should return status 404 when id is invalid', async () => {
    const wrongUniversityId = '4546546548'

    const response = await request(server)
      .delete(`${DELETE_ROUTE + wrongUniversityId}`)

    expect(isValidMongoDbId(wrongUniversityId)).to.be.equal(false)
    expect(response.body.statusCode).to.be.equal(404)
  })

  it('Should return status 404 when no not found', async () => {
    const unknownUniversityId = '66bc6e0bfddf9b3c20eefba9'

    const response = await request(server)
      .delete(`${DELETE_ROUTE + unknownUniversityId}`)

    expect(response.body.statusCode).to.be.equal(404)
  })
})
