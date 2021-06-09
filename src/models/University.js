const mongoose = require("mongoose")
const mongoPaginate = require("mongoose-paginate");

const universitySchema = new mongoose.Schema({
    name: {
        type: String,
    },
    state_province: {
        type: String
    },
    web_pages: {
        type: [String],
    },
    domains: {
        type: [String],
    },
}, {collection: "universities"})


universitySchema.plugin(mongoPaginate)
mongoose.model("University", universitySchema)