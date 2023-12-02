import React from 'react';
import Navbar from '../Components/nav';
import Footer from '../Components/footer';
import Home_Letter from '../Home/NewsLetter';
import './About.css'

const points = [
    "Lorem ipsum dolor sit amet",
    "Lorem ipsum dolor sit amet",
    "Lorem ipsum dolor sit amet",
]

const About = () => {
    return (
        <div>
            <Navbar />
            <div className='about-us'>
                <div className='about-us-image'>
                    <img src='./about-us.png' alt='about Us' />
                </div>
                <div className='about-us-content'>
                    <h4 className='subtitles'>A Little Introduction</h4>
                    <h1>Get to Know About Voyage buddy</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. quis nostrud exercitation.</p>
                    <ul>
                        {points.map((item, index) => (
                            <div>
                                
                                <li key={index}><img src='./Fill-4.png' alt='about Us' />{item}</li>
                            </div>
                        ))}
                    </ul>

                </div>

            </div >
            <Home_Letter />
            <Footer />
        </div>
    );
}

export default About;