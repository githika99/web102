import React from 'react';
import { useParams } from 'react-router-dom';
//edited for new database

function DetailedView() {
  const { id } = useParams();

  console.log("in detailed view's function")
  return (
    <div>
      <h2>Detailed View</h2>
      <p>Title: {title}</p>
      <p>Review: {rating}</p>
      <p>Stars: {stars}</p>
      <p>Likes: {likes}</p>
      <p>Time Created: {time_created}</p>
      <p>Comments: {comments}</p>
    </div>
  );
}

export default DetailedView;
