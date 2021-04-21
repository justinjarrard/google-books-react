import axios from 'axios'

const Book = {
  getFind: (search) => axios.get(`/api/find/${search}`),
  getBooks: () => axios.get('/api/books'),
  addBooks: book => axios.post('/api/books', book),
  deleteBook: id => axios.delete(`/api/books/${id}`)
}

export default Book