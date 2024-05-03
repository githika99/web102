import React, { useState } from 'react';
//updated for new database


function Create({supabase}) {
  const [title, setTitle] = useState('');
  const [rating, setRating] = useState('');
  const [stars, setStars] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Handle form submission here (e.g., store data in a database, display confirmation)
    console.log('movie title:', title);
    console.log('rating:', rating);
    console.log('stars:', stars);
    const post = { movie_title: title, rating, stars, likes: 0, time_created: '2024-05-02 21:25:46', comments: [] };

    
    try {
        const { data, error } = await supabase
          .from('all_posts') // Replace with your table name
          .insert([post]);
          if (error) {
            console.error('Error adding character:', error);
          } else {
            console.log('Post added successfully:', data);
            setTitle('');
            setRating('');
            setStars('');
          }
      } catch (error) {
        console.error('Error adding post:', error);
      }

  };

  return (
    <div className="create-container">
      <h2>Create a Post</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-box">
          <label htmlFor="title">Movie Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form-box">
          <label htmlFor="rating">Add your review here:</label>
          <input
            type="text"
            id="rating"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          />
        </div>
        <div className="form-box">
          <label htmlFor="house">Stars:</label>
          <select id="stars" value={stars} onChange={(e) => setStars(e.target.value)}>
            <option value="">Select Stars</option>
            <option value="one">1</option>
            <option value="two">2</option>
            <option value="three">3</option>
            <option value="four">4</option>
            <option value="five">5</option>
          </select>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Create;

