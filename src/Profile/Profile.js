import React, { useState } from "react";
import Navbar from "../Components/nav";
import Footer from "../Components/footer";

import "./Profile.css";

const Profile = () => {
    const [editableFields, setEditableFields] = useState({
        name: false,
        email: false,
        password: false,
        phone: false,
        address: false,
        dateofbirth: false,
    });

    const profileData = {
        name: "John Doe",
        email: "john@gmail.com",
        password: "********",
        phone: "1234567890",
        address: "123, Lorem Ipsum, Dolor Sit, Amet, Consectetur, Adipiscing Elit, 123456",
        dateofbirth: "01/01/2000",
    };

    const handleEditClick = (field) => {
        setEditableFields((prevFields) => ({ ...prevFields, [field]: true }));
    };

    const handleSaveClick = (field) => {
        // Implement the logic to save the edited data to your backend or update state accordingly
        setEditableFields((prevFields) => ({ ...prevFields, [field]: false }));
    };

    const handleCancelClick = (field) => {
        setEditableFields((prevFields) => ({ ...prevFields, [field]: false }));
    };

    return (
        <div>
            <Navbar />

            <div className="Profile">
                <img className="pic" src="./profile.png" alt="Profile" />
                <h2 className="namemain">{profileData.name}</h2>
                <p className="emailmain">{profileData.email}</p>

                <div className="Profile-Details">
                    <h1>Account</h1>
                    <div className="details">
                        {Object.keys(profileData).map((field) => (
                            <div className="row" key={field}>
                                <div className="side">
                                    <p>{field.charAt(0).toUpperCase() + field.slice(1)}</p>
                                    {editableFields[field] ? (
                                        <input
                                            type="text"
                                            value={profileData[field]}
                                            onChange={(e) => console.log(e.target.value)}
                                        />
                                    ) : (
                                        <p>{profileData[field]}</p>
                                    )}
                                </div>
                                <div className="side">
                                    {editableFields[field] ? (
                                        <>
                                            <button onClick={() => handleSaveClick(field)}>Save</button>
                                            <button onClick={() => handleCancelClick(field)}>Cancel</button>
                                        </>
                                    ) : (
                                        <div className="side">
                                            <button onClick={() => handleEditClick(field)}><img src="./edit.png" alt="Edit" />Change</button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Profile;
