import React from "react";

import './Home.css'

const Home = () => {
    return (
        <div className="home_main">
            <div className="left_home">
                <div className="tagline">
                    <h1>✈ • Your Gateway to Seamless Travel Planning</h1>
                </div>
                <div className="home_text">
                    <div className="home_text1">
                        <p className="mission">Craft, Customize Your </p>
                        <p className="home_text2"> Travel Plans</p>
                        <p className="home_text3"> With Our Cutting-Edge AI Trip Planner</p>
                    </div>
                    <p className="desc">Embark on a seamless journey of exploration with TouristBot, your personal travel assistant designed to elevate your travel experience. Discover, plan, and customize your adventures effortlessly.</p>
                    <button className="home_button">Start Planning</button>
                </div>
            </div>
            <div className="home_img">
                <img className="home" src="./home.png" alt="home" />
            </div>
        </div>
    )
}

export default Home;