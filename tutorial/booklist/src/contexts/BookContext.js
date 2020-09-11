import React, { createContext, useReducer, useMemo, useEffect } from 'react';
import { bookReducer } from '../reducers/bookReducer';

export const BookContext = createContext();

const BookContextProvider = ({ children }) => {
  const [books, dispatch] = useReducer(bookReducer, [], () => {
    const localData = localStorage.getItem('books');
    return localData ? JSON.parse(localData) : []
  });
  const value = useMemo(() => ({ books, dispatch }), [books]);
  useEffect(() => {
    localStorage.setItem('books', JSON.stringify(books));
  }, [books]);
  return (
    <BookContext.Provider value={value}>
      {children}
    </BookContext.Provider>
  )
};

export default BookContextProvider;