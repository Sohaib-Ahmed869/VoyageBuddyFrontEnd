import React from "react";
import { useState, useEffect } from "react";
import { auth } from "../firebase"; 

import { getAuth, sendEmailVerification } from 'firebase/auth';

import './Verify.css'

const Verify = () => {
    const [code1, setCode1] = React.useState("");
    const [code2, setCode2] = React.useState("");
    const [code3, setCode3] = React.useState("");
    const [code4, setCode4] = React.useState("");
    const [loading, setLoading] = React.useState(true);

    const [user, setUser] = useState(null);

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


    useEffect(() => {
        if(loading) {
            const auth = getAuth();
            sendEmailVerification(auth.currentUser)
            .then(() => {
                console.log("Email sent");
            })
            .catch((error) => {
                console.log(error);
            });
            setLoading(false);

        }
    }
        , [loading]);


    
        


    const handleCode1Change = (event) => {
        const { value } = event.target;
        if (/^\d$/.test(value)) {
            setCode1(value);
        }
    }

    const handleCode2Change = (event) => {
        const { value } = event.target;
        if (/^\d$/.test(value)) {
            setCode2(value);
        }
    }

    const handleCode3Change = (event) => {
        const { value } = event.target;
        if (/^\d$/.test(value)) {
            setCode3(value);
        }
    }

    const handleCode4Change = (event) => {
        const { value } = event.target;
        if (/^\d$/.test(value)) {
            setCode4(value);
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        window.location.href = "/newpassword";
    }


    return (
        <div className="verify">
            <div className="verify_image">
                <img src="./verify.png" alt="verify" />
            </div>
            <div className="verify_form">
                <img className="logo" src="./logo.png" alt="logo" />
                <h2>Enter the verification code</h2>
                <p>We have just sent you a 4-digit code to <br></br>example@gmail.com</p>
                <form>
                    <div className="verify_form_code">
                        <input type="text" placeholder="" value={code1} onChange={handleCode1Change} />
                        <input type="text" placeholder="" value={code2} onChange={handleCode2Change} />
                        <input type="text" placeholder="" value={code3} onChange={handleCode3Change} />
                        <input type="text" placeholder="" value={code4} onChange={handleCode4Change} />
                    </div>
                    <button type="submit" onClick={handleSubmit}>Verify</button>

                    <p className="nocode">Didn't receive a code? <a href="#">Resend</a></p>
                </form>

            </div>
        </div>
    )
}

export default Verify;