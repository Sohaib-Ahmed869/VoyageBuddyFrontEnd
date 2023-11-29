import React from "react";

import './Signin.css'

const Login = () => {
    const [firstName, setFirstName] = React.useState("");
    const [password, setPassword] = React.useState("");

    const handleFirstNameChange = (event) => {
        setFirstName(event.target.value);
    }
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        
    }

    const handleForgotPassword = (event) => {
        event.preventDefault();
        window.location.href = "/forgot";
    }

    const handleGoToSignUp = (event) => {
        event.preventDefault();
        window.location.href = "/signup";
    }


    return (
        <div className="login">
            <div className="login_image">
                <img src="./login.png" alt="login" />
            </div>
            <div className="login_form">
                <img className="logo" src="./logo.png" alt="logo" />
                <h2>Sign in</h2>
                <p className="subtitle">Login to access your voyage account</p>
                <form>
                    <label for="fname">First name</label>
                    <input type="text" placeholder="First Name" value={firstName} onChange={handleFirstNameChange} />
                    <label for="lname">Password</label>
                    <input type="password" placeholder="Password" value={password} onChange={handlePasswordChange} />
                    <p className="forgotpass" onClick={handleForgotPassword}>Forgot password?</p>
                    <button type="submit">Sign in</button>
                    <p className="donthave" onClick={handleGoToSignUp}>Don't have an account? <a href="#">Sign up</a></p>
                </form>
                <div className="login_form_social">
                    <p>Or sign in with</p>
                    <div className="login_form_social_icons">
                        <img src="./google.png" alt="google" />
                        <img src="./facebook.png" alt="facebook" />
                        <img src="./apple.png" alt="apple" />
                    </div>

                </div>
            </div>
        </div>
    )
}
export default Login;