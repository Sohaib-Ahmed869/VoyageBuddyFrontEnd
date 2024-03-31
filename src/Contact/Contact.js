import React, { useState, useEffect } from 'react';
import Navbar from '../Components/nav';
import Footer from '../Components/footer';
import { auth } from '../firebase'
import { collection, doc, getFirestore, setDoc, addDoc, updateDoc, query, where } from "firebase/firestore";
import { firestore } from '../firebase';

import './Contact.css'

const Contact = () => {
    const [user, setUser] = useState(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                console.log(user.uid);
                setUser(user);

            } else {
                window.location.href = "/login";
                console.log("No user is signed in");
            }
        });
        return unsubscribe;
    }
        , []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            if (!name || !email || !phone || !subject || !message) {
                alert("Please fill all the fields");
                return;
            }

            const firestore = getFirestore();

            const contactCollection = collection(firestore, 'contact');
            //give it a new document id
            const contactDoc = doc(contactCollection);

            // Set the document data using setDoc
            await setDoc(contactDoc, {
                name: name,
                email: email,
                phone: phone,
                subject: subject,
                message: message,
                uid: user.uid
            });

            alert("Message sent successfully");
            setName('');
            setEmail('');
            setPhone('');
            setSubject('');
            setMessage('');


        } catch (error) {
            console.error(error);
            alert(error.message);
        }
    }

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
                                <input type='text' id='name' placeholder='Enter your name' onChange={(e) => setName(e.target.value)} value={name} />
                            </div>
                            <div className='email'>
                                <label htmlFor='email'>Email</label>
                                <input type='email' id='email' placeholder='Enter your email' onChange={(e) => setEmail(e.target.value)} value={email} />
                            </div>
                        </div>
                        <div className='row'>
                            <div className='phone'>
                                <label htmlFor='phone'>Phone</label>
                                <input type='text' id='phone' placeholder='Enter your phone number' onChange={(e) => setPhone(e.target.value)} value={phone} />
                            </div>
                            <div className='Subject'>
                                <label htmlFor='Subject'>Subject</label>
                                <input type='text' id='Subject' placeholder='Enter your Subject' onChange={(e) => setSubject(e.target.value)} value={subject} />
                            </div>
                        </div>
                        <div className='row'>
                            <div className='message'>
                                <input type='text' id='message' placeholder='Enter your message' onChange={(e) => setMessage(e.target.value)} value={message} />
                            </div>
                        </div>
                        <div className='row'>
                            <button
                             style={{ justifyContent: 'center', marginTop: '20px', marginBottom: '20px', color: 'white', fontSize: '20px', border: '1px solid black', padding: '10px', cursor: 'pointer', backgroundColor: '#8935c4', borderRadius: '5px' }}
                             onClick={handleSubmit}>Submit</button>  
                        </div>
                    </form>
                </div>

            </div >
            <Footer />
        </div>
    );
}

export default Contact;