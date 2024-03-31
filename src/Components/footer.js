import React from "react";

import "./footer.css";

const Footer = () => {
    return (
        <div className="footer">
            <div className="footer_top">
                <div className="footer_top_left">
                    <img src="./logo.png" alt="logo" />
                    <p>Plan your next travel with us</p>
                    <div className="footer_top_left_icons">
                        <i className="fab fa-facebook-f"></i>
                        <i className="fab fa-twitter"></i>
                        <i className="fab fa-instagram"></i>
                        <i className="fab fa-linkedin-in"></i>
                    </div>
                </div>
                <div className="footer_top_right">
                    <div className="footer_top_right_1">
                        <h3>Explore</h3>
                        <ul>
                            <li><a>Our Services</a></li>
                            <li><a>Pricing</a></li>
                            <li><a>Reviews</a></li>
                        </ul>
                    </div>
                    <div className="footer_top_right_2">
                        <h3>Company</h3>
                        <ul>
                            <li><a href="/about">About</a></li>
                            <li><a>Contact Us</a></li>
                        </ul>
                    </div>
                    <div className="footer_top_right_3">
                        <h3>Support</h3>
                        <ul>
                            <li><a>Getting Started</a></li>
                            <li><a>Help center</a></li>
                            <li><a>Server status</a></li>
                            <li><a>Report a bug</a></li>
                        </ul>
                    </div>
                    <div className="footer_top_right_4">
                        <h3>Contact Us</h3>
                        <ul>
                            <li><a>contact@company.com</a></li>
                            <li><a>(414) 666 - 66666</a></li>
                            <li><a>794 Loem ipsm San Francisco, 94102 </a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="footer_bottom">
                <div className="footer_bottom_left">
                    <h3>© 2021 Travel Planner. All rights reserved.</h3>
                </div>
                <div className="footer_bottom_right">
                    <ul>
                        <li>All Rights Reserved | </li>
                        <li><a> Terms and Conditions</a> |</li>
                        <li><a>Privacy Policy</a></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Footer;