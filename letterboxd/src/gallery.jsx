import React, { useState, useEffect } from 'react'; // Import useState
import { Link } from 'react-router-dom';
import Modal from './Modal.jsx'; // Import your Modal component

//edited for new dataset

function Gallery({supabase}) {
    const [posts, setPosts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]); // State to store filtered posts
    const [searchQuery, setSearchQuery] = useState(''); // State to store search query
    const [isEditModalOpen, setIsEditModalOpen] = useState(false); // Define isEditModalOpen state
    const [postToEdit, setPostToEdit] = useState(null);
    const [title, setTitle] = useState('');
    const [rating, setRating] = useState('');
    const [stars, setStars] = useState('');
    const [sortBy, setSortBy] = useState('created_time_desc'); // State to store sort option


    useEffect(() => {
        console.log("use effect called")
        getPosts();
    }, []);

    async function getPosts() {
        const { data } = await supabase.from("all_posts").select();
        setPosts(data);
        setFilteredPosts(data); // Set initial filtered posts to all posts
        console.log("posts is", posts) //will be empty because of javascript's async updating
    }

    // Filter posts based on search query
    const handleSearch = (event) => {
      const query = event.target.value.toLowerCase();
      setSearchQuery(query);
      const filteredData = posts.filter((post) =>
        post.title.toLowerCase().includes(query)
      );
      setFilteredPosts(filteredData);
      console.log("filtered posts is", filteredPosts)
    };

    // Sort posts based on selected option
    const handleSort = (event) => {
      const sortOption = event.target.value;
      setSortBy(sortOption);

      let sortedPosts = [...filteredPosts]; // Copy the filtered posts array to avoid mutation

      switch (sortOption) {
        case 'created_time_asc':
          sortedPosts.sort((a, b) => new Date(a.time_created) - new Date(b.time_created));
          break;
        case 'created_time_desc':
          sortedPosts.sort((a, b) => new Date(b.time_created) - new Date(a.time_created));
          break;
        case 'likes_asc':
          sortedPosts.sort((a, b) => a.likes - b.likes);
          break;
        case 'likes_desc':
          sortedPosts.sort((a, b) => b.likes - a.likes);
          break;
        default:
          break;
      }

      setFilteredPosts(sortedPosts);
    };

    //changed to delete by id
    const handleDeletePost = async (post) => {
      try {
        const { error } = await supabase.from("all_posts").delete().match({ 
          id: post.id,
        }); 
          console.log('Post deleted successfully!');
          // Update posts state to reflect deletion (optional)
          //this name posts is a filler name, it can be anything
          //that is why we can use posts in the second filter call
          setPosts(posts.filter((c) => 
          c.id !== post.id
          ));        
          setFilteredPosts(posts.filter((c) => 
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
            setFilteredPosts(
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
            setFilteredPosts(
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
            setFilteredPosts(
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

    const handleAddLike = async (post) => {
      // Increment the likes count locally
      const updatedLikes = post.likes + 1;

      // Update the post's likes count in the database
      const { error } = await supabase
        .from("all_posts")
        .update({ likes: updatedLikes })
        .match({ id: post.id });

      if (error) {
        console.error('Error updating post:', error);
      } else {
        // Update the posts state with the updated likes count
        setPosts(posts.map((c) => (c.id === post.id ? { ...c, likes: updatedLikes } : c)));
        setFilteredPosts(filteredPosts.map((c) => (c.id === post.id ? { ...c, likes: updatedLikes } : c)));

      }
    }


  return (
    <div className="gallery">
      <h2>Post Gallery</h2>
      <input
        type="text"
        placeholder="Search by Movie Title"
        onChange={handleSearch}
        value={searchQuery}
      />
      <select value={sortBy} onChange={handleSort}>
        <option value="created_time_desc">Sort by Created Time (Descending)</option>
        <option value="created_time_asc">Sort by Created Time (Ascending)</option>
        <option value="likes_desc">Sort by Upvotes (Descending)</option>
        <option value="likes_asc">Sort by Upvotes (Ascending)</option>
      </select>
      <div className="grid-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gridGap: '10px' }} >
        {filteredPosts.map((post) => (
          <div className="character-box" key={post.id} style={{ backgroundColor: '#f5f5f5', padding: '10px', borderRadius: '5px' }}
          >
            <p>Title: {post.title}</p>
            <p>Review: {post.rating}</p>
            <p>Stars: {post.stars}</p>
            <p>Likes: {post.likes}</p>
            <p>Time Created: {post.time_created}</p>
            <Link to={`/post-gallery/${post.id}`}>
              Details
            </Link>
            <button onClick={() => handleEditClick(post)}>Edit</button>
            <button onClick={() => handleDeletePost(post)}>Delete</button>
            <button onClick={() => handleAddLike(post)}>Like</button>
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

 



