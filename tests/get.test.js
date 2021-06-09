const chaiExclude = require("chai-exclude")
const expect = require( "chai").use(chaiExclude).expect
require("../src/models/University")
const server = require("../index")
const request = require("supertest")
describe("API TESTS", () => {


    it('Connection should return status 200', async ()=> {
        const response = await request(server)
        .get("/")

        expect(response.status).to.be.equal(200)
    })

    it('Connection should return content type "application/json" ', async ()=> {
        const response = await request(server)
        .get("/")

        expect(response.type).to.be.equal('application/json')
    })

    it('Should return one or more results', async () => {
        const response = await request(server)
        .get("/")

        const document = response.body

        expect(document.total).to.be.greaterThan(0)
    })

    it('Single object structure should be aqual', async () => {
        const response = await request(server)
        .get("/")

        const univercities = response.body.docs

        expect(univercities[0]).excluding("_id").to.deep.equal({
            name: "Universidade de São Paulo",
            state_province: "São paulo",
            web_pages: ["www.usp.com"],
            domains: ["usp.com"]
        })
    })
})