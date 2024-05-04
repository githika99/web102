import React, { useState, useEffect } from 'react'; // Import useState
import { useParams } from 'react-router-dom';
//edited for new database

function DetailedView({supabase}) {
  const [posts, setPosts] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    console.log("use effect called")
    console.log("id is", id)
    getPosts();
    getData(id)
  }, []);

  async function getPosts() {
    const { data } = await supabase.from("all_posts").select();
    setPosts(data);
    console.log("in getPosts, posts is", posts)
  }

  const getData = (id) => {
    console.log("in getData")
    console.log("posts is", posts)
    console.log("done with getData")
  }

  console.log("in detailed view's function")
  return (
    <div>
      {/* <div className="grid-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gridGap: '10px' }} >
        {posts.filter(post => post.id === id).map((post) => (
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
        ))}
      </div> */}
    </div>
  );
}

export default DetailedView;
