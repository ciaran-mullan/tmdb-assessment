import { Navbar, Container, Form, FormControl, Button } from 'react-bootstrap';

const MovieNavbar = (props: any) => {
  
  return(
    <Navbar bg="dark" expand="lg" variant="dark">
      <Container fluid>
        <Navbar.Brand href="/">TheMovieDB</Navbar.Brand>
        <Form className="d-flex" autoComplete="off">
          <FormControl 
            type="search"
            placeholder="Search here..."
            className="me-2"
            aria-label="search"
            name="query"
            value={props.searchValue}
            onChange={(event) => {
              props.setSearchValue(event.target.value);
              console.log(props.searchValue);
            }}/>
            <Button variant="secondary" type="submit">Search</Button>
        </Form>
      </Container>
    </Navbar>
  )
}

export default MovieNavbar;