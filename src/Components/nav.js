import React, { useState } from "react";
import './nav.css';

const Navbar = () => {
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <div className="navbar">
            <div className="navbar_logo">
                <img src="./logo.png" alt="logo" />
            </div>
            <div className={`navbar_links ${isMobileMenuOpen ? 'show' : ''}`}>
                <a href="/">Home</a>
                <a href="/booking">Start Planning</a>
                <a href="/saved">Saved</a>
                <a href="/contact">Contact</a>
                <a href="/login" className="loginbutton">Login</a>
                <a href="/signup" className="signupbutton">Sign up</a>
                <a href="/notifications" className="notifs"><img src="./notifs.png" alt="notifs" /></a>
            </div>
            <div className="mobile_menu_icon" onClick={toggleMobileMenu}>
                <div className={`bar ${isMobileMenuOpen ? 'change' : ''}`}></div>
                <div className={`bar ${isMobileMenuOpen ? 'change' : ''}`}></div>
                <div className={`bar ${isMobileMenuOpen ? 'change' : ''}`}></div>
            </div>
        </div>
    );
}

export default Navbar;
