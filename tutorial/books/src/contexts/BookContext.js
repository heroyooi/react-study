import React, { createContext, useState, useMemo } from 'react';

export const BookContext = createContext();

const BookContextProvider = ({ children }) => {
  const [books, setBooks] = useState([
    {title: 'name of the wind', id: 1},
    {title: 'the way of kings', id: 2},
    {title: 'the final empire', id: 3},
    {title: 'the hero of ages', id: 4}
  ]);
  const value = useMemo(() => ({ books }), [books]);
  return (
    <BookContext.Provider value={value}>
      {children}
    </BookContext.Provider>
  );
}

export default BookContextProvider;