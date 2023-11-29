import React from "react";

import './ForgetPassword.css'

const Forgot = () => {
    const [email, setEmail] = React.useState("");

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        window.location.href = "/verify";   
    }

    const handleBackToSignIn = (event) => {
        event.preventDefault();
        window.location.href = "/";
    }

    return (
        <div className="forgot">
            <div className="forgot_image">
                <img src="./forgot.png" alt="forgot" />
            </div>
            <div className="forgot_form">
                <img className="logo" src="./logo.png" alt="logo" />
                <h2>Forgot your password?</h2>
                <p>Don’t worry, happens to all of us. Enter your email below to recover your password Enter your email and we'll send you a link to reset your password.</p>
                <p>Email</p>
                <form>
                    <input type="text" value={email} onChange={handleEmailChange} />
                    <button type="submit" onClick={handleSubmit}>Send</button>
                </form>
                <p className="backtosignin" onClick={handleBackToSignIn}>Back to <a href="#">Sign in</a></p>
            </div>
        </div>
    )
}

export default Forgot;