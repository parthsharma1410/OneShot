import React from 'react'
import '../App.css'
import { Form, Button, Card, Alert, Navbar, Nav } from "react-bootstrap";
import Link from "react-router-dom";
import img1 from '../public/img1.jpg'

export default function Home() {
    return(
        <div className='container'>
            <div className="flexbox">
                <div className="textcolumn animate__animated animate__fadeIn">
                <h2 className="heading">Welcome to OneShot!</h2>
                <p className="para">
                    Access statistics of more than 100 colleges with just a single click
                </p>
                <button className="btngetstarted">
                    <a href="/college">View Colleges</a>
                </button> <br />
                <button className="btngetstarted">
                    {/* <a href="/college">View Colleges</a> */}
                    <a href="/student">View Students</a>
                </button>
                </div>
                {/* <div className="imagecolumn animate__animated animate__fadeIn animate__delay-1s">
                <img src={img1} />
                </div> */}
            </div>
        </div>

    )
}