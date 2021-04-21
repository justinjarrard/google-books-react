import { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import CardHeader from '@material-ui/core/CardHeader'
import Avatar from '@material-ui/core/Avatar'
import Book from '../../utils/BookAPI'
import Form from '../../components/Form'

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 350
  },
  media: {
    height: 150,
    width: 150
  }
}))

const Home = () => {
  const classes = useStyles()

  const [bookState, setBookState] = useState({
    search: '',
    books: []
  })

  const handleInputChange = ({ target }) => {
    setBookState({ ...bookState, [target.name]: target.value })
  }

  const handleSearchBook = event => {
    event.preventDefault()

    Book.getFind(bookState.search)
      .then(({ data: books }) => {
        console.log(books)
        setBookState({ ...bookState, books })
      })
      .catch(err => console.error(err))
  }

  const handleSaveBook = book => {
    Book.addBooks(book)
      .then(() => {
        const books = bookState.books.filter(googleBooks => googleBooks.id !== book.id)
        setBookState({ ...bookState, books })
      })
  }
  return (
    <>
      <Form 
        search={bookState.search}
        handleInputChange={handleInputChange}
        handleSearchBook={handleSearchBook}
      />
      {
        bookState.books.length ?
        bookState.books.map(book => (
          <Card key={book.id}>
            <CardHeader 
             title={book.volumeInfo.title}
             subheader={book.volumeInfo.authors}
            />
            <CardMedia 
              className={classes.media}
              image={book.volumeInfo.imageLinks.smallThumbnail}
              title={book.volumeInfo.title}

            />
            <CardActions>
              <Button
                size='small'
                color='primary'
                onClick={() => handleSaveBook({
                  title: book.volumeInfo.title,
                  authors: book.volumeInfo.authors[0],
                  description: book.volumeInfo.description,
                  image: book.volumeInfo.imageLinks.smallThumbnail,
                  link: book.volumeInfo.infoLink
                })}
              >
              >
                Save
              </Button>
              <Button
                size="small"
                color='primary'
                href={book.volumeInfo.infoLink}
              >
                View
              </Button>
            </CardActions>
          </Card>
        ))
        : null
      }
    </>
  )
}

export default Home