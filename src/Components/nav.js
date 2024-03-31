import React, { useState, useEffect } from "react";
import './nav.css';
import { auth } from '../firebase'
import { collection, doc, getDoc, getDocs, setDoc, addDoc, updateDoc, query, where } from "firebase/firestore";
import { firestore } from '../firebase';

const Navbar = () => {
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [user, setUser] = useState(null);

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!isMobileMenuOpen);
    };

    const onLogout = async () => {
        await auth.signOut();
        window.location.href = "/";
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                console.log(user.uid);
                setUser(user);

            } else {
                window.location.href = "/login";
                console.log("No user is signed in");
            }
        });
        return unsubscribe;
    }
        , []);
    return (
        <div className="navbar">
            <div className="navbar_logo">
                <img src="./logo.png" alt="logo" />
            </div>
            <div className={`navbar_links ${isMobileMenuOpen ? 'show' : ''}`}>
                <a href="/">Home</a>
                <a href="/hotels">Start Planning</a>
                <a href="/saved">Saved</a>
                <a href="/contact">Contact</a>
                {user ? <a
                style={{ cursor: 'pointer'}}
                 onClick={onLogout}>Logout</a> : <a href="/login">Login</a>}
                {user ? null: <a href="/signup">Signup</a>}
                {/* <a href="/notifications" className="notifs"><img src="./notifs.png" alt="notifs" /></a> */}
            </div>
            <div className="mobile_menu_icon" onClick={toggleMobileMenu}>
                <div className={`bar ${isMobileMenuOpen ? '' : ''}`}></div>
                <div className={`bar ${isMobileMenuOpen ? '' : ''}`}></div>
                <div className={`bar ${isMobileMenuOpen ? '' : ''}`}></div>
            </div>
        </div>
    );
}

export default Navbar;
