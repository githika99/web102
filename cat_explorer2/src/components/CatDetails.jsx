import React, { Component, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const apiKey = import.meta.env.CAT_API_KEY;

const CatDetails = () => {
  //let params = useParams();
  
  const { catid } = useParams();

  const [cat, setCat] = useState(null);

  useEffect(() => {
    // Assuming you have a function to fetch cat details based on breed
    const fetchCatDetails = async () => {
      console.log("in use effect of cat details, catid is", catid)
      try {
        const response = await fetch(`https://api.thecatapi.com/v1/breeds/${catid}`);
        const catData = await response.json();
        setCat(catData);
        console.log(catData.name, "was just called")
        console.log("catData is now")
        console.log(catData)
      } catch (error) {
        console.error('Error fetching cat details:', error);
        // Handle errors gracefully, e.g., display an error message
      }
    };

    fetchCatDetails();
  }, [catid]);

  return (
    <div>
      {cat ? (
        <div>
          <h2>Cat Details - {cat.name}</h2>
          <p>Temperament: {cat.temperament}</p>
          <p>Origin: {cat.origin}</p>
          <p>Description: {cat.description}</p>
        </div>
      ) : (
        <p>Loading cat details...</p>
      )}
    </div>
  );
};

export default CatDetails;
