import React from 'react';
import { useParams } from 'react-router-dom';

function DetailedView() {
  const { name, magic, house } = useParams();

  console.log("in detailed view's function")
  return (
    <div>
      <h2>Detailed View</h2>
      <p>Name: {name}</p>
      <p>Magical Strength: {magic}</p>
      <p>House: {house}</p>
    </div>
  );
}

export default DetailedView;
