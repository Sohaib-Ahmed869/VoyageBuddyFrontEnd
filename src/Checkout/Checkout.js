import React from "react";

import Navbar from "../Components/nav";
import Footer from "../Components/footer";

import Modal from 'react-modal';

import './Checkout.css'

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

const Checkout = () => {

    const [modalIsOpen, setModalIsOpen] = React.useState(false);


    const calculateTotal = () => {
        // Assuming each item has a 'price' property
        const total = data.reduce((acc, item) => acc + parseFloat(item.price.replace("$", "")), 0);

        // You can add additional logic for discounts, taxes, service fees, etc.
        const discount = 0;
        const taxes = 0;
        const serviceFare = 0;

        // Calculate the total including discounts, taxes, and service fees
        const finalTotal = total - discount + taxes + serviceFare;

        return finalTotal.toFixed(2); // Return the total with two decimal places
    };


    return (
        <div>
            <Navbar />
            <div className="Checkout-main">
                <div className="Checkout">
                    <div className="Checkout-Items">
                        <h1>Checkout</h1>
                        {data.map((item) => (
                            <div className="Checkout-Item" key={item.location}>
                                <div className="Checkout-Item-Image">
                                    <img src={item.image} alt="Checkout Item" />
                                </div>

                                <div className="Checkout-Item-Details">

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
            <div className="Total">
                <div className="Total-Details">
                    <div className="row">
                        <h3>Base Fare:</h3>
                        <p>${calculateTotal()}</p>
                    </div>
                    <div className="row">
                        <h3>Discount:</h3>
                        <p>$0.00</p>
                    </div>
                    <div className="row">
                        <h3>Taxes:</h3>
                        <p>$0.00</p>
                    </div>
                    <div className="row">
                        <h3>Service Fee:</h3>
                        <p>$0.00</p>
                    </div>
                </div>
                <div className="row">
                    <h2>Total:</h2>
                    <p className="total">${calculateTotal()}</p>
                </div>
                <button className="Checkout-Button" onClick={() => setModalIsOpen(true)}>Checkout</button>
            </div>

            <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)} style={
                {
                    overlay: {
                        backgroundColor: 'rgba(0, 0, 0, 0.5)'
                    },
                    content: {
                        width: '700px',
                        height: '600px',
                        margin: 'auto',
                        borderRadius: '50px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#fff'
                    }
                }
            }>
                <div className="payment-modal">
                    <h1>Add Card Details</h1>
                    <form className="payment-form">
                        <div className="form-row">
                            <div className="form-label">
                                <label htmlFor="card">Card Number</label>
                                <input type="text" id="card" className="form-input" placeholder="Enter your card number" />
                            </div>
                            <div className="form-label">
                                <label htmlFor="expiry">Expiry Date</label>
                                <input type="text" id="expiry" className="form-input" placeholder="Enter expiry date" />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-label">
                                <label htmlFor="cvv">CVV</label>
                                <input type="text" id="cvv" className="form-input" placeholder="Enter CVV" />
                            </div>
                            <div className="form-label">
                                <label htmlFor="zip">Zip Code</label>
                                <input type="text" id="zip" className="form-input" placeholder="Enter zip code" />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-label">
                                <label htmlFor="name">Name on card</label>
                                <input type="text" id="name" className="form-input" placeholder="Enter name on card" />
                            </div>
                            <div className="form-label">
                                <label htmlFor="country">Country</label>
                                <input type="text" id="country" className="form-input" placeholder="Enter country" />
                            </div>
                        </div>

                        <button

                            className="submit-button"
                            onClick={() => setModalIsOpen(false)}
                            >Pay</button>
                    </form>

                    <div className="terms-of-service">
                        <p>By confirming your subscription, you allow The Outdoor Inn Crowd Limited to charge your card for this payment and future payments in accordance with their terms. You can always cancel your subscription.</p>
                    </div>
                </div>

            </Modal>


            <Footer />
        </div>
    );
}

export default Checkout;
