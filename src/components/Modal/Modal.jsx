import ReactDOM from "react-dom";
import "./Modal.css";
import { useContext } from "react";
import MovieContext from "../../store/MovieContext";

function Backdrop(props) {
  return <div className="backdrop" onClick={props.onClose} />;
}

function ModalOverlay(props) {
  const movieCtx = useContext(MovieContext);

  return (
    <div className="modal-container">
      {movieCtx.visibleTrailer &&
      <iframe src={`https://www.youtube.com/embed/${movieCtx.trailer_key}`} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
      }</div>
  );
}

export default function Modal(props) {
  return (
    <>
      {ReactDOM.createPortal(<Backdrop onClose={props.onClose}/>, document.getElementById("backdrop"))}
      {ReactDOM.createPortal(
        <ModalOverlay onClose={props.onClose}/>,
        document.getElementById("overlay")
      )}
    </>
  );
}
