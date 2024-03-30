import React, { useState, useEffect } from 'react';
import './App.css';
import Cats from './components/Cats'; // Assuming Cats is a separate component

const apiKey = 'live_Y6w5xv0etRc0Vxvb7Qcm6w7BnLmVvL9g6oNhbPf541zKUuRlv9BKKqCKpoTZIbWp';

function App() {
  const [cats, setCats] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [summary, setSummary] = useState({ avgAffection: 0, avgEnergy: 0, avgIntelligence: 0 });
  const [filterMode, setFilterMode] = useState(null); // Add a state for filter mode

  useEffect(() => {
    const fetchCats = async () => {
      const response = await fetch(`https://api.thecatapi.com/v1/breeds?limit=30`);
      const data = await response.json();
      console.log(data);

      const processedData = data.map((cat) => ({
        breed: cat.name,
        picture: cat.image ? cat.image.url : 'https://placekitten.com/200/300', // Use a placeholder if missing
        affection_level: cat.affection_level,
        energy_level: cat.energy_level,
        intelligence: cat.intelligence,
        temperament: cat.temperament,
      }));

      setCats(processedData);
      calculateSummary(processedData);
      console.log(processedData);
    };

    fetchCats();
  }, []);

  const calculateSummary = (data) => {
    const totalAffection = data.reduce((acc, cat) => acc + cat.affection_level, 0);
    const avgAffection = parseFloat(totalAffection / data.length).toFixed(2);

    const totalEnergy = data.reduce((acc, cat) => acc + cat.energy_level, 0);
    const avgEnergy = parseFloat(totalEnergy / data.length).toFixed(2);

    const totalIntelligence = data.reduce((acc, cat) => acc + cat.intelligence, 0);
    const avgIntelligence = parseFloat(totalIntelligence / data.length).toFixed(2);

    setSummary({ avgAffection, avgEnergy, avgIntelligence });
  };

  const handleSearch = (event) => {
    setSearchText(event.target.value.toLowerCase());
  };

  const handleEnergeticCats = () => {
    setFilterMode('energetic');
  };

  const handleSmartCats = () => {
    setFilterMode('smart');
  };

  const clearFilter = () => {
    setFilterMode(null);
    setSearchText(''); // Clear search text as well
  };

  const filteredCats = cats.filter((cat) => {
    // Satisfy search criteria if a search query exists
    if (searchText && !cat.breed.toLowerCase().includes(searchText)) {
      return false;
    }

    // Apply filter mode if active
    if (filterMode === 'energetic') {
      return cat.energy_level >= 4;
    } else if (filterMode === 'smart') {
      return cat.intelligence === 5;
    }

    // No filter applied, return all cats
    return true;
  });

  return (
    <div className="App">
      <h1>Cat Explorer</h1>
      <div className="summary">
      <div className="summary-box">
        <p>Avg. Affection: {summary.avgAffection}</p>
      </div>
      <div className="summary-box">
        <p>Avg. Energy: {summary.avgEnergy}</p>
      </div>
      <div className="summary-box">
        <p>Avg. Intelligence: {summary.avgIntelligence}</p>
      </div>
    </div>
      <div className="filters">
        <button onClick={handleEnergeticCats}>Energetic Cats</button>
        <button onClick={handleSmartCats}>Smart Cats</button>
        {filterMode && <button onClick={clearFilter}>Clear Filter</button>}
      </div>
      <input
        type="text"
        placeholder="Search Cats..."
        onChange={handleSearch}
      />
      <div className="summary">
        {/* ... summary boxes for averages */}
      </div>
      <Cats cats={filteredCats} />
    </div>
  );
}

export default App;
