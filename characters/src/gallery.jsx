import React, { useState, useEffect } from 'react'; // Import useState
import { Link } from 'react-router-dom';
import Modal from './Modal.jsx'; // Import your Modal component



function Gallery({supabase}) {
    console.log("in gallery")
    const [characters, setCharacters] = useState([]);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false); // Define isEditModalOpen state
    const [characterToEdit, setCharacterToEdit] = useState(null);
    const [name, setName] = useState(''); // State variable for name
    const [magic, setMagic] = useState(''); // State variable for magic
    const [description, setDescription] = useState(''); // State variable for house

    useEffect(() => {
        getCharacters();
      }, []);

    async function getCharacters() {
        const { data } = await supabase.from("characters3").select();
        setCharacters(data);
    }

    const handleDeleteCharacter = async (character) => {
        try {
          const { error } = await supabase.from("characters3").delete().match({ 
            name: character.name,
            magic: character.magic,
            description: character.description, 
        }); 
    
          if (error) {
            console.error('Error deleting character:', error);
          } else {
            console.log('Character deleted successfully!');
            // Update characters state to reflect deletion (optional)
            setCharacters(characters.filter((c) => 
            c.name !== character.name || // Filter based on combined criteria
            c.magic !== character.magic ||
            c.description !== character.description
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
            .update({ name, magic, description })
            .match({ id: characterToEdit.id });
            console.log("updated character's name is", updatedCharacter.name)
          if (error) {
            console.error('Error updating character:', error);
          } else {
            console.log('Character updated successfully!');
            // Update characters state with updated data (optional)
            setCharacters(
              characters.map((c) => (c.id === characterToEdit.id ? { name, magic, description } : c))
            );
            setIsEditModalOpen(false);
            setName('');
            setMagic('');
            setDescription('');
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
      <h2>Post Gallery</h2>
      <div className="grid-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gridGap: '10px' }} >
        {characters.map((character) => (
          <div className="character-box" key={character.id} style={{ backgroundColor: '#f5f5f5', padding: '10px', borderRadius: '5px' }}
          //onClick={() => handleCharacterClick(character)} 
          >
            <p>Name: {character.name}</p>
            <p>URL:
              <a
              href={character.magic}
              target='_blank'
              rel="noopener"
              >
              {character.magic}
              </a>
            </p>
            <p>Description: {character.description}</p>
            <Link to={`/post-gallery/${encodeURIComponent(character.name)}`}>
              Details
            </Link>
            <button onClick={() => handleEditClick(character)}>Edit</button>
            <button onClick={() => handleDeleteCharacter(character)}>Delete</button>
          </div>
        ))}
      </div>
      {isEditModalOpen && (
        <Modal onClose={handleModalClose}>
          <h2>Edit Character</h2> 
          {characterToEdit && (
            <form onSubmit={(e) => e.preventDefault()}> {/* Wrap inputs in form */}
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                defaultValue={characterToEdit.name} // Set default value
                required
                onChange={(e) => setName(e.target.value)}
              />
              <label htmlFor="magic">URL:</label>
              <input
                type="text"
                id="magic"
                defaultValue={characterToEdit.magic}
                required
                onChange={(e) => setMagic(e.target.value)}
              />
              <label htmlFor="description">Description:</label>
              <input
                type="text"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
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

