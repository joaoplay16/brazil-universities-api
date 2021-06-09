const mongoose =  require("mongoose")
const University = mongoose.model("University")

module.exports={

    async index (req, res){
        const universities = await University.paginate({}, {limit: 15})
        return res.json(universities)
    },
    async insert(req, res){
        const university = await University.create(req.body)
        return res.json(university)
    },
     async details(req, res){
        const university = await University.findById(req.params.id);
        return res.json(university);
    },
    async update(req, res){
        const university = await University.findByIdAndUpdate(req.params.id, req.body, {new: true});
        return res.json(university);
    },
    async delete(req, res){
        await University.findByIdAndRemove(req.params.id);
        return res.send();
    },
}