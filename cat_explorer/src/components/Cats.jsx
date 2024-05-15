import React from 'react';

const Cats = ({ cats, onCatClick }) => { // Pass onCatClick prop

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
          <tr key={cat.breed} onClick={() => onCatClick(cat)}>
            <td>{cat.breed}</td>
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
