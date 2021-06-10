const chaiExclude = require('chai-exclude')
const expect = require('chai').use(chaiExclude).expect
require('../src/models/University')
const server = require('../index')
const request = require('supertest')

describe('GET ALL UNIVERSITIES TESTS', () => {
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

  it('Should return one or more results', async () => {
    const response = await request(server)
      .get(SEARCH_ROUTE)

    const document = response.body

    expect(document.total).to.be.greaterThan(0)
  })
})
