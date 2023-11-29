import React from "react";

import './Signup.css'

const Signup = () => {
    const [firstName, setFirstName] = React.useState("");
    const [lastName, setLastName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("");
    const [date_of_birth, setDateOfBirth] = React.useState("");

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

    const handleSubmit = (event) => {
        event.preventDefault();
        window.location.href = "/verify";
    }

    const handleBackToSignIn = (event) => {
        event.preventDefault();
        window.location.href = "/";
    }
    return (
        <div className="signup">
            <div className="signup_image">
                <img src="./signup.png" alt="signup" />
            </div>
            <div className="signup_form">
                <img className="logo" src="./logo.png" alt="logo" />
                <h2>Create account</h2>
                <p className="subtitle">Let’s get you all st up so you can access your personal account.</p>
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
                            <label htmlFor="email">Email</label>
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
                    <button type="submit">Create Account</button>
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
            </div>
        </div>
    )
}
export default Signup;