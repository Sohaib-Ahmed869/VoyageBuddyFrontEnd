import React from "react";
import Navbar from "../Components/nav";
import Footer from "../Components/footer";
import "./Notifications.css";

const data = [
    {
        "header": "New Booking",
        "body": "You have a new booking from John Doe",
        "time": "8:00 AM",
    },
    {
        "header": "New Appointment",
        "body": "You have a new appointment from John Doe",
        "time": "2:00 PM",
    },
    {
        "header": "New Booking",
        "body": "You have a new booking from John Doe",
        "time": "8:00 AM",
    },
    {
        "header": "New Appointment",
        "body": "You have a new appointment from John Doe",
        "time": "2:00 PM",
    },
    {
        "header": "New Booking",
        "body": "You have a new booking from John Doe",
        "time": "8:00 AM",
    },
    {
        "header": "New Appointment",
        "body": "You have a new appointment from John Doe",
        "time": "2:23 PM",
    },
];

const Notifications = () => {
    return (
        <div>
            <Navbar />
            <div className="notifications">
                <div className="notis">
                    <div className="notifications_search">
                        <div className="search-container">
                            <input type="text" placeholder="Search" className="searchbar"/>
                            <button onClick={() => alert("Search clicked")}>
                                <img src="./Search.png" alt="Search" />
                            </button>
                        </div>
                    </div>
                    <div className="notifications_content">
                        {data.map((item, index) => (
                            <div className="notifications_content_item" key={index}>
                                <div className="notifications_content_item_icon">
                                    <img src="./notifs.png" alt="Notification" />
                                </div>
                                <div className="notifications_content_item_header">
                                    <div className="notifications_content_item_heading">
                                        <div className="header">{item.header}</div>
                                        <div className="time">{item.time}</div>
                                    </div>
                                    <div className="notifications_content_item_body">
                                        {item.body}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Notifications;
