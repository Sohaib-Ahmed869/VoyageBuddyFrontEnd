import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './nav';
import {
  Container,
  Row,
  Col,
  Card,
  Button
} from 'react-bootstrap';
import { auth } from '../firebase'
import { collection, doc, getDoc, getDocs, getFirestore, setDoc, addDoc, updateDoc, query, where } from "firebase/firestore";
import { firestore } from '../firebase';
import './Try2.css';
import Hero from '../Booking/Hero';
import Footer from './footer';


const HotelSearch = () => {
  const [user, setUser] = useState(null);
  const [topdestinations, setTopdestinations] = useState([]);
  const [location, setLocation] = useState('');
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [geoId, setGeoId] = useState('');
  const [results, setResults] = useState(null);
  const [airports, setAirports] = useState([]);
  const [restaurants, setRestaurants] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        console.log(user.uid);
        setUser(user);

      } else {
        window.location.href = "/login";
        console.log("No user is signed in");
      }
    });
    return unsubscribe;
  }
    , []);

  const handleInputChange = (e, setter) => {
    setter(e.target.value);
  };

  const getLocations = async () => {
    try {
      const response = await axios.get('https://tripadvisor16.p.rapidapi.com/api/v1/hotels/searchLocation', {
        params: { query: location },
        headers: {
          'X-RapidAPI-Key': '5582c617cemshcd40e6f6b318bacp1d184fjsn257ae9060c80',
          'X-RapidAPI-Host': 'tripadvisor16.p.rapidapi.com'
        }
      });

      setLocations(response.data.data);
      setError(null);
    } catch (error) {
      setLocations([]);
      setError(error.message || 'An error occurred while fetching locations');
    }
  };

  const handleAirportSearch = async () => {
    try {
      console.log(location);
      const response = await axios.get('https://tripadvisor16.p.rapidapi.com/api/v1/flights/searchAirport', {
        params: { query: location },
        headers: {
          'X-RapidAPI-Key': '5582c617cemshcd40e6f6b318bacp1d184fjsn257ae9060c80',
          'X-RapidAPI-Host': 'tripadvisor16.p.rapidapi.com'
        }
      });

      console.log(response.data);
      //GET ONE RANDOM AIRPORT
      let airports = response.data.data;
      console.log('AIRPORTS', airports)
      let randomAirport = airports[Math.floor(Math.random() * airports.length)];
      console.log(randomAirport);
      setAirports([randomAirport]);

      setError(null);
    } catch (error) {
      setAirports([]);
      setError(error.message || 'An error occurred');
    }
  };

  const handleRestaurantSearch = async () => {
    try {
      const restaurantID = {
        method: 'GET',
        url: 'https://tripadvisor16.p.rapidapi.com/api/v1/restaurant/searchLocation',
        params: { query: location }, // Use the 'location' state for the query parameter
        headers: {
          'X-RapidAPI-Key': '5582c617cemshcd40e6f6b318bacp1d184fjsn257ae9060c80',
          'X-RapidAPI-Host': 'tripadvisor16.p.rapidapi.com'
        }
      };

      const response = await axios.request(restaurantID);
      console.log(response.data);
      let restId = response.data.data[0].locationId;
      console.log(restId);

      const restaurantsGet = {
        method: 'GET',
        url: 'https://tripadvisor16.p.rapidapi.com/api/v1/restaurant/searchRestaurants',
        params: {
          locationId: restId,
        },
        headers: {
          'X-RapidAPI-Key': '5582c617cemshcd40e6f6b318bacp1d184fjsn257ae9060c80',
          'X-RapidAPI-Host': 'tripadvisor16.p.rapidapi.com'
        }
      };

      try {
        //only store 10 restaurants
        const response = await axios.request(restaurantsGet);


        //decrease resturants to 10
        let restaurantsi = response.data.data;
        // let resturants10 = resturants.slice(0, 5);
        // setRestaurants(resturants10);
        // setError(null);
        setRestaurants(restaurantsi);
        setError(null);

      } catch (error) {
        console.error(error);
      }

    } catch (error) {
      console.error(error);
      // Handle restaurant search error as needed
    }
  };

  const handleHotelsSearch = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://tripadvisor16.p.rapidapi.com/api/v1/hotels/searchHotels', {
        params: {
          geoId,
          checkIn,
          checkOut,
          pageNumber: '1',
          currencyCode: 'USD'
        },
        headers: {
          'X-RapidAPI-Key': '5582c617cemshcd40e6f6b318bacp1d184fjsn257ae9060c80',
          'X-RapidAPI-Host': 'tripadvisor16.p.rapidapi.com'
        }
      });

      setResults(response.data.data.data);
      setError(null);
    } catch (error) {
      setResults(null);
      setError(error.message || 'An error occurred');
    } finally {
      setLoading(false);
    }

  };



  const handleSaveTrip = async () => {
    alert ('Saving trip');
    try {
      const trip = {
        location,
        checkIn,
        checkOut,
        restaurants: restaurants.data,
        hotels: results,
        airports: airports,
        uid: user.uid
      };

      const firestore = getFirestore();
      const tripsCollection = collection(firestore, 'trips');
      const tripDoc = doc(tripsCollection);
      await setDoc(tripDoc, trip);

      alert('Trip saved successfully');
    } catch (error) {
      console.error(error);
    }
  }




  useEffect(() => {
    if (location) {
      getLocations();
    }
  }, [location]);

  useEffect(() => {
    if (locations.length > 0) {
      // Automatically select the first location
      setSelectedLocation(locations[0]);
      setGeoId(locations[0].geoId);
    }
  }, [locations]);

  useEffect(() => {

  }, [restaurants, results, airports]);



  const calculateDays = (checkIn, checkOut) => {
    const date1 = new Date(checkIn);
    const date2 = new Date(checkOut);
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }


  const [days, setDays] = useState(calculateDays(checkIn, checkOut));

  const [dayPLans, setDayPlans] = useState([]);
  const [dates, setDates] = useState([]);

  const getDayPlans = () => {
    try {

      setDays(calculateDays(checkIn, checkOut));
      const dayPlans = [];
      for (let i = 0; i < days; i++) {
        const dayPlan = {
          day: i + 1,
          restaurants: restaurants.data.slice(i * 3, (i + 1) * 3),
          hotels: results.slice(i * 3, (i + 1) * 3),
          airports: airports
        }
        dayPlans.push(dayPlan);
      }
      //set dates
      const dates = [];
      for (let i = 0; i < days; i++) {
        const date = new Date(checkIn);
        date.setDate(date.getDate() + i);
        dates.push(date);
      }
      setDates(dates);

      setDayPlans(dayPlans);
    } catch (error) {
      console.error(error);
    }
  }

  const generateDayPlans = (restaurant, hotel) => {
    const restaurantStyle = { color: "#8566FF" };
    const hotelStyle = {
      color: "#E5AE47",
      textDecorationLine: 'underline',
    };

    return (
      <p>
        Good morning! Kickstart your day with a delightful breakfast experience at{' '}
        <span style={restaurantStyle}>{restaurant.name}</span>. Afterward, make your way to{' '}
        <span style={hotelStyle}>{hotel.title}</span> for a serene and relaxing morning.
      </p>
    );
  }

  const generateAfternoonPlan = (restaurant, hotel) => {
    const restaurantStyle = { color: '#8566FF' };
    const hotelStyle = { color: '#E5AE47', textDecorationLine: 'underline' };

    const plan = (
      <p>
        Hello again! This afternoon, indulge in a scrumptious lunch at{' '}
        <span style={restaurantStyle}>{restaurant.name}</span>. Later, unwind and recharge at{' '}
        <span style={hotelStyle}>{hotel.title}</span> for a peaceful and refreshing afternoon.
      </p>
    );

    return plan;
  };

  const generateEveningPlan = (restaurant, hotel) => {
    const restaurantStyle = { color: '#8566FF' };
    const hotelStyle = { color: '#E5AE47', textDecorationLine: 'underline' };

    const plan = (
      <p>
        Good evening! Conclude your day with a delectable dinner at{' '}
        <span style={restaurantStyle}>{restaurant.name}</span>. Enjoy a restful night at{' '}
        <span style={hotelStyle}>{hotel.title}</span>.
      </p>
    );

    return plan;
  };




  useEffect(() => {
    getDayPlans();
  }

    , [restaurants, results, airports]);

  const searchHandle = () => {

    handleAirportSearch();
    handleHotelsSearch();
    handleRestaurantSearch(); // Add restaurant search
    calculateDays(checkIn, checkOut);
    // getTopDestinations();
    getDayPlans();

  };
  return (

    <div>
      <Navbar />

      <Hero />
      {loading && (
        <div className="spinner-loader">
          <div className="spinner"></div>
        </div>
      )}
      <div className='search-book' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', border: '0px solid black', margin: '10px', padding: '10px', borderRadius: '10px', boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)' }}>

        <Container className='search-container'>
          <Row>
            <div className='search-form' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', border: '0px solid black', margin: '10px', padding: '10px', borderRadius: '10px', boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)' }}>
              <h4 style={{ color: '#8566FF' }}>Search for Hotels, Restaurants, and Airports</h4>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <label >
                  Location

                </label>
                <input type="text" value={location} onChange={(e) => handleInputChange(e, setLocation)} style={{ textAlign: 'center', fontSize: '14px', justifyContent: 'center', width: '200px', height: '30px', border: '0px solid black', padding: '3px', margin: '5px', borderRadius: '5px', boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)' }} />
              </div>
              {selectedLocation && (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

                  <p
                    style={{ color: '#8566FF' }}
                  >Selected Location: {selectedLocation.title.replace(/<\/?b>/g, '')}, {selectedLocation.secondaryText}</p>
                </div>
              )}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <label>
                  Check-In:

                </label>
                <input type="date" value={checkIn} onChange={(e) => handleInputChange(e, setCheckIn)} style={{ width: '200px', height: '30px', borderRadius: '5px', border: '0px solid black', padding: '3px', margin: '5px', boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <label>
                  Check-Out:
                </label>
                <input type="date" value={checkOut} onChange={(e) => handleInputChange(e, setCheckOut)} style={{ width: '200px', height: '30px', borderRadius: '5px', border: '0px solid black', padding: '3px', margin: '5px', boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <button
                  style={{ justifyContent: 'center', marginTop: '20px', marginBottom: '20px', color: 'white', fontSize: '20px', border: '0px solid black', padding: '10px', cursor: 'pointer', backgroundColor: '#8935c4', borderRadius: '5px', width: '200px', boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)' }}
                  onClick={searchHandle}>Search</button>
              </div>
            </div>
            <Card>
              {
                /*
                iterate for the number of days
                for each day, get the top 3 restaurants, hotels, and airports
                display the top 3 restaurants, hotels, and airports for each day
    
                */
              }
              {dayPLans.map((dayPlan) => (
                <div className='dayplan-container'>
                  <h1
                    style={{ color: '#8566FF' }}
                  >{dates[dayPlan.day - 1].toDateString()}</h1>

                  <div className='form-group' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', border: '1px solid black', margin: '10px' }}>
                    <div style={{ alignItems: 'center', textAlign: 'center' }}>

                      <h2>Day {dayPlan.day}</h2>
                    </div>

                    <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#F3F2FF', padding: '25px', width: '70%' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#F3F2FF', padding: '25px', borderRadius: '10px' }}>
                        <div>

                          <p

                          >{generateDayPlans(dayPlan.restaurants[0], dayPlan.hotels[0])} {generateAfternoonPlan(dayPlan.restaurants[1], dayPlan.hotels[1])} {generateEveningPlan(dayPlan.restaurants[2], dayPlan.hotels[2])}</p>

                        </div>
                      </div>
                    </Col>
                    <div style={{ justifyContent: 'space-between', marginTop: '40px', marginBottom: '40px' }} className='dayplans'>
                      {dayPlan.restaurants.slice(0, -1).map((restaurant) => (

                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', border: '0px solid black', margin: '10px', borderRadius: '0px', boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)' }} className='dayplan'>

                          {
                            restaurant.heroImgUrl && (
                              <img src={restaurant.squareImgUrl}
                                alt="Restaurant Image"
                                style={{ width: '100%', height: '250px', borderRadius: '0px', marginLeft: '0px' }}
                                onError={(e) => {
                                  e.target.src = './notfound.jpg'; // Set a default image when the main image fails to load
                                }}
                              />
                            )
                          }
                          <h4>{restaurant.name}</h4>
                          <p>{restaurant.priceTag}</p>
                        </div>

                      ))}
                      <div style={{ justifyContent: 'space-between' }} className='dayplans'>
                        {dayPlan.hotels.slice(0, -1).map((hotel) => (
                          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', border: '0px solid black', margin: '10px', borderRadius: '0px', boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)' }} className='dayplan'>
                            <img src={hotel.cardPhotos[0].sizes.urlTemplate.replace('{width}', 300).replace('{height}', 300)}
                              alt="Hotel Image"
                              style={{ width: '100%', height: '250px', borderRadius: '0px', marginLeft: '0px' }}
                              onError={(e) => {
                                e.target.src = './notfound.jpg'; // Set a default image when the main image fails to load
                              }}
                            />
                            { hotel.title && (
                            <h4
                              style={{ width: '180px', borderRadius: '0px', textAlign: 'center' }}
                            >{hotel.title}</h4>
                            )}
                            <p>{hotel.priceForDisplay}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

                    </div>

                    <div>
                      {
                        //if last day, show airport

                      }
                      {
                        dayPlan.day === days && (
                          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <h3>Popular Checkout Airport</h3>
                            <div>
                              {dayPlan.airports.map((airport) => (
                                <div>
                                  <h4>{airport.name}</h4>
                                  <p>{airport.price}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )

                      }
                    </div>




                  </div>
                </div>
              ))}


            </Card>
          </Row>
        </Container>
        <div>
          <h1>Airport Search</h1>

          {airports && (
            <div>
              {airports[0] && (

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <p style={{ color: '#8566FF' }}>Top Airport:</p>
                  <p style={{ color: '#8566FF' }}>{airports[0].shortName} - {airports[0].airportCode}</p>
                </div>
              )}
            </div>
          )}
          {error && <div style={{ color: 'red' }}>{error}</div>}
        </div>
        {error && <div style={{ color: 'red' }}>{error}</div>}

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <button
          onClick={handleSaveTrip}
          style={{ justifyContent: 'center', marginTop: '20px', marginBottom: '20px', color: 'white', fontSize: '20px', border: '1px solid black', padding: '10px', cursor: 'pointer', backgroundColor: '#8935c4', borderRadius: '5px' }}
          >Save Trip</button>
        </div>



        <div className="ad">
          <img src="./ad.png" alt="ad" />
        </div>

        
      </div >
      <Footer />

    </div >


  );
};

export default HotelSearch;
