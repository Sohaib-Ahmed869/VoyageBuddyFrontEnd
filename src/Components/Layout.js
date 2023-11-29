import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./nav";

const Layout = ({ children }) => {
    return (
        <div>
            <Router>
                <Navbar />
                <div className="layout">
                    <Routes>
                        {children}
                    </Routes>
                </div>
            </Router>
        </div>
    )
}

export default Layout;