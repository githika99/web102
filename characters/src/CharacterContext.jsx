import React, { createContext, useState } from 'react';

const CharacterContext = createContext({
  characters: [],
  addCharacter: (character) => {},
});

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
