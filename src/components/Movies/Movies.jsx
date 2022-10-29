import { useContext } from "react";
import MovieContext from "../../store/MovieContext";
import "./Movies.css";
import Movie from "../Movie/Movie";

export default function Movies(){
    const movieCtx = useContext(MovieContext);
    return (
        <>
            <h2 className="heading">{movieCtx.heading}</h2>
            <div className="movies-container">
                {movieCtx.heading !== "Favourites"?
                    movieCtx.movies.length > 0 && movieCtx.movies.map((movie)=>{
                        return <Movie movieData={movie} key={movie.id}/>;
                    }):
                    movieCtx.favouriteMovies.length>0 && movieCtx.favouriteMovies.map((favMovie)=>{
                        return <Movie movieData={favMovie} key={favMovie.id}/>
                    })
                }
            </div>
        </>
    );
}