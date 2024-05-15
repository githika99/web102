import React from 'react';
import { Link } from "react-router-dom";


const Cats = ({ cats }) => {
  let catid = "abys"

  console.log("input to cats is filtered cats:")
  console.log(cats)
  return (
    <table>
      <thead>
        <tr>
          <th>Breed</th>
          <th>Affection Level</th>
          <th>Energy Level</th>
          <th>Intelligence</th>
          <th>Temperament</th>
        </tr>
      </thead>
      <tbody>
        {cats.map((cat) => ( 
          <tr key={cat.breed}>
          <Link 
              to={`/catDetails/${catid}`}
              key={cat.id}>  
            <td>{cat.breed}</td>
          </Link>
            <td>{cat.affection_level}</td>
            <td>{cat.energy_level}</td>
            <td>{cat.intelligence}</td>
            <td>{cat.temperament}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Cats;
