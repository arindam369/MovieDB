import "./Navbar.css";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaRegWindowClose } from "react-icons/fa";
import { useState, useContext, useRef } from "react";
import MovieContext from "../../store/MovieContext";
import LoadingBar from 'react-top-loading-bar';

export default function Navbar() {
    const [visibleNavbar, setVisibleNavbar] = useState(false);
    const [movieName, setMovieName] = useState("");
    const loadingRef = useRef(null)
    const movieCtx = useContext(MovieContext);

    function showNavbar(){
        setVisibleNavbar(true);
    }
    function hideNavbar(){
        setVisibleNavbar(false);
    }

    function handleSubmit(e){
      e.preventDefault();
      loadingRef.current.continuousStart();
      movieCtx.searchMovie(movieName);
      setMovieName("");
    }

    function findTrendingMovies(){
      loadingRef.current.continuousStart();
      movieCtx.findTrendingMovies();
      hideNavbar();
    }
    function findPopularMovies(){
      loadingRef.current.continuousStart();
      movieCtx.findPopularMovies();
      hideNavbar();
    }
    function findFavouriteMovies(){
      loadingRef.current.continuousStart();
      movieCtx.findFavouriteMovies();
      hideNavbar();
    }
    function findTopRatedMovies(){
      loadingRef.current.continuousStart();
      movieCtx.findTopRatedMovies();
      hideNavbar();
    }
    function findNowPlayingMovies(){
      loadingRef.current.continuousStart();
      movieCtx.findNowPlayingMovies();
      hideNavbar();
    }
    function findUpcomingMovies(){
      loadingRef.current.continuousStart();
      movieCtx.findUpcomingMovies();
      hideNavbar();
    }
    function discoverMovies(){
      loadingRef.current.continuousStart();
      movieCtx.discoverMovies();
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
            <div className="logo" onClick={discoverMovies}>MovieDB</div>
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
            <input type="text" placeholder="Search Movies" value={movieName} onChange={(e)=>{setMovieName(e.target.value)}}/>
          </form>
        </div>
        <LoadingBar color='#0275d8' ref={loadingRef} />
      </nav>
      
      {visibleNavbar && 
      <div id="mobile-elements">
        <div className="logo" onClick={discoverMovies}>MovieDB</div>
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
