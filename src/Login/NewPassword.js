import React from "react";
//modal for successful password reset
import Modal from 'react-modal';

import './NewPassword.css'

const NewPassword = () => {
    const [password, setPassword] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("");
    const [modalIsOpen, setModalIsOpen] = React.useState(false);

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }
    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setModalIsOpen(true);
    }

    return (
        <div className="new_password">
            <div className="new_password_image">
                <img src="./new_password.png" alt="new_password" />
            </div>
            <div className="new_password_form">
                <img className="logo" src="./logo.png" alt="logo" />
                <h2>Create a new password</h2>
                <p className="subtitle">Your new password must be different from previous used passwords.</p>
                <p>New password</p>
                <form onSubmit={handleSubmit}>
                    <input type="password" placeholder="Password" value={password} onChange={handlePasswordChange} />
                    <p>Confirm password</p>
                    <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={handleConfirmPasswordChange} />
                    <button type="submit">Submit</button>
                </form>
            </div>
            <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)} style={
                {
                    overlay: {
                        backgroundColor: 'rgba(0, 0, 0, 0.5)'
                    },
                    content: {
                        width: '400px',
                        height: '400px',
                        margin: 'auto',
                        borderRadius: '50px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#fff'
                    }
                }
            }>
                <div className="modall">
                    <img src="./tick.png" alt="success" />
                    <h2>Password Changed Successfully!</h2>
                    <p>We recommend that you write down so you don't forget, okay?.</p>
                    <button onClick={() => setModalIsOpen(false)}>Close</button>
                </div>
            </Modal>
        </div>
    )
}

export default NewPassword;