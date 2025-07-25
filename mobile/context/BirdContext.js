import React, { createContext, useState } from 'react';

export const BirdContext = createContext();

export const BirdProvider = ({ children }) => {
  const [collection, setCollection] = useState([]);

  const addBird = bird => setCollection(prev => [...prev, bird]);

  return (
    <BirdContext.Provider value={{ collection, addBird }}>
      {children}
    </BirdContext.Provider>
  );
};