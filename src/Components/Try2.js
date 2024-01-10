import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './nav';

import './Try2.css';
import Hero from '../Booking/Hero';


const HotelSearch = () => {
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

  const [error, setError] = useState(null);

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
      setAirports(response.data);
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
    }
  };
  const [topDes, settopDes] = useState([]);
  const getTopDestinations = () => {
    try {
      //get first object in the data returned

      const top_restaurant = restaurants.data[0];
      const top_hotel = results[0];
      const top_airport = airports.data[0];
      const updatedTopDestinations = [top_restaurant, top_hotel, top_airport];
      setTopdestinations(updatedTopDestinations);

      const tophotel = { price: top_hotel.priceForDisplay, name: top_hotel.title }
      const topresturant = { price: top_restaurant.priceTag, name: top_restaurant.name, image: top_restaurant.heroImgUrl }
      const topairpot = { price: top_airport.price, name: top_airport.name, image: top_airport.url }

      setTopdestinations([tophotel, topresturant, topairpot]);
      console.log(updatedTopDestinations);
    } catch (error) {
      console.error(error);
    }
  };



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
    getTopDestinations();
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

  const getDayPlans = () => {
    try {
      setDays(calculateDays(checkIn, checkOut));
      const dayPlans = [];
      for (let i = 0; i < days; i++) {
        const dayPlan = {
          day: i + 1,
          restaurants: restaurants.data.slice(i * 3, (i + 1) * 3),
          hotels: results.slice(i * 3, (i + 1) * 3),
          airports: airports.data.slice(i * 3, (i + 1) * 3)
        }
        dayPlans.push(dayPlan);
      }
      setDayPlans(dayPlans);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getDayPlans();
  }

    , [restaurants, results, airports]);

  const searchHandle = () => {
    handleAirportSearch();
    handleHotelsSearch();
    handleRestaurantSearch(); // Add restaurant search
    calculateDays(checkIn, checkOut);
    getTopDestinations();
    getDayPlans();

  };
  return (
    <div>
      {/* <Navbar /> */}


      <div className='search-book'>
        <Hero />
        <div>
          <label>
            Location:
            <input type="text" value={location} onChange={(e) => handleInputChange(e, setLocation)} />
          </label>
          {selectedLocation && (
            <div>
              <p>Selected Location: {selectedLocation.title}, {selectedLocation.secondaryText}</p>
            </div>
          )}
          <label>
            Check-In:
            <input type="date" value={checkIn} onChange={(e) => handleInputChange(e, setCheckIn)} />
          </label>
          <label>
            Check-Out:
            <input type="date" value={checkOut} onChange={(e) => handleInputChange(e, setCheckOut)} />
          </label>
          <button onClick={searchHandle}>Search</button>
        </div>
        <div>
          <h1>Day Planning</h1>
          {
            /*
            iterate for the number of days
            for each day, get the top 3 restaurants, hotels, and airports
            display the top 3 restaurants, hotels, and airports for each day

            */
          }
          {dayPLans.map((dayPlan) => (
            <div>
              <h2>Day {dayPlan.day}</h2>
              <div>
                <h3>Restaurants</h3>
                {dayPlan.restaurants.map((restaurant) => (
                  <div>
                    {
                      restaurant.heroImgUrl && (
                        <img src={restaurant.squareImgUrl}
                          alt="Restaurant Image"
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
              </div>
              <div>
                <h3>Hotels</h3>
                {dayPlan.hotels.map((hotel) => (
                  <div>

                    <h4>{hotel.title}</h4>
                    <p>{hotel.priceForDisplay}</p>
                  </div>
                ))}
              </div>
              <div>
                <h3>Airports</h3>
                {dayPlan.airports.map((airport) => (
                  <div>
                    <h4>{airport.name}</h4>
                    <p>{airport.price}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}


        </div>
        <div>
          <h1>Airport Search</h1>

          {airports && (
            <div>
              <h2>Airports:</h2>
              <pre>{JSON.stringify(airports, null, 2)}</pre>
            </div>
          )}
          {error && <div style={{ color: 'red' }}>{error}</div>}
        </div>
        {results && (
          <div>
            <h2>Results:</h2>
            <pre>{JSON.stringify(results, null, 2)}</pre>
          </div>

        )}
        {error && <div style={{ color: 'red' }}>{error}</div>}
      </div>

      <div className="restaurants">
        {restaurants && (
          <div>
            <h2>Restaurants:</h2>
            <pre>{JSON.stringify(restaurants, null, 2)}</pre>
          </div>
        )}
        {error && <div style={{ color: 'red' }}>{error}</div>}


      </div>
      <div className="ad">
        <img src="./ad.png" alt="ad" />
      </div>

      <div className="top-destination">
        <h1>✈ • Top Destinations</h1>
        <div className="top-destination-container">
          {topdestinations.map((topdestination) => (
            <div className="top-destination-card">
              <img src={topdestination.image} alt="top-destination" />
              <div className="top-destination-info">
                <h2>{topdestination.name}</h2>
                <h3>{topdestination.price}</h3>
              </div>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
};

export default HotelSearch;
