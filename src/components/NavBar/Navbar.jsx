import "./Navbar.css";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaRegWindowClose } from "react-icons/fa";
import { useState, useContext } from "react";
import MovieContext from "../../store/MovieContext";

export default function Navbar() {
    const [visibleNavbar, setVisibleNavbar] = useState(false);
    const [movieName, setMovieName] = useState("");

    const movieCtx = useContext(MovieContext);

    function showNavbar(){
        setVisibleNavbar(true);
    }
    function hideNavbar(){
        setVisibleNavbar(false);
    }

    function handleSubmit(e){
      e.preventDefault();
      movieCtx.searchMovie(movieName);
    }

    function findTrendingMovies(){
      movieCtx.findTrendingMovies();
      hideNavbar();
    }
    function findPopularMovies(){
      movieCtx.findPopularMovies();
      hideNavbar();
    }
    function findFavouriteMovies(){
      movieCtx.findFavouriteMovies();
      hideNavbar();
    }
    function findTopRatedMovies(){
      movieCtx.findTopRatedMovies();
      hideNavbar();
    }
    function findNowPlayingMovies(){
      movieCtx.findNowPlayingMovies();
      hideNavbar();
    }
    function findUpcomingMovies(){
      movieCtx.findUpcomingMovies();
      hideNavbar();
    }

  return (
    <>
      <nav>
        <div className="leftPart">
          {!visibleNavbar && <div id="hamburger">
            <GiHamburgerMenu onClick={showNavbar}/>
          </div>}
          {visibleNavbar && <div id="close">
            <FaRegWindowClose onClick={hideNavbar}/>
          </div>}
          <div id="desktop-elements">
            <div className="logo">MovieDB</div>
            <div className="elements">
              <li onClick={findTrendingMovies}>Trending</li>
              <li onClick={findPopularMovies}>Popular</li>
              <li onClick={findFavouriteMovies}>Favourites</li>
              <li onClick={findTopRatedMovies}>Top Rated</li>
              <li onClick={findNowPlayingMovies}>Now Playing</li>
              <li onClick={findUpcomingMovies}>Upcoming</li>
            </div>
          </div>
        </div>
        <div className="rightPart">
          <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Search Movies" onChange={(e)=>{setMovieName(e.target.value)}}/>
          </form>
        </div>
      </nav>
      
      {visibleNavbar && 
      <div id="mobile-elements">
        <div className="logo">MovieDB</div>
        <div className="elements">
              <li onClick={findTrendingMovies}>Trending</li>
              <li onClick={findPopularMovies}>Popular</li>
              <li onClick={findFavouriteMovies}>Favourites</li>
              <li onClick={findTopRatedMovies}>Top Rated</li>
              <li onClick={findNowPlayingMovies}>Now Playing</li>
              <li onClick={findUpcomingMovies}>Upcoming</li>
        </div>
      </div>}
    </>
  );
}
