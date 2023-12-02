import React from "react";

import "./HomePlan.css";

const data = [
    {
        "imgsrc": "./pic.png",
        "city": "Istanbul",
        "country": "Turkey",
    },
    {
        "imgsrc": "./pic.png",
        "city": "Sydney",
        "country": "Australia",
    },
    {
        "imgsrc": "./pic.png",
        "city": "Paris",
        "country": "France",
    },
    {
        "imgsrc": "./pic.png",
        "city": "Istanbul",
        "country": "Turkey",
    },
    {
        "imgsrc": "./pic.png",
        "city": "Sydney",
        "country": "Australia",
    },
    {
        "imgsrc": "./pic.png",
        "city": "Paris",
        "country": "France",
    },
    {
        "imgsrc": "./pic.png",
        "city": "Sydney",
        "country": "Australia",
    },
    {
        "imgsrc": "./pic.png",
        "city": "Paris",
        "country": "France",
    }
]

const HomePlan = () => {
    return (
        <div className="home_plan_main">
            <div className="home_plan">
                <div className="home_plan_text">
                    <h3>Plan your perfect trip</h3>
                    <p className="subtitle">Search Flights & Places Hire to our most popular destinations</p>
                </div>
                <div className="home_plan_main">
                    <div className="home_plan_container">
                        {data.map((item, index) => {
                            return (
                                <div className="home_plan_container_item" key={index}>
                                    <img src={item.imgsrc} alt="img" />
                                    <div className="home_plan_img_container_item_text">
                                        <h1 className="location">{item.city},{item.country}</h1>
                                        <ul>
                                            <li>Flights</li>
                                            <li>Hotels</li>
                                            <li>Resorts</li>
                                        </ul>
                                    </div>
                                </div>
                            )
                        }
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomePlan;
