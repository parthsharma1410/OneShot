import React from 'react'
import '../App.css'
import { Form, Button, Card, Alert, Navbar, Nav } from "react-bootstrap";
import Link from "react-router-dom";
import img1 from '../public/img1.jpg'
import { useContext, useEffect, useState } from "react";
import StudentAPIHelper from "../StudentApiHelper"
import { Chart } from 'react-chartjs-2';

export default function StudentList() {
    const [students, setStudents] = useState([])
    const [id, setId] = useState([])
    const [name, setName] = useState("")
    const [year, setYear] = useState("")
    const [collegeId, setCollegeId] = useState("")
    const [skills, setSkills] = useState([])
    const [label, setLabel] = useState([])
    const [sData, setSData] = useState([])

    useEffect(() => {
        const fetchStudentAndSetStudents = async () => {
          const students = await StudentAPIHelper.getAllStudents()
          console.log(students)
          setStudents(students)
        }
        // setLabel(current => [..current, ])
        const setLabelValues = async () => {
            students.map(({ _id,
                id,
  name,
  year,
  collegeId,
  skills}, i) => (
                    setLabel([...label, students[i].name])
                    // setData([...data, colleges[i].strength])
                ))
        }
        const setDataValues = async () => {
            students.map(({ _id, id,
                name,
                year,
                collegeId,
                skills}, i) => (
                    // setData([...label, colleges[i].name])
                    setSData([...sData, students[i].year])
                ))
        }
        fetchStudentAndSetStudents()
        setDataValues()
        setLabelValues()
      }, [])
    
      
    
      const createStudent = async e => {
        e.preventDefault()
        if (!name) {
          alert("please enter something")
          return
        }
        const newStudent = await StudentAPIHelper.createStudent(id,
            name,
            year,
            collegeId,
            skills)
        setStudents([...students, newStudent])
      }
    
      const deleteStudent = async (e, id) => {
        try {
          e.stopPropagation()
          await StudentAPIHelper.deleteStudent(id)
          setStudents(students.filter(({ _id: i }) => id !== i))
        } catch (err) {}
      }



    //   const labels = [];
    

      const val = {
        labels: label,
        datasets: [{
          label: 'Collegewise strength',
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgb(255, 99, 132)',
          data: sData,
        }]
      };
    
      const config = {
        type: 'doughnut',
        data: sData,
        options: {}
      };

    //   const myChart = new Chart(
    //     document.getElementById('myChart'),
    //     config
    //   );

    return(
        <div className="container">
        <div className='flexbox'>
       <form className='form animate__animated animate__fadeIn animate__delay-1s'>
       <div class="mb-3">
              <label for="id" class="form-label">Student ID</label>
               <input type="number" class="form-control" id="id" aria-describedby="id" onChange={({ target }) => setId(target.value)}/>
                </div>
         <div class="mb-3">
              <label for="name" class="form-label">College Name</label>
               <input type="string" class="form-control" id="name" aria-describedby="name" onChange={({ target }) => setName(target.value)}/>
                </div>
                <div class="mb-3">
                    <label for="year" class="form-label">Year</label>
                    <input type="number" class="form-control" id="years" onChange={({ target }) => setYear(target.value)}/>
                </div>
                <div class="mb-3">
                    <label for="city" class="form-label">CollegeId</label>
                    <input type="string" class="form-control" id="city" onChange={({ target }) => setCollegeId(target.value)}/>
                </div>
                <div class="mb-3">
                    <label for="courses" class="form-label">Skills</label>
                    <input type="string" class="form-control" id="courses" onChange={({ target }) => setSkills(target.value)}/>
                </div>
                <button type="submit" class="btn btn-primary" onClick={createStudent}>Submit</button>
            </form>
            {/* <div className='image'>
                <img src={popcorn} alt='MovieList' />
            </div> */}
        </div>
<br /><br />
            {students.map(({ _id, id,
  name,
  year,
  collegeId,
  skills}, i) => (
          <div className="movie mb-4 text-justify animate__animated animate__fadeInLeft animate__delay-1s" >
            <h4 className="heading">{students[i].name}</h4> <br />
            {/* <input type="string" class="form-control" id="CollegeName" onChange={({ target }) => setUpdatedName(target.value)} /> */}
            {/* <button type="submit" class="btn btn-success" onClick={e => updateCollege(e, _id)} >Update</button> */}
            {/* <li
            key={i}
            onClick={e => updateMovie(e, _id)}
            className={completed ? "completed" : ""}
          ></li> */}
            <div class='flexbox'>
                <div className='left'>
                <p className="pt-4 pb-0 text">
                    <strong>Name: </strong>
            {students[i].name}
            </p>
            <p className="pt-4 pb-0 text">
            <strong>Years Active: </strong>
            {students[i].year}
            </p>
                </div>
                <div className='right'>
                <p className="pt-4 pb-0 text">
                <strong>CollegeId </strong>
            {students[i].collegeId}
            </p>
            <p className="pt-4 pb-0 text">
            <strong>Skills </strong>
            {students[i].skills}
            </p>
                </div>
            </div>
            <button className='btn btn-danger' id='crossButton' onClick={e => deleteStudent(e, _id)}> Delete </button>
           </div>
        ))}
        <div>
            <canvas id="myChart"></canvas>
        </div>

    </div>
    

    )
}