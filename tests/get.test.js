const chaiExclude = require('chai-exclude')
const expect = require('chai').use(chaiExclude).expect
require('../src/models/University')
const server = require('../index')
const request = require('supertest')

describe('GET ALL UNIVERSITIES', () => {
  const SEARCH_ROUTE = '/search'
  it('Connection should return status 200', async () => {
    const response = await request(server)
      .get(SEARCH_ROUTE)

    expect(response.status).to.be.equal(200)
  })

  it('Connection should return content type "application/json" ', async () => {
    const response = await request(server)
      .get(SEARCH_ROUTE)

    expect(response.type).to.be.equal('application/json')
  })

  it('Should return zero or more results', async () => {
    const response = await request(server)
      .get(SEARCH_ROUTE)

    const document = response.body

    expect(document.total).to.be.greaterThanOrEqual(0)
  })
})
