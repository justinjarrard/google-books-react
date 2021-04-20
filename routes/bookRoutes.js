const router = require('express').Router()
const { Book } = require('../models')

router.get('/books', (req, res) => {
  Book.find({})
    .then(books => res.json(books))
    .catch(err => console.log(err))
})

router.post('/books', (req, res) => {
  Book.create(req.body)
    .then(gif => res.json(gif))
    .catch(err => console.log(err))
})

// router.delete('/books/:id' (req, res) => {
//   Book.findByIdAndDelete(req.params.id)
//     .then(() => res.sendStatus(200))
//     .catch(err => console.log(err))
// })

module.exports = router