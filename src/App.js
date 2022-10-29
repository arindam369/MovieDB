import Navbar from "./components/NavBar/Navbar";
import "./App.css";
import Movies from "./components/Movies/Movies";
import Modal from "./components/Modal/Modal";
import { useContext } from "react";
import MovieContext from "./store/MovieContext";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function App(){
  const movieCtx = useContext(MovieContext);
  window.addEventListener("load", ()=>{
    movieCtx.discoverMovies();
  })

  return (
    <>
      <Navbar />
      <Movies/>
      {movieCtx.visibleTrailer && <Modal onClose={movieCtx.hideTrailer} trailer_key={movieCtx.trailer_key} visibleTrailer={movieCtx.visibleTrailer}/>}

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        />
    </>
  );
}