import React from "react";

import './nav.css'
const Navbar = () => {
    return (
        <div className="navbar">
            <div className="navbar_logo">
                <img src="./logo.png" alt="logo" />
            </div>
            <div className="navbar_links">
                <a href="#">Home</a>
                <a href="#">Start Planning</a>
                <a href="#">Saved</a>
                <a href="#">Contact</a>
                <a href="#" className="loginbutton">Login</a>
                <a href="#" className="signupbutton">Sign up</a>
                <a href="#" className="notifs"><img src="./notifs.png" alt="notifs" /></a>
            </div>
        </div>
    )
}

export default Navbar;