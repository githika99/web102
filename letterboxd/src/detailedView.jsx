import React, { useState, useEffect } from 'react'; // Import useState
import { useParams } from 'react-router-dom';
import Modal from './Modal.jsx'; // Import your Modal component
//edited for new database

function DetailedView({supabase}) {
  const [posts, setPosts] = useState([]);
  const [post, setPost] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // Define isEditModalOpen state
  const [title, setTitle] = useState('');
  const [rating, setRating] = useState('');
  const [stars, setStars] = useState('');
  const { id } = useParams();
  const id_num = parseInt(id);

  useEffect(() => {
    console.log("use effect called")
    console.log("id is", id)
    async function getPosts() {
      const { data } = await supabase.from("all_posts").select();
      setPosts(data);
    }
    getPosts()
  }, []);


  useEffect(() => {
    console.log("use effect: posts is now", posts)
    const curr = posts.find(post => post.id === id_num);
    setPost(curr)
  }, [posts]);


  useEffect(() => {
    console.log("use effect: post is now", post)
  }, [post]);


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
    }
  }

  //i didn't know you could have multiple returns in JSX okayyyyyyyy
  //this is necessary!!!!!!!!! without this we get an error, so while post is not loaded, this will render
  if (!post) {
    return <p>Loading...</p>; // Render a loading state until post is fetched
  }

  return (
    <div>
      <div className="grid-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gridGap: '10px' }} >
          <div className="character-box" key={post.id} style={{ backgroundColor: '#f5f5f5', padding: '10px', borderRadius: '5px' }}
          >
            <p>Title: {post.title}</p>
            <p>Review: {post.rating}</p>
            <p>Stars: {post.stars}</p>
            <p>Likes: {post.likes}</p>
            <p>Time Created: {post.time_created}</p>
            <p>Comments: {post.comments}</p>
            <button onClick={() => handleEditClick(post)}>Edit</button>
            <button onClick={() => handleDeletePost(post)}>Delete</button>
            <button onClick={() => handleAddLike(post)}>Like</button>
          </div>
      </div>
    </div>
  );
}

export default DetailedView;
