const chaiExclude = require('chai-exclude')
const expect = require('chai').use(chaiExclude).expect
require('../src/models/University')
const server = require('../index')
const request = require('supertest')

describe('CREATE NEW UNIVERSITY', () => {
  const CREATE_ROUTE = '/new'

  const newUniversity = {
    name: 'New University',
    state_province: 'Unkonwn',
    domains: ['newuniversity.com'],
    web_pages: ['www.newuniversity.com']
  }

  it('Connection should return status 201', async () => {
    const response = await request(server)
      .post(CREATE_ROUTE)
      .send(newUniversity)

    expect(response.status).to.be.equal(201)
  })

  it('Connection should return content-type "application/json" ', async () => {
    const response = await request(server)
      .post(CREATE_ROUTE)
      .send(newUniversity)

    expect(response.type).to.be.equal('application/json')
  })

  it('Should return a new unversity with the property _id', async () => {
    const response = await request(server)
      .post(CREATE_ROUTE)
      .send(newUniversity)

    expect(response.body).contains.keys('_id')
    expect(response.body).excluding(['_id', '__v']).to.deep.equal(newUniversity)
  })

  it('Should return error 500 when fails', async () => {
    const response = await request(server)
      .post(CREATE_ROUTE)
      .send({})

    expect(response.status).to.be.equal(500)
  })
})
