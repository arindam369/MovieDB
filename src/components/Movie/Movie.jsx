import "./Movie.css";
import {MdFavorite} from "react-icons/md";
import {useContext} from "react";
import MovieContext from "../../store/MovieContext";

export default function Movie(props){

    const IMG_PATH = "https://image.tmdb.org/t/p/w500/";
    const NO_IMAGE_PATH = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0mPJIxvYiTXwFhUEUFkvHrM3ZT9ywgh32v7pUwKNQYguUXUdHXczKjLgr_HxHv8kcANQ&usqp=CAU";
    const options = {year: 'numeric', month: 'short', day: 'numeric' };

    const movieCtx = useContext(MovieContext);

    function toggleFavourite(){
        if(JSON.stringify(movieCtx.favouriteMovies).includes(JSON.stringify(props.movieData))){
            console.log("Already present in favourites");
            return movieCtx.removeFavouriteMovie(props.movieData);
        }
        else{
            return movieCtx.addFavouriteMovie(props.movieData);
        }
    }
    function checkFavourite(){
        if(JSON.stringify(movieCtx.favouriteMovies).includes(JSON.stringify(props.movieData))){
            return true;
        }
        else{
            return false;
        }
    }

    return (
        <>
            <div className="movie-box">
                <img src={props.movieData.poster_path ? IMG_PATH+props.movieData.poster_path : NO_IMAGE_PATH} alt="" />
                <div className="description">
                    <div className="favourites-rating">
                        <div className={checkFavourite()?"favourites favMovie":"favourites"}> <MdFavorite onClick={toggleFavourite}/> </div>
                        <div className="rating">{props.movieData.vote_average.toFixed(1)}</div>
                    </div>
                    <div className="name-rating">
                        <div className="name">{props.movieData.title || props.movieData.name}</div>
                    </div>
                    <div className="date">{new Date(props.movieData.release_date || props.movieData.first_air_date).toLocaleDateString('en-us', options)}</div>
                </div>
            </div>
        </>
    );
}