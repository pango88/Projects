import React, { useState, useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import { BOOKS_BY_GENRE } from '../queries';

const Books = ({ show, books }) => {
  const [genre, setGenre] = useState('allGenres');
  const [filteredBooks, setFilteredBooks] = useState(null);
  const [getBooks, result] = useLazyQuery(BOOKS_BY_GENRE);

  const showBooksByGenre = (genre) => {
    getBooks({ variables: { genre: genre } });
  };

  useEffect(() => {
    if (result.data) {
      setFilteredBooks(result.data.allBooks);
    }
  }, [result.data]);

  if (!show) {
    return null;
  }

  // Taking out genres then making it into a single array
  const genres = books.map((b) => (b.genres ? b.genres : null)).flat();

  // Removing all duplicates from genres
  const filteredGenres = [...new Set(genres)];

  const bookList = () => {
    if (genre === 'allGenres') {
      return books.map((a) => (
        <tr key={a.title}>
          <td>{a.title}</td>
          <td>{a.author.name}</td>
          <td>{a.published}</td>
        </tr>
      ));
    }
    if (!filteredBooks) {
      return null;
    } else {
      return filteredBooks.map((a) => (
        <tr key={a.title}>
          <td>{a.title}</td>
          <td>{a.author.name}</td>
          <td>{a.published}</td>
        </tr>
      ));
    }
  };

  return (
    <div>
      <h2>books</h2>
      {genre === 'allGenres' ? (
        <p>Showing all genres</p>
      ) : (
        <p>
          in genre <b>{genre}</b>
        </p>
      )}
      <table>
        <tbody>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>published</th>
          </tr>
          {bookList()}
        </tbody>
      </table>
      {filteredGenres.map((genre) => (
        <button
          key={genre}
          type="submit"
          onClick={() => {
            showBooksByGenre(genre);
            setGenre(genre);
          }}
        >
          {genre}
        </button>
      ))}
      <button type="submit" onClick={() => setGenre('allGenres')}>
        all genres
      </button>
    </div>
  );
};

export default Books;
