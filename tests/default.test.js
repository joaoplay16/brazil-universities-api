const chaiExclude = require('chai-exclude')
const expect = require('chai').use(chaiExclude).expect
require('../src/models/University')
const server = require('../index')
const request = require('supertest')
const messages = require('../src/strings/messages')

describe('DEFAULT ROUTES TESTS', () => {
  it('Connection should return status 200', async () => {
    const response = await request(server)
      .get('/')

    expect(response.status).to.be.equal(200)
  })

  it('Connection should return content-type "application/json" ', async () => {
    const response = await request(server)
      .get('/')

    expect(response.type).to.be.equal('application/json')
  })

  it('Should return home message', async () => {
    const response = await request(server)
      .get('/')

    expect(response.body).to.be.deep.equal(messages.homeMessage)
  })

  it('Should return error 404 when route is wrong', async () => {
    const response = await request(server)
      .get('/unknown')

    expect(response.body.statusCode).to.be.deep.equal(404)
  })
})
