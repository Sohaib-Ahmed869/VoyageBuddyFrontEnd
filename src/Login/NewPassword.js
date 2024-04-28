import React, { useState } from "react";
import Modal from 'react-modal';
import { db } from "../firebase";
import { collection, query, where, getDocs, updateDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";
import logo from '../Assets/logo.png'
import tick from '../Assets/tick.png'
import new_password from '../Assets/new_password.png'

import './NewPassword.css'

const NewPassword = () => {
    const { email } = useParams();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
    }

    const handleSubmit = async (event) => {
        console.log("email: ", email);
        event.preventDefault();
        if (password !== confirmPassword) {
            setErrorMessage("Passwords do not match.");
            return;
        }

        try {
            const usersCollection = collection(db, "users");
            const q = query(usersCollection, where("email", "==", email));
            const querySnapshot = await getDocs(q);
            
            if (!querySnapshot.empty) {
                querySnapshot.forEach(async (doc) => {
                    await updateDoc(doc.ref, { password });
                });
                setModalIsOpen(true);
            } else {
                console.log("User not found.");
                setErrorMessage("User not found.");
            }
        } catch (error) {
            alert("Error updating password");
            console.log("Error updating password: ", error);
            setErrorMessage("Failed to update password. Please try again.");
        }
    }

  return (
    <div className="new_password">
      <div className="new_password_image">
        <img src={new_password} alt="new_password" />
      </div>
      <div className="new_password_form">
        <img className="logo" src={logo} alt="logo" />
        <h2>Create a new password</h2>
        <p className="subtitle">
          Your new password must be different from previous used passwords.
        </p>
        <p>New password</p>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
          />
          <p>Confirm password</p>
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
          content: {
            width: "400px",
            height: "400px",
            margin: "auto",
            borderRadius: "50px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#fff",
          },
        }}
      >
        <div className="modall">
          <img src={tick} alt="tick" />
          <h2>Password Changed Successfully!</h2>
          <p>We recommend that you write down so you don't forget, okay?.</p>
          <button onClick={() => {
            setModalIsOpen(false);
            window.location.href = "/";
          }
            }>Go back to sign in</button>
        </div>
      </Modal>
    </div>
  );
};

export default NewPassword;
