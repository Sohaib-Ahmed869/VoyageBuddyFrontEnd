import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login/Signin";
import Forgot from "./Login/ForgetPassword";
import Verify from "./Login/Verify";
import NewPassword from "./Login/NewPassword";
import Signup from "./Login/Signup";
import HomeApp from "./Components/HomeApp";
import Layout from "./Components/Layout";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/forgot" element={<Forgot />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/newpassword" element={<NewPassword />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<HomeApp />} />
        </Routes>
      </Router>

      
    </div>
  );
}

export default App;
