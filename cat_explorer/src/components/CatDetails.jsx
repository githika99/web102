import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const CatDetails = () => {
  const { catname } = useParams();
  const navigate = useNavigate(); // Access the navigation function

  const [cat, setCat] = useState(null);

  useEffect(() => {
    // Assuming you have a function to fetch cat details based on breed
    const fetchCatDetails = async () => {
      try {
        const response = await fetch(`https://api.thecatapi.com/v1/breeds/${catname}`);
        const catData = await response.json();
        setCat(catData);
      } catch (error) {
        console.error('Error fetching cat details:', error);
        // Handle errors gracefully, e.g., display an error message
      }
    };

    fetchCatDetails();
  }, [catname]);

  return (
    <div>
      {cat ? (
        <div>
          <h2>Cat Details - {cat.name}</h2>
          <p>Breed: {cat.name}</p>
          <p>Temperament: {cat.temperament}</p>
          <p>Origin: {cat.origin}</p>
          <p>Description: {cat.description}</p>
          {/* Display other details as needed */}
          <button onClick={() => navigate('/')}>Home</button>
        </div>
      ) : (
        <p>Loading cat details...</p>
      )}
    </div>
  );
};

export default CatDetails;
