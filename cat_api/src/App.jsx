import React, { useState, useEffect } from 'react';
import './App.css';

const apiKey = 'live_Y6w5xv0etRc0Vxvb7Qcm6w7BnLmVvL9g6oNhbPf541zKUuRlv9BKKqCKpoTZIbWp'; // Replace with your actual API key

function App() {
  const [catData, setCatData] = useState(null);
  const [banList, setBanList] = useState([]);

  const fetchCat = async () => {
    let fetchedCat;
    let isCatValid = false; // Flag to track if a valid cat is found

    do {
      const response = await fetch('https://api.thecatapi.com/v1/images/search', {
        headers: {
          'x-api-key': apiKey,
        },
      });
      fetchedCat = await response.json();
      isCatValid = isValidCatData(fetchedCat[0]) && !isCatBanned(fetchedCat[0]); // Check both data validity and ban list
    } while (!isCatValid); // Keep fetching until valid and non-banned cat found

    setCatData(fetchedCat[0]);
  };

  const isValidCatData = (cat) => {
    const breed = cat.breeds[0];
    return breed && breed.name && breed.life_span && breed.weight?.metric;
  };

  const isCatBanned = (cat) => {
    const catInfo = getCatInfo(cat.breeds[0]);
    return banList.some((item) => item === catInfo.name || item === catInfo.life_span || item === catInfo.weight);
  };

  const addToBanList = (item) => {
    setBanList([...banList, item]);
  };

  const getCatInfo = (breed) => {
    const { name, life_span, weight = { metric: 'No weight information' } } = breed;
    return { name, life_span, weight: weight.metric };
  };

  useEffect(() => {
    fetchCat();
  }, []);

  return (
    <div className="App">
      <button onClick={fetchCat}>Generate Cat</button>
      {catData && ( // Show content only if catData exists
        <div className="cat-info">
          <img src={catData.url} alt="Random Cat" style={{ maxWidth: '300px', maxHeight: '300px' }} />
          <p className="clickable" onClick={() => addToBanList(getCatInfo(catData.breeds[0]).name)}>
            Breed: {getCatInfo(catData.breeds[0]).name}
          </p>
          <p className="clickable" onClick={() => addToBanList(getCatInfo(catData.breeds[0]).life_span)}>
            Age: {getCatInfo(catData.breeds[0]).life_span}
          </p>
          <p className="clickable" onClick={() => addToBanList(getCatInfo(catData.breeds[0]).weight)}>
            Weight: {getCatInfo(catData.breeds[0]).weight}
          </p>
        </div>
      )}
      <div className="ban-list">
        <h2>Ban List</h2>
        <ul>
          {banList.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
