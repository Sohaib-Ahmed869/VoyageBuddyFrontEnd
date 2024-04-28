import React from "react";
import { useState,useEffect } from "react";
import { Modal } from "react-bootstrap";
import { auth } from "../firebase";
import { getFirestore, collection, doc, setDoc } from "firebase/firestore";

import "./ForgetPassword.css";
const URL = process.env.REACT_APP_BACKEND_URL;

const Forgot = () => {
  const [email, setEmail] = React.useState("");
  const [showModal, setShowModal] = useState(false);
  const [otp, setOTP] = useState("");
  const [verifyOTP, setVerifyOTP] = useState("");
  const [loading, setLoading] = React.useState(false);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const [mailSent, setMailSent] = useState(false);
  useEffect(() => {
    //set OTP
    if (!mailSent) setOTP(Math.floor(100000 + Math.random() * 900000));
  }, [mailSent]);

  const handleSubmit = async (event) => {
    setMailSent(true);
    event.preventDefault();

    try {
      if (!email) {
        alert("Please enter your email");
        return;
      }

      const response = await fetch(`${URL}/api/email/send`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          otp,
        }),
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
  };

  const handleBackToSignIn = (event) => {
    event.preventDefault();
    window.location.href = "/";
  };

  return (
    <div className="forgot">
      <div className="forgot_image">
        <img src="./forgot.png" alt="forgot" />
      </div>
      <div className="forgot_form">
        <img className="logo" src="./logo.png" alt="logo" />
        <h2>Forgot your password?</h2>
        <p>
          Don’t worry, happens to all of us. Enter your email below to recover
          your password Enter your email and we'll send you a link to reset your
          password.
        </p>
        <p>Email</p>
        <form>
          <input type="text" value={email} onChange={handleEmailChange} />
          <button type="submit" onClick={handleSubmit}>
            Send
          </button>
        </form>
        <p className="backtosignin" onClick={handleBackToSignIn}>
          Back to <a href="#">Sign in</a>
        </p>
      </div>

      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
        style={{
          maxWidth: "500px",
          margin: "auto",
          alignSelf: "center",
          right: "0",
          left: "0",
          top: "0",
          bottom: "0",
          position: "absolute",
          borderRadius: "10px",
          backgroundColor: "white",
          padding: "100px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Modal.Header style={{ borderBottom: "none" }}>
          <Modal.Title>Enter OTP </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="text"
            className="form-control"
            placeholder="Enter OTP (sent to the entered email)"
            onChange={(e) => setVerifyOTP(e.target.value)}
            style={{
              marginBottom: "10px",
              borderRadius: "5px",
              border: "1px solid #ced4da",
              padding: "15px",
              width: "90%",
            }}
          />
        </Modal.Body>
        <Modal.Footer
          style={{
            borderTop: "none",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <button
            className="btn btn-primary"
            onClick={() => {
              if (verifyOTP == otp) {
                alert("OTP Verified");
                window.location.href = `/newpassword?email=${email}`
              } else {
                alert("Invalid OTP");
                alert(otp);
              }
            }}
            style={{
              justifyContent: "center",
              marginTop: "20px",
              marginBottom: "20px",
              color: "white",
              fontSize: "20px",
              border: "0px solid black",
              padding: "10px",
              cursor: "pointer",
              backgroundColor: "#8935c4",
              borderRadius: "5px",
              width: "200px",
              boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
            }}
          >
            Verify
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Forgot;
