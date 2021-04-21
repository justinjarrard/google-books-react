const router = require('express').Router()
const { Book } = require('../models')
const axios = require('axios')

router.get('/find/:title', (req, res) => {
  axios.get(`https://www.googleapis.com/books/v1/volumes?q=${req.params.title}&${process.env.GOOGLE_API_KEY}`)
    .then(({ data: { items } }) => {
      res.json(items)
      Book.find({})
        .then(books => {
          const booksFiltered = items.filter(book => {
            let keep = true
            books.forEach(saved => {
              if (saved.bookId === book.id) {
                keep = false
              }
            })
            return keep
          })
          res.json(booksFiltered)
        })
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
})


module.exports = router