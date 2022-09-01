import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CollegeList from './components/CollegeList'
import StudentList from './components/StudentList'
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container, Nav } from "react-bootstrap";
import Home from "./components/Home";

function App() {
  return (
    // <GraphChart/>
      <Container
        className="align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
        >
          <Router>
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route path="/college" element={<CollegeList />} />
              <Route path='/student' element={<StudentList />}/>
            </Routes>
        </Router>
      </Container>
  );
}

export default App;
