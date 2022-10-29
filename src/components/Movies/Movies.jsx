import { useState, useContext } from "react";
import MovieContext from "../../store/MovieContext";
import "./Movies.css";
import Movie from "../Movie/Movie";
import {MdFavorite} from "react-icons/md";
import {BsPlayFill} from "react-icons/bs";
import { IoIosRemoveCircleOutline } from "react-icons/io"
import { useEffect } from "react";

export default function Movies(){
    const movieCtx = useContext(MovieContext);
    const [fullMovie, setFullMovie] = useState({}); // the movie that is going to be displayed in fullscreen mode
    const [genre, setGenre] = useState("");

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
    function playTrailer(){
        return movieCtx.findTrailer(fullMovie.id);
    }

    function findGenres(id){
        if(id===28){
            return "Action";
        }
        else if(id===12){
            return "Adventure";
        }
        else if(id===16){
            return "Animation";
        }
        else if(id===35){
            return "Comedy";
        }
        else if(id===80){
            return "Crime";
        }
        else if(id===99){
            return "Documentary";
        }
        else if(id===18){
            return "Drama";
        }
        else if(id===10751){
            return "Family";
        }
        else if(id===14){
            return "Fantasy";
        }
        else if(id===36){
            return "History";
        }
        else if(id===27){
            return "Horror";
        }
        else if(id===10402){
            return "Music";
        }
        else if(id===9648){
            return "Mystery";
        }
        else if(id===10749){
            return "Romance";
        }
        else if(id===878){
            return "Science Fiction";
        }
        else if(id===10770){
            return "TV Movie";
        }
        else if(id===53){
            return "Thriller";
        }
        else if(id===10752){
            return "War";
        }
        else if(id===37){
            return "Western";
        }
    }
    useEffect(()=>{
        fullMovie && fullMovie.genre_ids && fullMovie.genre_ids.forEach((id)=>{
            setGenre((prevState)=>{
                return prevState + " "+ findGenres(id)+", ";
            })
        })
    }, [fullMovie.genre_ids]);

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
                                <div className="genre">{genre.trim().slice(0, -1)}</div>
                            </div>
                            <div className="rating-fav-trailer">
                                    <div className="rating">{fullMovie.vote_average.toFixed(1)}</div>
                                    <div className="fav"> {checkFavourite()? <div data-title="Remove from Favourites"> <IoIosRemoveCircleOutline onClick={removeFavourite}/></div>: <div data-title="Add to Favourites"> <MdFavorite onClick={addFavourite} /></div>} </div>
                                    <div className="trailer" data-title="Play Trailer" onClick={playTrailer}><BsPlayFill/> </div>
                            </div>
                            <h5>Overview</h5>
                            <div className="overview"> &emsp; {fullMovie.overview}</div>
                        </div>
                        
                    </div>
                    }
        </>
    );
}