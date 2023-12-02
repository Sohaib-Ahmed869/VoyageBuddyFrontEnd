import React from 'react';
import Navbar from '../Components/nav';
import Footer from '../Components/footer';

import './OrderCompleted.css'

const OrderCompleted = () => {
    return (
        <div>
            <Navbar />
            <div className='order-completed'>
                <img src='./Fill-4.png' alt='Order Completed' />
                <h1>Your Order is Complete!</h1>
                <h2>You will be receiving a confirmation email with order details.</h2>
                <a href='/'>Go to the Home Page</a>
            </div >
            <Footer />
        </div>
    );
}

export default OrderCompleted;