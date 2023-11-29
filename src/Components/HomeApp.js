import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./nav";
import Home from "../Home/Home";


const HomeApp = () => {
    return (
        <div className="homeapp">
                <Navbar />
                <Home />
        </div>
    )
}

export default HomeApp;

