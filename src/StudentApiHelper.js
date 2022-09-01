import axios from "axios"

const API_URL = "http://localhost:4000/student/"

async function createStudent(id,
  name,
  year,
  collegeId,
  skills) {
    // const newdata = {
    //     'email': email,
    //     'comment': comment
    // }
    // console.log(newdata)
    // const email = props.email
    // const comment = props.comment
  const { data: newStudent } = await axios.post(API_URL, {
    id,
  name,
  year,
  collegeId,
  skills
  })
  return newStudent
}

async function deleteStudent(id) {
  const message = await axios.delete(`${API_URL}${id}`)
  return message
}

async function getAllStudents() {
  const { data: students } = await axios.get(API_URL)
  return students
}

export default { createStudent, getAllStudents, deleteStudent }