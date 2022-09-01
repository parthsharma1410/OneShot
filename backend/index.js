const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const PORT = process.env.PORT || 4000
const db = require("./models/")
const cors = require("cors")

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

function success(res, payload) {
  return res.status(200).json(payload)
}

app.get("/college", async (req, res, next) => {
  try {
    const colleges = await db.Colleges.find({})
    return success(res, colleges)
  } catch (err) {
    next({ status: 400, message: "failed to get colleges" })
  }
})

app.post("/college", async (req, res, next) => {
    // console.log(req.body)
  try {
    const college = await db.Colleges.create(req.body)
    return success(res, college)
  } catch (err) {
    next({ status: 400, message: "failed to create college" })
  }
})

app.delete("/college/:id", async (req, res, next) => {
  try {
    await db.Colleges.findByIdAndRemove(req.params.id)
    return success(res, "College deleted")
  } catch (err) {
    next({ status: 400, message: "failed to delete college" })
  }
})


app.use((err, req, res, next) => {
  return res.status(err.status || 400).json({
    status: err.status || 400,
    message: err.message || "there was an error processing request",
  })
})

// app.get("/", (req, res) => {
//     console.log("Hello")
// })

app.get("/student", async (req, res, next) => {
    try {
      const students = await db.Students.find({})
      return success(res, students)
    } catch (err) {
      next({ status: 400, message: "failed to get students" })
    }
  })
  
  app.post("/student", async (req, res, next) => {
    try {
      const student = await db.Students.create(req.body)
      return success(res, student)
    } catch (err) {
      next({ status: 400, message: "failed to create college" })
    }
  })
  
  app.delete("/student/:id", async (req, res, next) => {
    try {
      await db.Students.findByIdAndRemove(req.params.id)
      return success(res, "Student deleted")
    } catch (err) {
      next({ status: 400, message: "failed to delete student" })
    }
  })
  
  
//   app.use((err, req, res, next) => {
//     return res.status(err.status || 400).json({
//       status: err.status || 400,
//       message: err.message || "there was an error processing request",
//     })
//   })

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})