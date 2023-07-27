import axios from 'axios';

const API_URL = '/api/books/';

// Create new book
const createBook = async (bookData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL, bookData, config);
  return response.data;
};

// Get user books with pagination
const getBooks = async (token, page = 1, limit = 4) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: { 
      page,
      limit,
    },
  };
  const response = await axios.get(API_URL, config);
  return response.data;
};

// Delete user books
const deleteBook = async (bookId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(API_URL + bookId, config);

  return response.data;
};

const bookService = {
  createBook,
  getBooks,
  deleteBook,
};

export default bookService;
