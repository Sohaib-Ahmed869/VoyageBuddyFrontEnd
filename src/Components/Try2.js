import React, { useState, useEffect } from 'react';
import axios from 'axios';

const HotelSearch = () => {
  const [location, setLocation] = useState('');
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [geoId, setGeoId] = useState('');
  const [results, setResults] = useState(null);
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

  const handleLocationSelect = (selectedLocation) => {
    setSelectedLocation(selectedLocation);
    setGeoId(selectedLocation.geoId);
  };

  const handleSearch = async () => {
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

      setResults(response.data);
      setError(null);
    } catch (error) {
      setResults(null);
      setError(error.message || 'An error occurred');
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

  return (
    <div>
      <h1>Hotel Search</h1>
      <div>
        <label>
          Location:
          <input type="text" value={location} onChange={(e) => handleInputChange(e, setLocation)} />
        </label>
        <button onClick={getLocations}>Get Locations</button>
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
        <button onClick={handleSearch}>Search</button>
      </div>
      {results && (
        <div>
          <h2>Results:</h2>
          <pre>{JSON.stringify(results, null, 2)}</pre>
        </div>
      )}
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  );
};

export default HotelSearch;
