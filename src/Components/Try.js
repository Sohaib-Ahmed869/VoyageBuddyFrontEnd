import React, { useState } from 'react';
import axios from 'axios';

const AirportSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get('https://tripadvisor16.p.rapidapi.com/api/v1/flights/searchAirport', {
        params: { query },
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

  return (
    <div>
      <h1>Airport Search</h1>
      <div>
        <label>
          Query:
          <input type="text" value={query} onChange={handleInputChange} />
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

export default AirportSearch;
