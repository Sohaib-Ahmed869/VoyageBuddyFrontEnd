import React from "react";
import { useState } from "react";
import { Slider } from "@mui/material";
import './PreCheckout.css'
import Footer from "../Components/footer";
import Navbar from "../Components/nav";


const possibleratings = [
    "0+", "1+", "2+", "3+", "4+"
]
const PreCheckout = () => {
    const city = "Milwaukee";

    const [priceSlider, setPriceSlider] = useState(0);

    const handlePriceSliderChange = (event) => {
        setPriceSlider(event.target.value);
    }

    const [rating, setRating] = useState(0);

    const handleRatingChange = (event) => {
        setRating(event.target.value);
    }

    const [amenities, setAmenities] = useState([]);

    const handleAmenitiesChange = (event) => {
        if (event.target.checked) {
            setAmenities([...amenities, event.target.value]);
        } else {
            setAmenities(amenities.filter((amenity) => amenity !== event.target.value));
        }
    }

    const [trips, setTrips] = useState([]);

    const handleTripsChange = (event) => {
        if (event.target.checked) {
            setTrips([...trips, event.target.value]);
        } else {
            setTrips(trips.filter((trip) => trip !== event.target.value));
        }
    }

    const handleNext = () => {
        window.location.href = "/trip";
    }


    return (
        <div>
            <Navbar />
            <div className="precheckout">
                <h1>What to find in {city}?</h1>
                <p className="subtitle">Let our AI know what kind of things you'd like to do on your trip, and we'll suggest the best sights for you!</p>

                <div className="precheckout_form">
                    <div className="precheckout_form_left">
                        <div className="precheckout_form_left_price">
                            <p>Price</p>
                            <Slider
                                className="slider"
                                value={priceSlider}
                                onChange={handlePriceSliderChange}
                                valueLabelDisplay="auto"
                                step={1000}
                                marks={true}
                                min={1000}
                                max={34000}
                            />
                        </div>
                        <div className="precheckout_form_left_rating">
                            <p>Rating</p>
                            {possibleratings.map((possiblerating) => (
                                <button key={possiblerating} type="button" className={rating === possiblerating ? "precheckout_form_left_rating_button_selected" : "precheckout_form_left_rating_button"} onClick={handleRatingChange} value={possiblerating}>{possiblerating}</button>
                            ))}
                            
                        </div>
                        <div className="precheckout_form_left_amenities">
                            <p>Amenities</p>
                            <div className="precheckout_form_left_amenities_list">
                                <div className="precheckout_form_left_amenities_list_item">
                                    <input type="checkbox" id="wifi" name="wifi" value="wifi" onChange={handleAmenitiesChange} />
                                    <label htmlFor="wifi">Wifi</label>
                                </div>
                                <div className="precheckout_form_left_amenities_list_item">
                                    <input type="checkbox" id="parking" name="parking" value="parking" onChange={handleAmenitiesChange} />
                                    <label htmlFor="parking">Parking</label>
                                </div>
                                <div className="precheckout_form_left_amenities_list_item">
                                    <input type="checkbox" id="kitchen" name="kitchen" value="kitchen" onChange={handleAmenitiesChange} />
                                    <label htmlFor="kitchen">Kitchen</label>
                                </div>
                                <div className="precheckout_form_left_amenities_list_item">
                                    <input type="checkbox" id="pool" name="pool" value="pool" onChange={handleAmenitiesChange} />
                                    <label htmlFor="pool">Pool</label>
                                </div>
                                <div className="precheckout_form_left_amenities_list_item">
                                    <input type="checkbox" id="gym" name="gym" value="gym" onChange={handleAmenitiesChange} />
                                    <label htmlFor="gym">Gym</label>
                                </div>
                                <div className="precheckout_form_left_amenities_list_item">
                                    <input type="checkbox" id="pets" name="pets" value="pets" onChange={handleAmenitiesChange} />
                                    <label htmlFor="pets">Pets</label>
                                </div>
                            </div>
                        </div>
                        <div className="precheckout_form_left_trips">
                            <p>Trips</p>
                            <div className="precheckout_form_left_trips_list">
                                <div className="precheckout_form_left_trips_list_item">
                                    <input type="checkbox" id="family" name="family" value="family" onChange={handleTripsChange} />
                                    <label htmlFor="family">Family</label>
                                </div>
                                <div className="precheckout_form_left_trips_list_item">
                                    <input type="checkbox" id="friends" name="friends" value="friends" onChange={handleTripsChange} />
                                    <label htmlFor="friends">Friends</label>
                                </div>
                                <div className="precheckout_form_left_trips_list_item">
                                    <input type="checkbox" id="couples" name="couples" value="couples" onChange={handleTripsChange} />
                                    <label htmlFor="couples">Couples</label>
                                </div>
                                <div className="precheckout_form_left_trips_list_item">
                                    <input type="checkbox" id="solo" name="solo" value="solo" onChange={handleTripsChange} />
                                    <label htmlFor="solo">Solo</label>
                                </div>
                                <div className="precheckout_form_left_trips_list_item">
                                    <input type="checkbox" id="business" name="business" value="business" onChange={handleTripsChange} />
                                    <label htmlFor="business">Business</label>
                                </div>
                            </div>
                        </div>
                        <div className="precheckout_form_left_submit">
                            <button className="back" type="submit">Back</button>
                            <button className="next" type="submit" onClick={
                                handleNext
                            }>Build my trip</button>
                        </div>
                    </div>

                </div>
            </div>
            <Footer />
        </div >
    );
}

export default PreCheckout;


