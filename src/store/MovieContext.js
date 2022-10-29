import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';

const MovieContext = React.createContext({
    heading: "",
    movies: [],
    favouriteMovies: [],
    searchMovie: (movieName) => {},
    findPopularMovies: () => {},
    findFavouriteMovies: () => {},
    findTopRatedMovies: () => {},
    findNowPlayingMovies: () => {},
    findUpcomingMovies: () => {},
    findTrendingMovies: () => {},
    addFavouriteMovie: (movieData) => {},
    removeFavouriteMovie: (movieData) => {},
});

export const MovieContextProvider = (props)=>{
    const [foundMovies, setFoundMovies] = useState([]);
    const [favMovies, setFavMovies] = useState(localStorage.getItem("MovieDB") || []);
    const [heading, setHeading] = useState("");

    const API_KEY = "8d9c6994c64a7b4b56743d30dcae059f";
    const findMovie = (movieName)=>{
        setHeading(`Search Result for '${movieName}'`);
        const SEARCH_URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&page=1&include_adult=false&query=${movieName}`;
        
        axios.get(SEARCH_URL).then((response)=>{
            setFoundMovies(response.data.results);
            console.log(response.data.results);
            return response;
        }).catch((err)=>{
            return {err: err};
        })
    }
    const findPopularMovies = ()=>{
        setHeading("Popular");
        const POPULAR_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
        axios.get(POPULAR_URL).then((response)=>{
            setFoundMovies(response.data.results);
            console.log(response.data.results);
            return response;
        }).catch((err)=>{
            return {err: err};
        })
    }
    const findTopRatedMovies = ()=>{
        setHeading("Top Rated");
        const TOP_RATED_URL = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`;
        axios.get(TOP_RATED_URL).then((response)=>{
            setFoundMovies(response.data.results);
            console.log(response.data.results);
            return response;
        }).catch((err)=>{
            return {err: err};
        })
    }
    const findNowPlayingMovies = ()=>{
        setHeading("Now Playing");
        const NOW_PLAYING_URL = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`;
        axios.get(NOW_PLAYING_URL).then((response)=>{
            setFoundMovies(response.data.results);
            console.log(response.data.results);
            return response;
        }).catch((err)=>{
            return {err: err};
        })
    }
    const findUpcomingMovies = ()=>{
        setHeading("Upcoming");
        const UPCOMING_URL = `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`;
        axios.get(UPCOMING_URL).then((response)=>{
            setFoundMovies(response.data.results);
            console.log(response.data.results);
            return response;
        }).catch((err)=>{
            return {err: err};
        })
    }
    const findTrendingMovies = ()=>{
        setHeading("Trending");
        const TRENDING_URL = `https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}`;
        axios.get(TRENDING_URL).then((response)=>{
            setFoundMovies(response.data.results);
            console.log(response.data.results);
            return response;
        }).catch((err)=>{
            return {err: err};
        })
    }
    const addFavouriteMovie = (movieData)=>{
        localStorage.setItem("MovieDB", JSON.stringify(favMovies.concat(movieData)));
        setFavMovies((prevState)=>{
            return [...prevState, movieData];
        });
        return favMovies;
    }
    const findFavouriteMovies = ()=>{   // work due
        setHeading("Favourites");
        setFavMovies(JSON.parse(localStorage.getItem("MovieDB")) || []);
        return favMovies;
    }
    const removeFavouriteMovie = (movieData)=>{
        const newFavMovies = favMovies.filter((movie)=> movie.id !== movieData.id);
        localStorage.setItem("MovieDB", JSON.stringify(newFavMovies));
        setFavMovies(newFavMovies);
        return favMovies;
    }
    useEffect(()=>{
        setFavMovies(JSON.parse(localStorage.getItem("MovieDB")) || []);
    },[])

    const movieContext = {
        heading: heading,
        movies: foundMovies,
        favouriteMovies: favMovies,
        searchMovie: findMovie,
        findPopularMovies: findPopularMovies,
        findFavouriteMovies: findFavouriteMovies,
        findTopRatedMovies: findTopRatedMovies,
        findNowPlayingMovies: findNowPlayingMovies,
        findUpcomingMovies: findUpcomingMovies,
        findTrendingMovies: findTrendingMovies,
        addFavouriteMovie: addFavouriteMovie,
        removeFavouriteMovie: removeFavouriteMovie
    }

    return <MovieContext.Provider value={movieContext}> {props.children} </MovieContext.Provider>
}

export default MovieContext;