const router = require('express').Router()
const { Book } = require('../models')
const axios = require('axios')

router.get('/find/:title/:author', (req, res) => {
  axios.get(`https://www.googleapis.com/books/v1/volumes?q=${req.params.title}+inauthor:${req.params.author}&${process.env.GOOGLE_API_KEY}`)
    .then(({ data }) => {
      res.json(data)
    })

})

module.exports = router