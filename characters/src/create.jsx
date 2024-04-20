import React, { useState } from 'react';



function Create({supabase}) {
  const [name, setName] = useState('');
  const [magic, setMagic] = useState('');
  const [house, setHouse] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Handle form submission here (e.g., store data in a database, display confirmation)
    console.log('Name:', name);
    console.log('Magical Strength:', magic);
    console.log('House:', house);
    const character = { name, magic, house };

    
    try {
        const { data, error } = await supabase
          .from('characters2') // Replace with your table name
          .insert([character]);
    
        if (error) {
          console.error('Error adding character:', error);
        } else {
          console.log('Character added successfully:', data);
          setName('');
            setMagic('');
            setHouse('');
        }
      } catch (error) {
        console.error('Error adding character:', error);
      }

  };

  return (
    <div className="create-container">
      <h2>Create a Crewmate</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-box">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-box">
          <label htmlFor="magical-strength">Magical Strength:</label>
          <input
            type="text"
            id="magical-strength"
            value={magic}
            onChange={(e) => setMagic(e.target.value)}
          />
        </div>
        <div className="form-box">
          <label htmlFor="house">House:</label>
          <select id="house" value={house} onChange={(e) => setHouse(e.target.value)}>
            <option value="">Select House</option>
            <option value="gryffindor">Gryffindor</option>
            <option value="ravenclaw">Ravenclaw</option>
            <option value="hufflepuff">Hufflepuff</option>
            <option value="slytherin">Slytherin</option>
          </select>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Create;

