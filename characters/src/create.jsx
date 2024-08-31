import React, { useState } from 'react';



function Create({supabase}) {
  const [name, setName] = useState('');
  const [magic, setMagic] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Handle form submission here (e.g., store data in a database, display confirmation)
    console.log('Name:', name);
    console.log('URL:', magic);
    console.log('Description:', description);
    const character = { name, magic, description };

    
    try {
        const { data, error } = await supabase
          .from('characters3') // Replace with your table name
          .insert([character]);
    
        if (error) {
          console.error('Error adding character:', error);
        } else {
          console.log('Character added successfully:', data);
          setName('');
            setMagic('');
            setDescription('');
        }
      } catch (error) {
        console.error('Error adding character:', error);
      }

  };

  return (
    <div className="create-container">
      <h2>Create a Post</h2>
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
          <label htmlFor="magical-strength">URL:</label>
          <input
            type="text"
            id="magical-strength"
            value={magic}
            onChange={(e) => setMagic(e.target.value)}
          />
        </div>
        <div className="form-box">
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Create;

