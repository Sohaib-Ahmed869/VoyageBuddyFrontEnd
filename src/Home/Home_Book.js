import React from "react";

import "./Home_Book.css";

const data = [
    {
        "imgsrc": "./img3.png",
        "title": "Smart Route Optimization",
        "desc": "Utilize our cutting-edge AI algorithms to evaluate your preferences and design the optimal route, ensuring you save valuable time and effort."
    },
    {
        "imgsrc": "./img2.png",
        "title": "Tailored Adventure",
        "desc": "Mold your journey according to your desires by effortlessly adding, modifying, or removing activities from your itinerary."
    },
    {
        "imgsrc": "./img1.png",
        "title": "Real-Time Suggestions",
        "desc": "Receive instant updates and suggestions as you plan. Optimize your itinerary for the best travel adventure."
    }
]

const Home_Book = () => {
    return (
        <div className="home_book">
            <div className="home_book_text">
                <h3>Easy and Fast</h3>
                <h2>Book Your Next Trip <br></br>In 3 Easy Steps🤙🏻</h2>

                <div className="steps">
                    {data.map((item, index) => {
                        return (
                            <div className="step" key={index}>
                                <div className="step_img">
                                    <img src={item.imgsrc} alt="img" />
                                </div>
                                <div className="step_text">
                                    <h3>{item.title}</h3>
                                    <p>{item.desc}</p>
                                </div>
                            </div>
                        )
                    }
                    )}
                </div>

            </div>
            <div className="home_book_img">
                <img className="img" src="./home_book.png" alt="book" />
            </div>
        </div>
    )
}

export default Home_Book;