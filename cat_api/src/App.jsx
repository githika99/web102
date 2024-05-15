import React, { useState, useEffect } from 'react';
import './App.css';

const apiKey = 'live_Y6w5xv0etRc0Vxvb7Qcm6w7BnLmVvL9g6oNhbPf541zKUuRlv9BKKqCKpoTZIbWp'; 

function App() {
  //the data (json object)
  const [catData, setCatData] = useState(null);
  //list of banned attributes
  const [banList, setBanList] = useState([]);

  //takes a new item as a parameter
  const addToBanList = (item) => {
    setBanList([...banList, item]);
  };

  const isValidCatData = (cat) => {
    const breed = cat.breeds[0];
    //extra checks on weight bc weight is a json object, whereas name and life_span are just items
    return breed && breed.name && breed.life_span && breed.weight?.metric;
  };

  //takes breed as a parameter
  const getCatInfo = (breed) => {
    //unpacks breed into the properties name, life_span, and weight
    //weight has a default values
    //extra checks on weight bc weight is a json object, whereas name and life_span are just items
    const defaultWeight = { metric: 'No weight information' };
    const { name, life_span, weight = defaultWeight } = breed;
    return { name, life_span, weight: weight.metric };
  };

  const isCatBanned = (cat) => {
    const catInfo = getCatInfo(cat.breeds[0]);
    for (let i = 0; i<banList.length; i++){
      if (banList[i] === catInfo.name || banList[i] === catInfo.life_span || banList[i] === catInfo.weight){
        return true
      }
    }
    return false
  };

  //async and await
  const fetchCat = async () => {
    let fetchedCat;
    let isCatValid = false; // Flag to track if a valid cat is found

    do {
      //fetch has an optional second parameter, it is headers
      //so the HTTP request includes the apiKey in its header, which many APIs require
      //documentation specifies that you need to include the x-api-key header
      //it also says that you can use ?api_key= in the querry string but this is considered less safe
      //as URLs are easier to leak

      //we seperate lines for fetch() and fetchedCat = response for clarity
      //you could use one line, but this way if the fetch() fails
      //you'll catch that in fetchedCat
      const response = await fetch('https://api.thecatapi.com/v1/images/search', {
        headers: {
          'x-api-key': apiKey,
        },
      });
      fetchedCat = await response.json();
      isCatValid = isValidCatData(fetchedCat[0]) && !isCatBanned(fetchedCat[0]); // Check both data validity and ban list
    } while (!isCatValid); // Keep fetching until valid and non-banned cat found
    console.log("NEW again")
    console.log(fetchedCat)
    setCatData(fetchedCat[0]);
  };


  //makes a cat be fetched upon Mounting of the page
  useEffect(() => {
    console.log("useEffect used")
    fetchCat();
  }, []);

  return (
    <div className="App">
      <button onClick={fetchCat}>Generate Cat</button>
      {catData && ( // Show content only if catData exists
        <div className="cat-info">
          <img src={catData.url} alt="Random Cat" style={{ maxWidth: '300px', maxHeight: '300px' }} />
          {/*define the onClick handling inline*/}
          <p className="clickable" onClick={() => addToBanList(getCatInfo(catData.breeds[0]).name)}>
            Breed: {getCatInfo(catData.breeds[0]).name}
          </p>
          {/*define the onClick handling inline*/}
          <p className="clickable" onClick={() => addToBanList(getCatInfo(catData.breeds[0]).life_span)}>
            Age: {getCatInfo(catData.breeds[0]).life_span}
          </p>
          {/*define the onClick handling inline*/}
          <p className="clickable" onClick={() => addToBanList(getCatInfo(catData.breeds[0]).weight)}>
            Weight: {getCatInfo(catData.breeds[0]).weight}
          </p>
        </div>
      )}
      <div className="ban-list">
        <h2>Ban List</h2>
        <ul>
          {banList.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
