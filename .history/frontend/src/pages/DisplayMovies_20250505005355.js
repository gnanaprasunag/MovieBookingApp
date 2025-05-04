import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './displaymovies.css';

export default function Movies(props) {
    const navigate = useNavigate();
    const { allmovies } = useSelector((state) => state.movieSlice);

    const filteredMovies = useMemo(() => {
        if (!allmovies || !props.currentLocation) return [];

        let movies = allmovies.filter(
            (ele) =>
                ele.city === props.currentLocation &&
                ele.language === props.lang
        );

        if (props.genrefilter && props.genrefilter !== 'All') {
            movies = movies.filter((ele) =>
                ele.genre.includes(props.genrefilter)
            );
        }

        if (props.searchMoviename && props.searchMoviename.length > 0) {
            movies = movies.filter((ele) =>
                ele.movie_name
                    .toLowerCase()
                    .includes(props.searchMoviename.toLowerCase())
            );
        }

        return movies;
    }, [
        allmovies,
        props.currentLocation,
        props.lang,
        props.genrefilter,
        props.searchMoviename
    ]);

    return (
        <div
            className="movies-container"
            style={{ background: 'linear-gradient(45deg,rgb(244, 91, 183),rgb(113, 109, 246))' }}
        >
            {filteredMovies && filteredMovies.length > 0 ? (
                filteredMovies.map((movie) => (
                    <div key={movie._id} className="movie-card">
                        {movie.movie_image && (
                            <div className="movie-image">
                                <img
                                    src={movie.movie_image}
                                    alt={movie.movie_name}
                                />
                            </div>
                        )}

                        <div className="movie-details">
                            <h3 className="movie-title">{movie.movie_name}</h3>
                            <button
                                className="movie-button"
                                onClick={() =>
                                    navigate('/onmovieclick', {
                                        state: {
                                            movie: movie,
                                            currentLocation:
                                                props.currentLocation
                                        }
                                    })
                                }
                            >
                                View Details
                            </button>
                        </div>
                    </div>
                ))
            ) : (
                <div className="nomovie">No movies found</div>
            )}
        </div>
    );
}
