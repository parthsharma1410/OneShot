import React from 'react'
import '../App.css'
import { Form, Button, Card, Alert, Navbar, Nav } from "react-bootstrap";
import Link from "react-router-dom";
import img1 from '../public/img1.jpg'
import { useContext, useEffect, useState } from "react";
import CollegeAPIHelper from "../CollegeApiHelper"
import { Chart } from 'react-chartjs-2';

export default function CollegeList() {
    const [colleges, setColleges] = useState([])
    const [id, setId] = useState([])
    const [name, setName] = useState("")
    const [year, setYear] = useState("")
    const [city, setCity] = useState("")
    const [state, setState] = useState("")
    const [country, setCountry] = useState("")
    const [strength, setStrength] = useState("")
    const [courses, setCourses] = useState([])
    const [label, setLabel] = useState([])
    const [sData, setSData] = useState([])

    useEffect(() => {
        const fetchCollegeAndSetColleges = async () => {
          const colleges = await CollegeAPIHelper.getAllColleges()
          console.log(colleges)
          setColleges(colleges)
        }
        // setLabel(current => [..current, ])
        const setLabelValues = async () => {
            colleges.map(({ _id, id,
                name,
                year,
                city,
                state,
                country,
                strength,
                courses}, i) => (
                    setLabel([...label, colleges[i].name])
                    // setData([...data, colleges[i].strength])
                ))
        }
        const setDataValues = async () => {
            colleges.map(({ _id, id,
                name,
                year,
                city,
                state,
                country,
                strength,
                courses}, i) => (
                    // setData([...label, colleges[i].name])
                    setSData([...sData, colleges[i].strength])
                ))
        }
        fetchCollegeAndSetColleges()
        setDataValues()
        setLabelValues()
      }, [])
    
      
    
      const createCollege = async e => {
        e.preventDefault()
        if (!name) {
          alert("please enter something")
          return
        }
        const newCollege = await CollegeAPIHelper.createCollege(id,
            name,
            year,
            city,
            state,
            country,
            strength,
            courses)
        setColleges([...colleges, newCollege])
      }
    
      const deleteCollege = async (e, id) => {
        try {
          e.stopPropagation()
          await CollegeAPIHelper.deleteCollege(id)
          setColleges(colleges.filter(({ _id: i }) => id !== i))
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
              <label for="id" class="form-label">College ID</label>
               <input type="number" class="form-control" id="id" aria-describedby="id" onChange={({ target }) => setId(target.value)}/>
                </div>
         <div class="mb-3">
              <label for="name" class="form-label">College Name</label>
               <input type="string" class="form-control" id="name" aria-describedby="name" onChange={({ target }) => setName(target.value)}/>
                </div>
                <div class="mb-3">
                    <label for="year" class="form-label">Years active</label>
                    <input type="number" class="form-control" id="years" onChange={({ target }) => setYear(target.value)}/>
                </div>
                <div class="mb-3">
                    <label for="city" class="form-label">City</label>
                    <input type="string" class="form-control" id="city" onChange={({ target }) => setCity(target.value)}/>
                </div>
                <div class="mb-3">
                    <label for="State" class="form-label">State</label>
                    <input type="string" class="form-control" id="state" onChange={({ target }) => setState(target.value)}/>
                </div>
                <div class="mb-3">
                    <label for="country" class="form-label">Country</label>
                    <input type="string" class="form-control" id="country" onChange={({ target }) => setCountry(target.value)}/>
                </div>
                <div class="mb-3">
                    <label for="strength" class="form-label">Strength</label>
                    <input type="number" class="form-control" id="strength" onChange={({ target }) => setStrength(target.value)}/>
                </div>
                <div class="mb-3">
                    <label for="courses" class="form-label">Courses</label>
                    <input type="string" class="form-control" id="courses" onChange={({ target }) => setCourses(target.value)}/>
                </div>
                <button type="submit" class="btn btn-primary" onClick={createCollege}>Submit</button>
            </form>
            {/* <div className='image'>
                <img src={popcorn} alt='MovieList' />
            </div> */}
        </div>
<br /><br />
            {colleges.map(({ _id, id,
            name,
            year,
            city,
            state,
            country,
            strength,
            courses}, i) => (
          <div className="movie mb-4 text-justify animate__animated animate__fadeInLeft animate__delay-1s" >
            <h4 className="heading">{colleges[i].name}</h4> <br />
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
            {colleges[i].name}
            </p>
            <p className="pt-4 pb-0 text">
            <strong>Years Active: </strong>
            {colleges[i].year}
            </p>
                </div>
                <div className='right'>
                <p className="pt-4 pb-0 text">
                <strong>Strength: </strong>
            {colleges[i].strength}
            </p>
            <p className="pt-4 pb-0 text">
            <strong>Courses </strong>
            {colleges[i].courses}
            </p>
                </div>
            </div>
            <button className='btn btn-danger' id='crossButton' onClick={e => deleteCollege(e, _id)}> Delete </button>
           </div>
        ))}
        <div>
            <canvas id="myChart"></canvas>
        </div>

    </div>
    

    )
}