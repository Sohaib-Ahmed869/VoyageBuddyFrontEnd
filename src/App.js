import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login/Signin";
import Forgot from "./Login/ForgetPassword";
import Verify from "./Login/Verify";
import NewPassword from "./Login/NewPassword";
import Signup from "./Login/Signup";
import HomeApp from "./Components/HomeApp";
import Booking from "./Booking/Booking";
import Notifications from "./Notifications/Notifications";
import Contact from "./Contact/Contact";
import About from "./About/About";
import OrderCompleted from "./Order/OrderCompleted";
import Profile from "./Profile/Profile";

import "./App.css";
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
          <Route path="/booking" element={<Booking />} />
          <Route path="/notifications" element={<Notifications />} /> 
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/ordercompleted" element={<OrderCompleted />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Router>

      
    </div>
  );
}

export default App;
