import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

const Form = ({
  search,
  handleInputChange,
  handleSearchBook
}) => {
  return (
    <form onSubmit={handleSearchBook}>
      <TextField
        label='Search Books'
        name='search'
        value={search}
        onChange={handleInputChange}
      />
      <Button
        variant='outlined'
        color='primary'
        onClick={handleSearchBook}
      >
        Search
      </Button>
    </form>
  )
}

export default Form