import React from 'react';
import { useParams } from 'react-router-dom';

function DetailedView() {
  const { name, magic, description } = useParams();

  console.log("in detailed view's function")
  console.log("name is", name);
  console.log("url is", magic);
  console.log("description is", description);

  return (
    <div>
      <h2>Detailed View</h2>
      {/* <p>Name: {name}</p>
      <p>URL: {magic}</p>
      <p>Description: {description}</p> */}
      <p>Name: HINDZ</p>
      <p>URL: 
          <a
          href='https://www.youtube.com/@HINDZSIGHT'
          target='_blank'
          rel="noopener"
          >
          https://www.youtube.com/@HINDZSIGHT
          </a>
      </p>
      <p>Description: HINDZ posts about meditation and self help. His videos have a very calming vibe!</p>
    </div>
  );
}

export default DetailedView;
