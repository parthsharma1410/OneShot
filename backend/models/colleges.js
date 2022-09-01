const mongoose = require("mongoose") 

const CollegeSchema = new mongoose.Schema(
    {
        id : {type: Number, required: true},
        name: { type: String, required: true },
        year: { type: Number, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        country: { type: String, required: true },
        strength: { type: Number, required: true },
        courses: { type: [String], required: true }
})

const collegeModel = mongoose.model("Colleges", CollegeSchema) 

module.exports = collegeModel 