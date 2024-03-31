import React, { useState, useEffect } from "react";
import Navbar from "../Components/nav";
import Footer from "../Components/footer";
import { auth } from '../firebase'
import { collection, doc, getDoc, getDocs, getFirestore, setDoc, addDoc, updateDoc, query, where } from "firebase/firestore";
import { firestore } from '../firebase';
import './Saved.css';
const image = "./1.png";


const Saved = () => {
    const [user, setUser] = useState(null);
    const [uid, setUid] = useState(null);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                console.log(user.uid);
                setUid(user.uid);
                setUser(user);
            } else {
                window.location.href = "/login";
                console.log("No user is signed in");
            }
        });
        return unsubscribe;
    }
        , []);


    const [savedTrips, setSavedTrips] = useState([]);

    useEffect(() => {
        //get those trips from firestore that have the user's uid
        const getSavedTrips = async () => {
            const firestore = getFirestore();
            const tripsCollection = collection(firestore, 'trips');
            const tripsQuery = query(tripsCollection, where("uid", "==", uid));
            const tripsDocs = await getDocs(tripsQuery);
            const trips = tripsDocs.docs.map(doc => doc.data());
            setSavedTrips(trips);
            console.log(trips);
        }
        getSavedTrips();
    }

        , [user]);

    const calculateDuration = (checkIn, checkOut) => {
        const checkInDate = new Date(checkIn);
        const checkOutDate = new Date(checkOut);
        const duration = (checkOutDate - checkInDate) / (1000 * 60 * 60 * 24);
        return duration;
    }

    return (
        <div>
            <Navbar />
            <div className="Saved-main">
                <div className="Saved">
                    <div className="Saved-Items">
                        <h1>Saved</h1>
                        {savedTrips.map((item) => (
                            <div className="Saved-Item" key={item.location}>
                                <div className="Saved-Item-Image">
                                    <img src={image} alt="Saved Item" />
                                </div>

                                <div className="Saved-Item-Details">

                                    <div className="column">
                                        <div className="location">
                                            <p>{item.location}</p>
                                        </div>
                                        <div className="date">
                                            <img src="./entry.png" alt="Date" />
                                            <h5>Check In: </h5>
                                            <p>{item.checkIn}</p>
                                        </div>
                                        <div className="time">
                                            <img src="./time.png" alt="Time" />
                                            <h5>Checkout: </h5>
                                            <p>{item.checkOut}</p>
                                        </div>
                                        <div className="groups">
                                            <img src="./number.png" alt="Groups" />
                                            <h5>Location: </h5>
                                            <p>{item.location}</p>
                                        </div>
                                        <div className="transportation">
                                            <img src="./transportation.png" alt="Transportation" />
                                            <h5>Transportation: </h5>
                                            <p>Airport</p>
                                        </div>
                                    </div>
                                    <div className="column">
                                        <div className="price" style={{display: "flex", alignItems: "center", justifyContent: "right", textAlign: "right"}}>

                                            <img src="./icon_duration.png" alt="Duration" style={{width: "20px", height: "20px"}}/>
                                            <h5>Duration: </h5>
                                            <p>{calculateDuration(item.checkIn, item.checkOut)} days</p>
                                        </div>




                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Saved;
