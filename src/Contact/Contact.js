import React from 'react';
import Navbar from '../Components/nav';
import Footer from '../Components/footer';

import './Contact.css'

const Contact = () => {
    return (
        <div>
            <Navbar />
            <div className='contact-us'>
                <div className='contact-us-image'>
                    <img src='./contact-us.png' alt='Contact Us' />
                </div>
                <div className='contact-us-form'>
                    <h1>Contact Us</h1>
                    <p>Whether you're looking to elevate your laundry business or explore the latest trends, we're here to guide you. Connect with us at SpinFast! Call us at (414) 666 - 66666  or fill out the form below to schedule a live consultation with our laundry experts.</p>
                    <form>
                        <div className='row'>
                            <div className='name'>
                                <label htmlFor='name'>Name</label>
                                <input type='text' id='name' placeholder='Enter your name' />
                            </div>
                            <div className='email'>
                                <label htmlFor='email'>Email</label>
                                <input type='email' id='email' placeholder='Enter your email' />
                            </div>
                        </div>
                        <div className='row'>
                            <div className='phone'>
                                <label htmlFor='phone'>Phone</label>
                                <input type='text' id='phone' placeholder='Enter your phone number' />
                            </div>
                            <div className='Subject'>
                                <label htmlFor='Subject'>Subject</label>
                                <input type='text' id='Subject' placeholder='Enter your Subject' />
                            </div>
                        </div>
                        <div className='row'>
                            <div className='message'>
                                <input type='text' id='message' placeholder='Enter your message' />
                            </div>
                        </div>
                    </form>
                </div>
                
            </div >
            <Footer />
        </div>
    );
}

export default Contact;