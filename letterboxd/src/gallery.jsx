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

    useEffect(() => {
        console.log("use effect called")
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
          console.log('Post deleted successfully!');
          // Update posts state to reflect deletion (optional)
          setPosts(posts.filter((c) => 
          c.id !== post.id
          ));          
        
      } catch (error) {
        console.error('Error deleting post:', error);
      }
    };

    //to edit a post
    const handleEditClick = (post) => {
      setPostToEdit(post);
      setIsEditModalOpen(true);
    };

    const handleEditSubmit = async (updatedPost) => {
      //using how these are different to edit
      console.log("updated posts's title:", updatedPost.title, "rating:", updatedPost.rating, "stars:", updatedPost.stars)
      console.log("updated posts's title:", title, "rating:", rating, "stars:", stars)
      try {
        let success = true
        if (stars !== ""){
          const { error } = await supabase
          .from("all_posts")
          .update({ stars })
          .match({ id: postToEdit.id });
          if (error) {
            console.error('Error updating post:', error);
            success = false
          } else {
            setPosts(
              posts.map((c) => (c.id === postToEdit.id ? { ...c, stars} : c))
            );
          }
        }

        if (rating !== ""){
          const { error } = await supabase
          .from("all_posts")
          .update({ rating })
          .match({ id: postToEdit.id });
          if (error) {
            console.error('Error updating post:', error);
            success = false
          } else {
            setPosts(
              posts.map((c) => (c.id === postToEdit.id ? {...c, rating} : c))
            );
          }
        }

        if (title !== ""){
          const { error } = await supabase
          .from("all_posts")
          .update({ title })
          .match({ id: postToEdit.id });
          if (error) {
            console.error('Error updating post:', error);
            success = false
          } else {
            setPosts(
              posts.map((c) => (c.id === postToEdit.id ? { ...c, title} : c))
            );
          }
        }
        if (success) 
          console.log('Post updated successfully!');
          setIsEditModalOpen(false);
          setTitle('');
          setRating('');
          setStars('');
        }
      catch (error) {
        console.error('Error updating post:', error);
      }
    };

    const handleModalClose = () => {
      setIsEditModalOpen(false);
      setPostToEdit(null); // Clear post for editing
    };


  return (
    <div className="gallery">
      <h2>Post Gallery</h2>
      <div className="grid-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gridGap: '10px' }} >
        {posts.map((post) => (
          <div className="character-box" key={post.id} style={{ backgroundColor: '#f5f5f5', padding: '10px', borderRadius: '5px' }}
          >
            <p>Title: {post.title}</p>
            <p>Review: {post.rating}</p>
            <p>Stars: {post.stars}</p>
            <Link to={`/post-gallery/${post.id}`}>
              Details
            </Link>
            <button onClick={() => handleEditClick(post)}>Edit</button>
            <button onClick={() => handleDeletePost(post)}>Delete</button>
          </div>
        ))}
      </div>
      {isEditModalOpen && (
      <Modal onClose={handleModalClose}>
        <h2>Edit Post</h2> {/* Change title to Edit Post */}
        {postToEdit && (
          <form onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="title">Movie Title:</label>
            <input
              type="text"
              id="title"
              defaultValue={postToEdit.title}
              required
              onChange={(e) => setTitle(e.target.value)}
            />
            <label htmlFor="rating">Review:</label>
            <input
              type="text"
              id="rating"
              defaultValue={postToEdit.rating}
              required
              onChange={(e) => setRating(e.target.value)}
            />
            <label htmlFor="house">Stars:</label>
            <select id="stars" defaultValue={postToEdit.stars} onChange={(e) => setStars(e.target.value)}>
              <option value='one'>1</option>
              <option value='two'>2</option>
              <option value='three'>3</option>
              <option value='four'>4</option>
              <option value='five'>5</option>
            </select>
          <button type="submit" onClick={() => handleEditSubmit(postToEdit)} >
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

 


