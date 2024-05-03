import React, { useState, useEffect } from 'react'; // Import useState
import { Link } from 'react-router-dom';
import Modal from './Modal.jsx'; // Import your Modal component

//edited for new dataset

function Gallery({supabase}) {
    const [posts, setPosts] = useState([]);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false); // Define isEditModalOpen state
    const [postToEdit, setPostToEdit] = useState(null);
    const [title, setTitle] = useState('');
    const [rating, setRating] = useState('');
    const [stars, setStars] = useState('');
    const [timestamp, setTimeStamp] = useState('');

    useEffect(() => {
        getPosts();
    }, []);

    async function getPosts() {
        const { data } = await supabase.from("all_posts").select();
        setPosts(data);
    }

    //changed to delete by id
    const handleDeletePost = async (post) => {
        try {
          const { error } = await supabase.from("all_posts").delete().match({ 
            id: post.id,
          }); 
            console.log('Character deleted successfully!');
            // Update characters state to reflect deletion (optional)
            setCharacters(characters.filter((c) => 
            c.id !== character.id
            ));          
          
        } catch (error) {
          console.error('Error deleting character:', error);
        }
      };

      //to edit a character
      const handleEditClick = (post) => {
        setPostToEdit(post);
        setIsEditModalOpen(true);
      };
    
      const handleEditSubmit = async (updatedPost) => {
        try {
          const { error } = await supabase
            .from("all_posts")
            .update({ title, rating, stars })
            .match({ id: postToEdit.id });
            console.log("updated character's name is", updatedCharacter.name)
          if (error) {
            console.error('Error updating character:', error);
          } else {
            console.log('Character updated successfully!');
            // Update characters state with updated data (optional)
            setCharacters(
              characters.map((c) => (c.id === postToEdit.id ? { title, rating, stars } : c))
            );
            setIsEditModalOpen(false);
            setTitle('');
            setRating('');
            setStars('');
          }
        } catch (error) {
          console.error('Error updating character:', error);
        }
      };
    
      const handleModalClose = () => {
        setIsEditModalOpen(false);
        setPostToEdit(null); // Clear character for editing
      };
    

  return (
    <div className="gallery">
      <h2>Post Gallery</h2>
      <div className="grid-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gridGap: '10px' }} >
        {post.map((post) => (
          <div className="character-box" key={post.name} style={{ backgroundColor: '#f5f5f5', padding: '10px', borderRadius: '5px' }}
          >
            <p>Title: {post.movie_title}</p>
            <p>Review: {post.rating}</p>
            <p>Stars: {post.stars}</p>
            <Link to={`/post-gallery/${character.id}`}>
              Details
            </Link>
            <button onClick={() => handleEditClick(post)}>Edit</button>
            <button onClick={() => handleDeleteCharacter(post)}>Delete</button>
          </div>
        ))}
      </div>
      {isEditModalOpen && (
        <Modal onClose={handleModalClose}>
          <h2>Edit Post</h2> {/* Change title to Edit Character */}
          {postToEdit && (
            <form onSubmit={(e) => e.preventDefault()}>
            <div className="form-box">
              <label htmlFor="title">Movie Title:</label>
              <input
                type="text"
                id="title"
                defaultValue={postToEdit.title}
                required
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="form-box">
              <label htmlFor="rating">Change your review:</label>
              <input
                type="text"
                id="rating"
                defaultValue={postToEdit.rating}
                required
                onChange={(e) => setRating(e.target.value)}
              />
            </div>
            <div className="form-box">
              <label htmlFor="house">Stars:</label>
              <select id="stars" defaultValue={postToEdit.stars} onChange={(e) => setStars(e.target.value)} required>
                <option value="">Select Stars</option>
                <option value="one">1</option>
                <option value="two">2</option>
                <option value="three">3</option>
                <option value="four">4</option>
                <option value="five">5</option>
              </select>
            </div>
            <button type="submit" onClick={() => handleEditSubmit(postToEdit)}>
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

