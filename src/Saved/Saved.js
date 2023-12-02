import React from "react";
import Navbar from "../Components/nav";
import Footer from "../Components/footer";
import './Saved.css';

const data = [
    {
        image: "./1.png",
        location: "Los Angeles, CA",
        price: "$1.99",
        date: "04/01/2021",
        time: "12:00 PM",
        groups: "2",
        transportation: "Car",
        duration: "14 hours and 30 minutes",
        guide: "Included",
        language: "English",
        entryfee: "Included",
    },
    {
        image: "./1.png",
        location: "Los Angeles, CA",
        price: "$1.99",
        date: "04/01/2021",
        time: "12:00 PM",
        groups: "2",
        transportation: "Car",
        duration: "14 hours and 30 minutes",
        guide: "Included",
        language: "English",
        entryfee: "Included",
    },
    {
        image: "./1.png",
        location: "Los Angeles, CA",
        price: "$1.99",
        date: "04/01/2021",
        time: "12:00 PM",
        groups: "2",
        transportation: "Car",
        duration: "14 hours and 30 minutes",
        guide: "Included",
        language: "English",
        entryfee: "Included",
    },
]

const Saved = () => {
    return (
        <div>
            <Navbar />
        <div className="Saved-main">
            <div className="Saved">
                <div className="Saved-Items">
                    <h1>Saved</h1>
                    {data.map((item) => (
                        <div className="Saved-Item" key={item.location}>
                            <div className="Saved-Item-Image">
                                <img src={item.image} alt="Saved Item" />
                            </div>

                            <div className="Saved-Item-Details">

                                <div className="column">
                                    <div className="location">
                                        <p>{item.location}</p>
                                    </div>
                                    <div className="date">
                                        <img src="./entry.png" alt="Date" />
                                        <h5>Date: </h5>
                                        <p>{item.date}</p>
                                    </div>
                                    <div className="time">
                                        <img src="./time.png" alt="Time" />
                                        <h5>Time: </h5>
                                        <p>{item.time}</p>
                                    </div>
                                    <div className="groups">
                                        <img src="./number.png" alt="Groups" />
                                        <h5>Groups: </h5>
                                        <p>{item.groups}</p>
                                    </div>
                                    <div className="transportation">
                                        <img src="./transportation.png" alt="Transportation" />
                                        <h5>Transportation: </h5>
                                        <p>{item.transportation}</p>
                                    </div>
                                </div>
                                <div className="column">
                                    <div className="price">

                                        <p>{item.price}</p>
                                    </div>

                                    <div className="duration">
                                        <img src="./icon_duration.png" alt="Duration" />
                                        <h5>Duration: </h5>
                                        <p>{item.duration}</p>
                                    </div>
                                    <div className="guide">
                                        <img src="./duration.png" alt="Guide" />
                                        <h5>Guide: </h5>
                                        <p>{item.guide}</p>
                                    </div>
                                    <div className="language">
                                        <img src="./language.png" alt="Language" />
                                        <h5>Language: </h5>
                                        <p>{item.language}</p>
                                    </div>
                                    <div className="entryfee">
                                        <img src="./entry.png" alt="Entry Fee" />
                                        <h5>Entry Fee: </h5>
                                        <p>{item.entryfee}</p>
                                    </div>
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
}

export default Saved;
