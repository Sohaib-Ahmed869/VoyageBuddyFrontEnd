import React from "react";
import Navbar from "../Components/nav";
import Footer from "../Components/footer";

import './Plan.css'

const date = {
    heading: "5-day Trip to Los Angeles",
    tripFrom: "25 Nov 2023",
    tripTo: "30 Nov 2023",
    days: {
        day1: {
            location: "Los Angeles",
            desc: "Morning. Start your day with a delightful breakfast at Bar Amá, offering a modern take on Tex-Mex cuisine. Afterward, immerse yourself in the vibrant arts scene at the Museum of Latin American Art (MOLAA) in Long Beach, exploring the works of renowned artists. Afternoon. For lunch, head to Met Him At A Bar for a casual yet delicious meal. Afterward, take a guided tour of the historic Greystone Mansion and Park in Beverly Hills, learning about the opulent lifestyle of the Doheny family. Evening.Dine at Redbird, a sophisticated restaurant housed in a former cathedral, offering a menu inspired by the vibrant flavors of Los Angeles.After dinner, take a leisurely walk through the Los Angeles Original Farmers Market and enjoy the variety of local produce and artisanal goods. Bedtime.Find amazing hotels in Los Angeles for every budget.",
            places: [
                {
                    img: "./1.png",
                    name: "Bar Amá",
                    price: "$$",
                    day: "Monday",
                    desc: "The real magic is here where you can enjoy the best Tuscan wine and eat ..."
                },
                {
                    img: "./1.png",
                    name: "Bar Amá",
                    price: "$$",
                    day: "Monday",
                    desc: "The real magic is here where you can enjoy the best Tuscan wine and eat ..."
                },
                {
                    img: "./1.png",
                    name: "Bar Amá",
                    price: "$$",
                    day: "Monday",
                    desc: "The real magic is here where you can enjoy the best Tuscan wine and eat ..."
                },
                {
                    img: "./1.png",
                    name: "Bar Amá",
                    price: "$$",
                    day: "Monday",
                    desc: "The real magic is here where you can enjoy the best Tuscan wine and eat ..."
                }
            ]
        },
        day2: {
            location: "Los Angeles",
            desc: "Morning. Start your day with a delightful breakfast at Bar Amá, offering a modern take on Tex-Mex cuisine. Afterward, immerse yourself in the vibrant arts scene at the Museum of Latin American Art (MOLAA) in Long Beach, exploring the works of renowned artists. Afternoon. For lunch, head to Met Him At A Bar for a casual yet delicious meal. Afterward, take a guided tour of the historic Greystone Mansion and Park in Beverly Hills, learning about the opulent lifestyle of the Doheny family. Evening.Dine at Redbird, a sophisticated restaurant housed in a former cathedral, offering a menu inspired by the vibrant flavors of Los Angeles.After dinner, take a leisurely walk through the Los Angeles Original Farmers Market and enjoy the variety of local produce and artisanal goods. Bedtime.Find amazing hotels in Los Angeles for every budget.",
            places: [
                {
                    img: "./1.png",
                    name: "Bar Amá",
                    price: "$$",
                    day: "Monday",
                    desc: "The real magic is here where you can enjoy the best Tuscan wine and eat ..."
                },
                {
                    img: "./1.png",
                    name: "Bar Amá",
                    price: "$$",
                    day: "Monday",
                    desc: "The real magic is here where you can enjoy the best Tuscan wine and eat ..."
                },
                {
                    img: "./1.png",
                    name: "Bar Amá",
                    price: "$$",
                    day: "Monday",
                    desc: "The real magic is here where you can enjoy the best Tuscan wine and eat ..."
                },
                {
                    img: "./1.png",
                    name: "Bar Amá",
                    price: "$$",
                    day: "Monday",
                    desc: "The real magic is here where you can enjoy the best Tuscan wine and eat ..."
                }
            ]
        },
    }
}

const Trip = () => {

    const budget = 10000;
    const activities = 5000;
    const transport = 5000;
    return (
        <div>
            <Navbar />
            <div className="trip">
                <div className="main-image">
                    <h1>{date.heading}</h1>
                    <p>{date.tripFrom} - {date.tripTo}</p>
                    <button>Regenerate Trip</button>
                </div>

                <div className="days">
                    {Object.keys(date.days).map((day) => (
                        <div className="day">
                            <div className="buttons">
                                <button>Add Places</button>
                                <button>Modify</button>
                            </div>
                            <h2>{date.days[day].location}</h2>
                            
                            <p className="desc">{date.days[day].desc}</p>
                            <div className="places">
                                {date.days[day].places.map((place) => (
                                    <div className="place">
                                        <img src={place.img} alt={place.name} />
                                        <div className="place-info">
                                            <h3>{place.name}</h3>
                                            <p>{place.price}</p>
                                            <p>{place.day}</p>
                                            <p>{place.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                     <button className="addmore">Add Another Day</button>
                    <div className="budget-breakdown">
                        <h1>Budget Breakdown: ${budget} in Total </h1>
                        <h2>Activities: {activities}</h2>
                        <h2>Transport: {transport}</h2>
                        <button>Buy this itinerary</button>
                    </div>
                </div>
               
                <Footer />
            </div>
        </div>
    );

}


export default Trip;