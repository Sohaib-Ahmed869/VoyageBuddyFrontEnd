import React, { useState } from "react";
import Select from "react-select";
import Hero from "./Hero";
import Navbar from "../Components/nav";
import Footer from "../Components/footer";
import DateTimeRangePicker from "./DatePicker";
import './Booking.css';

const top_destination = [
    {
        id: 1,
        img: "./1.png",
        title: "Location 1",
        price: "$100",
        days: "3 days",
    },
    {
        id: 2,
        img: "./1.png",
        title: "Location 2",
        price: "$200",
        days: "5 days",
    },
    {
        id: 3,
        img: "./1.png",
        title: "Location 3",
        price: "$300",
        days: "7 days",
    },
]


const Booking = () => {
    // State for date, time, location, and number of people
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [selectedPeople, setSelectedPeople] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);

    // Dummy data for locations, people, and time options
    const locations = [
        { value: "location1", label: "Location 1" },
        { value: "location2", label: "Location 2" },
        // Add more locations as needed
    ];

    const peopleOptions = [
        { value: 1, label: "1 person" },
        { value: 2, label: "2 persons" },
        // Add more options up to 8
    ];

    const timeOptions = [
        { value: "morning", label: "Morning" },
        { value: "afternoon", label: "Afternoon" },
        { value: "evening", label: "Evening" },
        // Add more time options as needed
    ];

    const handleSearch = () => {
       window.location.href = "/precheckout";
    };

    return (
        <div>
            <Navbar />
            <Hero />

            <div className="search-component">
                <div className="search-top">
                    <h3>DESCRIBE YOUR DESTINATION</h3>
                </div>
                <div className="search-bottom">
                    <div className="date">
                        <h2>Date</h2>


                    </div>
                    <div className="time">
                        <h2>Time</h2>
                        <Select
                            options={timeOptions}
                            value={selectedTime}
                            onChange={(value) => setSelectedTime(value)}
                        />
                    </div>
                    <div className="location">
                        <h2>Location</h2>
                        <Select
                            options={locations}
                            value={selectedLocation}
                            onChange={(value) => setSelectedLocation(value)}
                        />
                    </div>
                    <div className="people">
                        <h2>People</h2>
                        <Select
                            options={peopleOptions}
                            value={selectedPeople}
                            onChange={(value) => setSelectedPeople(value)}
                        />
                    </div>

                    <div className="search-button">
                        <button onClick={handleSearch}>
                            <img src="./search.png" alt="search" />
                        </button>
                    </div>
                </div>
            </div>
            <div className="ad">
                <img src="./ad.png" alt="ad" />
            </div>
            <div className="top-destination">
                <h1>✈ • Top Destinations</h1>
                <p>Going somewhere to celebrate this season? Whether you’re going home or somewhere to roam, <br></br>we’ve got the travel tools to get you to your destination.</p>
                <div className="top-destination-container">
                    {top_destination.map((item) => (
                        <div className="top-destination-card" key={item.id}>
                            <img src={item.img} alt="top-destination" />
                            <div className="top-destination-card-info">
                                <h3>{item.price}</h3>
                                <h2>{item.title}</h2>
                                <div className="line">
                                    <h4>✈ {item.days} trip </h4>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Booking;
