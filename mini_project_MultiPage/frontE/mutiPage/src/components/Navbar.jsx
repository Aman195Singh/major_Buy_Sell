import React from "react";
import {Link} from "react-router-dom";

const Navbar =()=>{
    return(
        <nav>
            <Link to="/">Home</Link>
            <Link to="/signup">Signup</Link>
            <Link to="/login">Login</Link>
            <Link to="/about">About</Link>
        </nav>
    )
}
export default Navbar;