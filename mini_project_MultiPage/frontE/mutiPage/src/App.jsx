
import React from "react";
import {Routes ,Route} from 'react-router-dom';
import Home from "./pages/Home"; 
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import About from "./pages/About";
import Navbar from "./components/Navbar"
// import from '.pages/';
function App() {


  return (
    <>
      <Navbar />
      <Routes>
        <Route path = "/" element ={<Home/>}/>
        <Route path = "/Login" element ={<Login/>}/>
        <Route path = "/Signup" element ={<Signup/>}/>
        <Route path = "/About" element ={<About/>}/>
        {/* // <Route path = "/" element ={<Home/>} */}
      </Routes>
    </>
  )
}

export default App
