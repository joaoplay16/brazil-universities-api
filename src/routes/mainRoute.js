const express = require("express")
const route = express.Router()

const UniversityController = require("../controllers/UniversityController")

route.get("/", UniversityController.index)

route.get("/details/:id", UniversityController.details)

route.put("/update/:id", UniversityController.update)

route.post("/new", UniversityController.insert)

route.delete("/remove/:id", UniversityController.insert)


module.exports = route