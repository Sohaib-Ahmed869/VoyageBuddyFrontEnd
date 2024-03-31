import React from "react";
import { createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { getFirestore, collection, doc, setDoc } from "firebase/firestore";
import { Modal } from "react-bootstrap";
import { useState, useEffect } from "react";
import './Signup.css'
const URL = process.env.REACT_APP_BACKEND_URL;


const Signup = () => {
    const [firstName, setFirstName] = React.useState("");
    const [lastName, setLastName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("");
    const [date_of_birth, setDateOfBirth] = React.useState("");

    const [showModal, setShowModal] = useState(false);
    const [otp, setOTP] = useState("");
    const [verifyOTP, setVerifyOTP] = useState("");


    const [mailSent, setMailSent] = useState(false);
    useEffect(() => {
        //set OTP
        if (!mailSent)
            setOTP(Math.floor(100000 + Math.random() * 900000));
    }
        , [mailSent]);



    const handleFirstNameChange = (event) => {
        setFirstName(event.target.value);
    }
    const handleLastNameChange = (event) => {
        setLastName(event.target.value);
    }
    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }
    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
    }
    const handleDateOfBirthChange = (event) => {
        setDateOfBirth(event.target.value);
    }

    const initialSubmit = async (e) => {
        setMailSent(true);
        e.preventDefault();
        try {
            if (!firstName || !lastName || !email || !password || !confirmPassword || !date_of_birth) {
                alert("Please fill all the fields");
                return;
            }
            if (password !== confirmPassword) {
                alert("Passwords do not match");
                return;
            }

            // Send an email to the user with the OTP
            const response = await fetch(`${URL}/api/email/send`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    otp: otp
                })
            });
            const data = await response.json();
            console.log(data);
            alert("OTP sent to the entered email");
            setShowModal(true);

        } catch (error) {
            alert("Error sending email here");
            console.error(error);
            alert(error.message);
        }
    }

    const handleSubmit = async () => {
        try {


            console.log(email, password, firstName, lastName, date_of_birth)
            const userCredentials = await createUserWithEmailAndPassword(auth, email, password);


            const user = userCredentials.user;

            const firestore = getFirestore();

            const usersCollection = collection(firestore, 'users');
            const userDoc = doc(usersCollection, user.uid);

            // Set the document data using setDoc
            await setDoc(userDoc, {
                firstName: firstName,
                lastName: lastName,
                email: email,
                date_of_birth: date_of_birth,
                uid: user.uid,
                password: password,
                verified: false
            });



            window.location.href = "/login"
        } catch (error) {
            console.error(error);
            alert(error.message);
        }

    }

    const handleBackToSignIn = (event) => {
        event.preventDefault();
        window.location.href = "/login";
    }
    return (
        <div className="signup">
            <div className="signup_image">
                <img src="./signup.png" alt="signup" />
            </div>
            <div className="signup_form">
                <img className="logo" src="./logo.png" alt="logo" />
                <h2>Create account</h2>
                <p className="subtitle">Let’s get you all set up so you can access your personal account.</p>
                <form onSubmit={handleSubmit}>
                    <div className="signup_form_row">
                        <div className="signup_form_column">
                            <label htmlFor="fname">First name</label>
                            <input className="i" type="text" value={firstName} onChange={handleFirstNameChange} />
                        </div>
                        <div className="signup_form_column">
                            <label htmlFor="lname">Last name</label>
                            <input className="i" type="text" value={lastName} onChange={handleLastNameChange} />
                        </div>
                    </div>
                    <div className="signup_form_row">
                        <div className="signup_form_column">
                            <label htmlFor="email">Email</label><br></br>
                            <input className="i" type="text" value={email} onChange={handleEmailChange} />
                        </div>
                        <div className="signup_form_column">
                            <label htmlFor="date_of_birth">Date of birth</label>
                            <input className="i" type="date" value={date_of_birth} onChange={handleDateOfBirthChange} />
                        </div>
                    </div>
                    <div className="signup_form_row">
                        <div className="signup_form_column">
                            <label htmlFor="confirm_password">Confirm password</label>
                            <input className="i" type="password" value={confirmPassword} onChange={handleConfirmPasswordChange} />
                        </div>
                        <div className="signup_form_column">
                            <label htmlFor="password">Password</label>
                            <input className="i" type="password" value={password} onChange={handlePasswordChange} />
                        </div>
                    </div>
                    <div className="check1">
                        <input className="check" type="checkbox" id="remember" name="remember" value="remember" />
                        <label for="remember">Remember me</label>
                        <br></br>
                        <input className="check" type="checkbox" id="terms" name="terms" value="terms" />
                        <label for="terms">I agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a></label>
                    </div>
                    <button onClick={initialSubmit}>Create Account</button>
                    <p className="backtosignin" onClick={handleBackToSignIn}>Already have an account? <a href="#">Sign in</a></p>
                </form>

                <div className="signup_form_social">
                    <p>Or login with</p>
                    <div className="signup_form_social_icons">
                        <img src="./google.png" alt="google" />
                        <img src="./facebook.png" alt="facebook" />
                        <img src="./apple.png" alt="apple" />
                    </div>

                </div>
                <Modal show={showModal} onHide={() => setShowModal(false)} centered style={{ maxWidth: '500px', margin: 'auto', alignSelf: 'center', right: '0', left: '0', top: '0', bottom: '0', position: 'absolute', borderRadius: '10px', backgroundColor: 'white', padding: '100px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
                    <Modal.Header style={{ borderBottom: 'none' }}>
                        <Modal.Title>Enter OTP </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <input type="text" className="form-control" placeholder="Enter OTP (sent to the entered email)" onChange={(e) => setVerifyOTP(e.target.value)} style={{ marginBottom: '10px', borderRadius: '5px', border: '1px solid #ced4da', padding: '15px', width: '90%' }} />
                    </Modal.Body>
                    <Modal.Footer style={{ borderTop: 'none', display: 'flex', justifyContent: 'center' }}>
                        <button className="btn btn-primary" onClick={() => {
                            if (verifyOTP == otp) {
                                alert('OTP Verified');
                                handleSubmit();

                            } else {
                                alert('Invalid OTP');
                                alert(otp);
                            }
                        }}
                        style={{ justifyContent: 'center', marginTop: '20px', marginBottom: '20px', color: 'white', fontSize: '20px', border: '0px solid black', padding: '10px', cursor: 'pointer', backgroundColor: '#8935c4', borderRadius: '5px', width: '200px', boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)' }}
                        >Verify</button>
                    </Modal.Footer>
                </Modal>
            </div>

        </div>

    )
}
export default Signup;