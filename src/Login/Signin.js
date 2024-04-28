import React from "react";
import { auth } from "../firebase";
import { getFirestore, collection, doc, setDoc } from "firebase/firestore";
import { signInWithEmailAndPassword } from 'firebase/auth';

import './Signin.css'

const Login = () => {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [loading, setLoading] = React.useState(false);

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    const handleSubmit = async (event) => {
        setLoading(true);

        event.preventDefault();
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            console.log(user);

            if (user) {
                window.location.href = "/hotels";
            }

            else {
                alert("Invalid email or password");
            }
        }
        catch (error) {
            alert("Invalid email or password");
        }
        setLoading(false);


    }

    const handleForgotPassword = (event) => {
        event.preventDefault();
        window.location.href = "/forgot";
    }

    const handleGoToSignUp = (event) => {
        event.preventDefault();
        window.location.href = "/signup";
    }

    const handleGotoHome = (event) => {
        event.preventDefault();
        window.location.href = "/booking";
    }



    return (
        <div className="signin">
            {loading && (
                <div className="spinner-loader">
                    <div className="spinner"></div>
                </div>
            )}
            <div className="login">

                <div className="login_image">
                    <img src="./login.png" alt="login" />
                </div>
                <div className="login_form">
                    <img className="logo" src="./logo.png" alt="logo" />
                    <h2>Sign in</h2>
                    <p className="subtitle">Login to access your voyage account</p>
                    <form>
                        <label for="fname">Email</label>
                        <input type="text" placeholder="Enter your email" value={email} onChange={handleEmailChange} />
                        <label for="lname">Password</label>
                        <input type="password" placeholder="Password" value={password} onChange={handlePasswordChange} />
                        <p className="forgotpass" onClick={handleForgotPassword}>Forgot password?</p>
                        <button type="submit" onClick={handleSubmit}>Sign in</button>
                        <p className="donthave" onClick={handleGoToSignUp}>Don't have an account? <a href="#">Sign up</a></p>
                    </form>
                    <div className="login_form_social">
                        <p>Or sign in with</p>
                        <div className="login_form_social_icons">
                            <img src="./google.png" alt="google" />
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}
export default Login;