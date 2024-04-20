import React, { useState, useEffect } from 'react'; // Import useState

function Gallery({supabase}) {
    const [characters, setCharacters] = useState([]);

    useEffect(() => {
        getCharacters();
      }, []);

    async function getCharacters() {
        const { data } = await supabase.from("characters2").select();
        setCharacters(data);
    }

    const handleCharacterClick = (character) => {
        // Create a unique path with character information (replace with desired format)
        const path = `/crewmate-gallery/${character.name}-${character.magic}-${character.house}`;
    
        // Navigate to the path using Link from react-router-dom
        window.location.href = path; // Alternative using Link component below
        console.log("click handled properly")
      };

  return (
    <div className="gallery">
      <h2>Crewmate Gallery</h2>
      <div className="grid-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gridGap: '10px' }} >
        {characters.map((character) => (
          <div className="character-box" key={character.name} style={{ backgroundColor: '#f5f5f5', padding: '10px', borderRadius: '5px' }}
          onClick={() => handleCharacterClick(character)} 
          >
            <p>Name: {character.name}</p>
            <p>Magical Strength: {character.magic}</p>
            <p>House: {character.house}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Gallery;

