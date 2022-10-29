import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import {toast} from "react-toastify";

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
    isOpened: "",
    displayFullscreen: ()=>{},
    findExternalID: ()=>{},
    findTrailer: ()=>{},
    trailer_key: "",
    visibleTrailer: "",
    hideTrailer: ()=>{},
    discoverMovies: ()=>{}
});

export const MovieContextProvider = (props)=>{
    const [foundMovies, setFoundMovies] = useState([]);
    const [favMovies, setFavMovies] = useState(localStorage.getItem("MovieDB") || []);
    const [heading, setHeading] = useState("");
    const [isOpened, setisOpened] = useState(false);
    const [visibleTrailer, setVisibleTrailer] = useState(false);
    const [trailer_key, setTrailer_key] = useState("");

    const API_KEY = process.env.REACT_APP_API_KEY;
    
    const findMovie = (movieName)=>{
        setHeading(`Search Results for '${movieName}'`);
        setisOpened(false);
        const SEARCH_URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&page=1&include_adult=false&query=${movieName}`;
        axios.get(SEARCH_URL).then((response)=>{
            setFoundMovies(response.data.results);
            return response;
        }).catch((err)=>{
            return {err: err};
        })
    }
    const findPopularMovies = ()=>{
        setHeading("Popular Movies");
        setisOpened(false);
        const POPULAR_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
        axios.get(POPULAR_URL).then((response)=>{
            setFoundMovies(response.data.results);
            return response;
        }).catch((err)=>{
            return {err: err};
        })
    }
    const findTopRatedMovies = ()=>{
        setHeading("Top Rated Movies");
        setisOpened(false);
        const TOP_RATED_URL = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`;
        axios.get(TOP_RATED_URL).then((response)=>{
            setFoundMovies(response.data.results);
            return response;
        }).catch((err)=>{
            return {err: err};
        })
    }
    const findNowPlayingMovies = ()=>{
        setHeading("Now Playing Movies");
        setisOpened(false);
        const NOW_PLAYING_URL = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`;
        axios.get(NOW_PLAYING_URL).then((response)=>{
            setFoundMovies(response.data.results);
            return response;
        }).catch((err)=>{
            return {err: err};
        })
    }
    const findUpcomingMovies = ()=>{
        setHeading("Upcoming Movies");
        setisOpened(false);
        const UPCOMING_URL = `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`;
        axios.get(UPCOMING_URL).then((response)=>{
            setFoundMovies(response.data.results);
            return response;
        }).catch((err)=>{
            return {err: err};
        })
    }
    const findTrendingMovies = ()=>{
        setHeading("Trending Movies");
        setisOpened(false);
        const TRENDING_URL = `https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}`;
        axios.get(TRENDING_URL).then((response)=>{
            setFoundMovies(response.data.results);
            return response;
        }).catch((err)=>{
            return {err: err};
        })
    }
    const discoverMovies = ()=>{
        setHeading("Discover Movies");
        setisOpened(false);
        const DISCOVER_URL = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=2&with_watch_monetization_types=flatrate`;
        axios.get(DISCOVER_URL).then((response)=>{
            setFoundMovies(response.data.results);
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
        toast.success("Added to Favourites");
        return favMovies;
    }
    const findFavouriteMovies = ()=>{
        setHeading("Favourite Movies");
        setisOpened(false);
        setFavMovies(JSON.parse(localStorage.getItem("MovieDB")) || []);
        return favMovies;
    }
    const removeFavouriteMovie = (movieData)=>{
        const newFavMovies = favMovies.filter((movie)=> movie.id !== movieData.id);
        localStorage.setItem("MovieDB", JSON.stringify(newFavMovies));
        setFavMovies(newFavMovies);
        toast.error("Removed from Favourites");
        return favMovies;
    }

    useEffect(()=>{
        setFavMovies(JSON.parse(localStorage.getItem("MovieDB")) || []);
    },[])
    const displayFullscreen = ()=>{
        setisOpened(true);
    }
    
    const findExternalID = (movieID)=>{
        const EXTERNAL_ID_URL = `https://api.themoviedb.org/3/movie/${movieID}/external_ids?api_key=${API_KEY}`;
        axios.get(EXTERNAL_ID_URL).then((response)=>{
            return response.data.imdb_id;
        }).catch((err)=>{
            return err;
        })
    }
    const findTrailer = (movieID)=>{
        const EXTERNAL_ID_URL = `https://api.themoviedb.org/3/movie/${movieID}/external_ids?api_key=${API_KEY}`;
        axios.get(EXTERNAL_ID_URL).then((response)=>{
            const TRAILER_URL = `https://api.themoviedb.org/3/movie/${response.data.imdb_id}/videos?api_key=${API_KEY}`;

            axios.get(TRAILER_URL).then((response)=>{
                setTrailer_key(response.data.results[0].key);
                setVisibleTrailer(true);
                if(response.data.results && (response.data.results.length===0 || (response.data.results[0].key && response.data.results[0].key.trim().length===0))){
                    return toast.error("No Trailer Found");
                }
                return response.data.results[0].key;
            }).catch((err)=>{
                toast.error("No Trailer Found");
                return err;
            })
        }).catch((err)=>{
            return err;
        })
    }
    const hideTrailer = ()=>{
        setVisibleTrailer(false);
    }

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
        discoverMovies: discoverMovies,
        addFavouriteMovie: addFavouriteMovie,
        removeFavouriteMovie: removeFavouriteMovie,
        isOpened: isOpened,
        displayFullscreen: displayFullscreen,
        findExternalID: findExternalID,
        findTrailer: findTrailer,
        trailer_key: trailer_key,
        visibleTrailer: visibleTrailer,
        hideTrailer: hideTrailer
    }

    return <MovieContext.Provider value={movieContext}> {props.children} </MovieContext.Provider>
}

export default MovieContext;