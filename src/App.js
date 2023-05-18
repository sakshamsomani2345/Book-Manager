import React, { useState } from 'react';
import './App.css';

function App() {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [yearPublished, setYearPublished] = useState('');
  const [isbn, setIsbn] = useState('');
  const [selectedBook, setSelectedBook] = useState(null);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleAuthorChange = (e) => {
    setAuthor(e.target.value);
  };

  const handleYearPublishedChange = (e) => {
    setYearPublished(e.target.value);
  };

  const handleIsbnChange = (e) => {
    setIsbn(e.target.value);
  };

  const handleAddBook = () => {
    const newBook = {
      title,
      author,
      yearPublished,
      isbn
    };
    setBooks([...books, newBook]);
    setTitle('');
    setAuthor('');
    setYearPublished('');
    setIsbn('');
  };

  const handleDeleteBook = (isbn) => {
    setBooks(books.filter((book) => book.isbn !== isbn));
  };

  const handleEditBook = (book) => {
    setSelectedBook(book);
    setTitle(book.title);
    setAuthor(book.author);
    setYearPublished(book.yearPublished);
    setIsbn(book.isbn);
  };

  const handleUpdateBook = () => {
    const updatedBook = {
      title,
      author,
      yearPublished,
      isbn
    };

    const updatedBooks = books.map((book) =>
      book.isbn === selectedBook.isbn ? updatedBook : book
    );

    setBooks(updatedBooks);
    setSelectedBook(null);
    setTitle('');
    setAuthor('');
    setYearPublished('');
    setIsbn('');
  };

  return (
    <div className="container">
      <h1>Book Manager</h1>
      <div className="form-container">
        <h2>{selectedBook ? 'Edit Book' : 'Add Book'}</h2>
        <div className="input-container">
          <label>Title:</label>
          <input type="text" value={title} onChange={handleTitleChange} />
        </div>
        <div className="input-container">
          <label>Author:</label>
          <input type="text" value={author} onChange={handleAuthorChange} />
        </div>
        <div className="input-container">
          <label>Year Published:</label>
          <input
            type="text"
            value={yearPublished}
            onChange={handleYearPublishedChange}
          />
        </div>
        <div className="input-container">
          <label>ISBN:</label>
          <input type="text" value={isbn} onChange={handleIsbnChange} />
        </div>
        {selectedBook ? (
          <button className="update-button" onClick={handleUpdateBook}>
            Update Book
          </button>
        ) : (
          <button className="add-button" onClick={handleAddBook}>
            Add Book
          </button>
        )}
      </div>
      <div className="book-list">
        <h2>Book List</h2>
        {books.length === 0 ? (
          <p>No books to display</p>
        ) : (
          <ul>
            {books.map((book) => (
              <li key={book.isbn}>
                <div>
                  <strong>Title:</strong> {book.title}
                </div>
                <div>
                  <strong>Author:</strong> {book.author}
                </div>
                <div>
                  <strong>Year Published:</strong> {book.yearPublished}
                </div>
                <div>
                  <strong>ISBN:</strong> {book.isbn}
                </div>
                <div className="actions">
                  <button
                    className="edit-button"
                    onClick={() => handleEditBook(book)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-button"
                    onClick={() => handleDeleteBook(book.isbn)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;
