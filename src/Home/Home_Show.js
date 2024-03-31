import React from "react";

import "./Home_Show.css";

const Home_Show = () => {
    return (

        <div className="home_show">
            <div className="services">
                <div className="service1">
                    <div className="text">
                        <h1>Flights</h1>
                        <p>Search Flights & Places Hire to our most popular destinations</p>
                        <button className="btn" onClick={() => window.location.href = "/hotels"}><img src="./arrow.png" alt="pic" /> Show Flights</button>
                    </div>
                </div>
                <div className="service2">
                    <div className="text">
                        <h1>Hotels</h1>
                        <p>Search Hotels & Places Hire to our most popular destinations</p>
                        <button className="btn" onClick={() => window.location.href = "/hotels"}><img src="./arrow.png" alt="pic" /> Show Hotels</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home_Show;