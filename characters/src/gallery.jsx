import React, { useState, useEffect } from 'react'; // Import useState
import { Link } from 'react-router-dom';
import Modal from './Modal.jsx'; // Import your Modal component



function Gallery({supabase}) {
    const [characters, setCharacters] = useState([]);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false); // Define isEditModalOpen state
    const [characterToEdit, setCharacterToEdit] = useState(null);

    useEffect(() => {
        getCharacters();
      }, []);

    async function getCharacters() {
        const { data } = await supabase.from("characters3").select();
        setCharacters(data);
    }

    //not ever calling this
    const handleCharacterClick = (character) => {
        // Create a unique path with character information (replace with desired format)
        const path = `/crewmate-gallery/${character.name}-${character.magic}-${character.house}`;
    
        // Navigate to the path using Link from react-router-dom
        window.location.href = path; // Alternative using Link component below
        console.log("click handled properly")
      };

    const handleDeleteCharacter = async (character) => {
        try {
          const { error } = await supabase.from("characters3").delete().match({ 
            name: character.name,
            magic: character.magic,
            house: character.house, 
        }); 
    
          if (error) {
            console.error('Error deleting character:', error);
          } else {
            console.log('Character deleted successfully!');
            // Update characters state to reflect deletion (optional)
            setCharacters(characters.filter((c) => 
            c.name !== character.name || // Filter based on combined criteria
            c.magic !== character.magic ||
            c.house !== character.house
            ));          
          }
        } catch (error) {
          console.error('Error deleting character:', error);
        }
      };

      //to edit a character
      const handleEditClick = (character) => {
        setCharacterToEdit(character);
        setIsEditModalOpen(true);
      };
    
      const handleEditSubmit = async (updatedCharacter) => {
        try {
          const { error } = await supabase
            .from("characters3")
            .update(updatedCharacter)
            .match({ id: characterToEdit.id });
    
          if (error) {
            console.error('Error updating character:', error);
          } else {
            console.log('Character updated successfully!');
            // Update characters state with updated data (optional)
            setCharacters(
              characters.map((c) => (c.id === characterToEdit.id ? updatedCharacter : c))
            );
            setIsEditModalOpen(false);
          }
        } catch (error) {
          console.error('Error updating character:', error);
        }
      };
    
      const handleModalClose = () => {
        setIsEditModalOpen(false);
        setCharacterToEdit(null); // Clear character for editing
      };
    

  return (
    <div className="gallery">
      <h2>Crewmate Gallery</h2>
      <div className="grid-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gridGap: '10px' }} >
        {characters.map((character) => (
          <div className="character-box" key={character.name} style={{ backgroundColor: '#f5f5f5', padding: '10px', borderRadius: '5px' }}
          //onClick={() => handleCharacterClick(character)} 
          >
            <p>Name: {character.name}</p>
            <p>Magical Strength: {character.magic}</p>
            <p>House: {character.house}</p>
            <Link to={`/crewmate-gallery/${character.name}-${character.magic}-${character.house}`}>
              Details
            </Link>
            <button onClick={() => handleEditClick(character)}>Edit</button>
            <button onClick={() => handleDeleteCharacter(character)}>Delete</button>
          </div>
        ))}
      </div>
      {isEditModalOpen && (
        <Modal onClose={handleModalClose}>
          <h2>Edit Character</h2> {/* Change title to Edit Character */}
          {characterToEdit && (
            <form onSubmit={(e) => e.preventDefault()}> {/* Wrap inputs in form */}
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                defaultValue={characterToEdit.name} // Set default value
                required
              />
              <label htmlFor="magic">Magical Strength:</label>
              <input
                type="text"
                id="magic"
                defaultValue={characterToEdit.magic}
                required
              />
              <label htmlFor="house">House:</label>
              <select id="house" defaultValue={characterToEdit.house} required>
                <option value="Gryffindor">Gryffindor</option>
                <option value="Slytherin">Slytherin</option>
                <option value="Ravenclaw">Ravenclaw</option>
                <option value="Hufflepuff">Hufflepuff</option>
              </select>
              <button type="submit" onClick={() => handleEditSubmit(characterToEdit)}>
                Save Changes
              </button>
            </form>
          )}
        </Modal>
      )}
    </div>
  );
}

export default Gallery;

