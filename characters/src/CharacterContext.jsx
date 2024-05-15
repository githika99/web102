import React, { createContext, useState } from 'react';

//array of characters?
const CharacterContext = createContext({
  characters: [],
  addCharacter: (character) => {},
});

//function bc all functions in jsx return html
//arrow function
//why is the useState defined inside of a function?
const CharacterProvider = ({ children }) => {
  const [characters, setCharacters] = useState([]);

  const addCharacter = (character) => {
    setCharacters([...characters, character]);
  };

  return (
    <CharacterContext.Provider value={{ characters, addCharacter }}> {/* Closing bracket added here */}
      {children}
    </CharacterContext.Provider>
  );
};

export { CharacterContext, CharacterProvider };

/*
//My idea to do it without createContext and just with useState

import React, { useState } from 'react';


function CharacterProvider = ({ children }) => {
  const [characters, setCharacters] = useState([]);

  const addCharacter = (character) => {
    setCharacters([...characters, character]);
  };

  //not sure what to return here
  //i should look at where CharacterProvider is being called.
  return (
    <>
    {characters}
    </>
  );
};

export default CharacterProvider;


*/
