import React, { useState, useEffect } from 'react';

const Map = ()=> {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    const fetchPlaces = async () => {
      const response = await fetch(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=Karachi&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`);
      const data = await response.json();
      setPlaces(data.results);
    };
    fetchPlaces();
  }, []);

  return (
    <div>
      <h1>Places in Karachi:</h1>
      <ul>
        {places.map((place, index) => (
          <li key={index}>{place.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default Map;