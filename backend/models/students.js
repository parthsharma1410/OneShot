const mongoose = require("mongoose") 

const StudentSchema = new mongoose.Schema(
    {
        id : {type: Number, required: true},
        name: { type: String, required: true },
        year: { type: Number, required: true },
        collegeId: { type: String, required: true },
        skills: { type: [String], required: true }
})

const studentModel = mongoose.model("Students", StudentSchema) 

module.exports = studentModel 