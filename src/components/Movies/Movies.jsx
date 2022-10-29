import { useState, useContext } from "react";
import MovieContext from "../../store/MovieContext";
import "./Movies.css";
import Movie from "../Movie/Movie";
import {MdFavorite} from "react-icons/md";
import {BsPlayFill} from "react-icons/bs";
import { IoIosRemoveCircleOutline } from "react-icons/io"

export default function Movies(){
    const movieCtx = useContext(MovieContext);

    // const [isOpened, setIsOpened] = useState(false);
    const [fullMovie, setFullMovie] = useState({}); // the movie that is going to be displayed in fullscreen mode

    const IMG_PATH = "https://image.tmdb.org/t/p/w500/";
    const NO_IMAGE_PATH = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0mPJIxvYiTXwFhUEUFkvHrM3ZT9ywgh32v7pUwKNQYguUXUdHXczKjLgr_HxHv8kcANQ&usqp=CAU";
    const options = {year: 'numeric', month: 'short', day: 'numeric' };

    function openImage(movieData){
        movieCtx.displayFullscreen();
        setFullMovie(movieData);
    }
    function addFavourite(){
        return movieCtx.addFavouriteMovie(fullMovie);
    }
    function removeFavourite(){
        return movieCtx.removeFavouriteMovie(fullMovie);
    }
    function checkFavourite(){
        if(JSON.stringify(movieCtx.favouriteMovies).includes(JSON.stringify(fullMovie))){
            return true;
        }
        else{
            return false;
        }
    }

    return (
        <>
            {!movieCtx.isOpened && 
            <div className="view-all">
                <h2 className="heading">{movieCtx.heading}</h2>
                <div className="movies-container">
                    {movieCtx.heading !== "Favourites"?
                        movieCtx.movies.length > 0 && movieCtx.movies.map((movie)=>{
                            return <Movie movieData={movie} key={movie.id} onImage={openImage}/>;
                        }):
                        movieCtx.favouriteMovies.length>0 && movieCtx.favouriteMovies.map((favMovie)=>{
                            return <Movie movieData={favMovie} key={favMovie.id} onImage={openImage}/>
                        })
                    }
                </div>
            </div>}

            {movieCtx.isOpened &&
                    <div className="movie-fullscreen-container">
                        <img src={fullMovie.backdrop_path ? IMG_PATH+fullMovie.backdrop_path : NO_IMAGE_PATH} alt="backdrop" className="backdropImage"/>
                        <div className="movie-fullscreen-image-box">
                            <img src={fullMovie.poster_path ? IMG_PATH+fullMovie.poster_path : NO_IMAGE_PATH} alt="poster" />
                        </div>
                        <div className="movie-fullscreen-description">
                            <div className="movie-name">{fullMovie.title}</div>
                            <div className="releaseDate-genre">
                                <div className="releaseDate">{new Date(fullMovie.release_date || fullMovie.first_air_date).toLocaleDateString('en-us', options)}</div>
                                <div className="genre">Action, Adventure, Science Fiction</div>
                            </div>
                            <div className="rating-fav-trailer">
                                    <div className="rating">{fullMovie.vote_average.toFixed(1)}</div>
                                    <div className="fav"> {checkFavourite()? <div data-title="Remove from Favourites"> <IoIosRemoveCircleOutline onClick={removeFavourite}/></div>: <div data-title="Add to Favourites"> <MdFavorite onClick={addFavourite} /></div>} </div>
                                    <div className="trailer" data-title="Play Trailer"><BsPlayFill/> </div>
                            </div>
                            <h5>Overview</h5>
                            <div className="overview"> &emsp; Suspicious that her colleague is responsible for a series of mysterious patient deaths, a nurse risks her own life to uncover the truth in this gripping thriller based on true events.</div>
                        </div>
                    </div>}
        </>
    );
}