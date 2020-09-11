import React, { useContext, useMemo } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';
import { BookContext } from '../contexts/BookContext';

const BookList = () => {
  const { isLightTheme, light, dark } = useContext(ThemeContext);
  const { books } = useContext(BookContext);
  const theme = isLightTheme ? light : dark;
  const bookStyle = useMemo(() => ({ color: theme.syntax, background: theme.bg }), [isLightTheme]);
  const listStyle = useMemo(() => ({ background: theme.ui }), [isLightTheme]);

  return (
    <div className="book-list" style={bookStyle}>
      <ul>
        {books.map(book => {
          return (
            <li key={book.id} style={listStyle}>{ book.title }</li>
          )
        })}
      </ul>
    </div>
  )
}

export default BookList;