import React from "react";

import './Home_Ltter.css';

const Home_Letter = () => {
    return (
        <div className="newsletter">
            <div className="Home_Letter">
                <div className="Home_Letter_Text">
                    <h1>Subscribe to get information, latest news and other <br></br> interesting offers</h1>
                    <form>
                        <input type="text" placeholder="Enter your email address" />
                        <button type="submit">Subscribe</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Home_Letter;