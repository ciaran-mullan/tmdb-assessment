import { useState } from "react";
import { Modal } from "react-bootstrap";

type Props = {
  id: string,
  title: string,
  poster_path: string,
  release_date: string,
  overview: string,
}

const SearchResultBox = ({id, title, poster_path, release_date, overview}: Props) => {
  
  const [show, setShow] = useState(false);

  const handleShow = () => {
    setShow(true);
  }
  const handleClose = () => {
    setShow(false);
  }

  return(
    <div className="card text-center mb-3 bg-transparent text-white">
      <div id="movie-container"  onClick={handleShow}>
        <div className="card-body">
          <h5 title={title} id="title" >{title}</h5>
          <p id="card-release-date">({release_date ? new Date(release_date).getFullYear() : "Release date not available"})</p>
          {poster_path ? (
            <img id="card-poster" className="card-img-top" alt={title} src={"https://image.tmdb.org/t/p/w500"+poster_path}/>
          ) : (
            <h5 id="no-poster">No poster available</h5>
          )}
        </div>
      </div>
      <Modal className="text-black" show={show} onHide={handleClose}>
        <Modal.Header className="text-center d-block" >
          <Modal.Title className="d-inline-block">{title + " " +`(${release_date ? new Date(release_date).getFullYear() : "Release date not available"})`}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex justify-content-center">
            {poster_path ? (
              <img id="modal-poster" className="card-img-top" alt={title} src={"https://image.tmdb.org/t/p/w500"+poster_path}/>
            ) : (
              <h5 id="no-poster">No poster available</h5>
            )}
          </div>
          <hr/>
          <p>{overview ? overview : "No overview available."}</p>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default SearchResultBox;