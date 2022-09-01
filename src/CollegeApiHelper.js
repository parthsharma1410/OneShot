import axios from "axios"

const API_URL = "http://localhost:4000/college/"

async function createCollege(id,
  name,
  year,
  city,
  state,
  country,
  strength,
  courses) {
    // const newdata = {
    //     'email': email,
    //     'comment': comment
    // }
    // console.log(newdata)
    // const email = props.email
    // const comment = props.comment
  const { data: newCollege } = await axios.post(API_URL, {
    id,
  name,
  year,
  city,
  state,
  country,
  strength,
  courses
  })
  return newCollege
}

async function deleteCollege(id) {
  const message = await axios.delete(`${API_URL}${id}`)
  return message
}

async function getAllColleges() {
  const { data: colleges } = await axios.get(API_URL)
  return colleges
}

export default { createCollege, getAllColleges, deleteCollege }