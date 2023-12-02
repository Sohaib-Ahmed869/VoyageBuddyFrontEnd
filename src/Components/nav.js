import React from "react";

import './nav.css'
const Navbar = () => {
    return (
        <div className="navbar">
            <div className="navbar_logo">
                <img src="./logo.png" alt="logo" />
            </div>
            <div className="navbar_links">
                <a href="/">Home</a>
                <a href="/booking">Start Planning</a>
                <a href="/saved">Saved</a>
                <a href="/contact">Contact</a>
                <a href="/login" className="loginbutton">Login</a>
                <a href="/signup" className="signupbutton">Sign up</a>
                <a href="/notifications" className="notifs"><img src="./notifs.png" alt="notifs" /></a>
            </div>
        </div>
    )
}

export default Navbar;