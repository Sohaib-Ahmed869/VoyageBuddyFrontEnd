import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./nav";
import Home from "../Home/Home";
import Home_Book from "../Home/Home_Book";
import HomePlan from "../Home/HomePlan";
import Home_Show from "../Home/Home_Show";
import Home_Letter from "../Home/NewsLetter";
import Footer from "./footer";

import "./HomeApp.css";

const HomeApp = () => {
    return (
        <div>
            <div className="homeapp">
                <Navbar />
                <Home />
                <Home_Book />
               
                <Home_Show />
                <Home_Letter />
                <Footer />
            </div>
        </div>
    )
}

export default HomeApp;

