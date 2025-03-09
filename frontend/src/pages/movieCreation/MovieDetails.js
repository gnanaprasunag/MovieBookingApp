import React, { useState, useEffect } from 'react';
import axios from '../../config/axios';
import { useDispatch, useSelector } from 'react-redux';
import { moviesAfterEdit, reloadMovies } from '../../components/movieSlice';
import Imageupload from '../castcrewCreation/ImageUpload';
import VideoApp from './VideoApp';
import Search from './Search';
import './movieApp.css'; // Assuming CSS is in the same directory

const MovieApp = () => {
  const { allmovies } = useSelector((state) => state.movieSlice);
  const dispatch = useDispatch();

  const [poster, setPoster] = useState('');
  const [trailer, setTrailer] = useState('');
  const [movie, setMovie] = useState();
  const [formData, setFormData] = useState({
    editId: null,
    movie_name: '',
    city: '',
    movie_duration: '',
    genre: '',
    language: '',
    movie_image: '',
    animation: '',
    releaseDate: '',
    certificate: '',
  });

  useEffect(() => {
    if (formData.editId) {
      setFormData({ ...formData, ...movie });
    }
  }, [formData.editId]);
  

  if(!allmovies){
    return <p className="loading">Loading...</p>;
  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEdit = (id) => {
    axios
      .get(`/api/movies/${id}`)
      .then((res) => {
        const movieData = { ...res.data };
        movieData.genre = String(res.data.genre);
        movieData.releaseDate = new Date(movieData.releaseDate).toISOString().split('T')[0];
        delete movieData.time;
        delete movieData.trailer;
        delete movieData.cancellation;
        setMovie(movieData);
        setFormData({ ...formData, editId: id });
      })
      .catch((err) => console.log('Error fetching movie:', err));
  };

  const handleRemove = async (movieId) => {
    if (window.confirm('Are you sure?')) {
      try {
        const response = await axios.delete(`/api/movies/${movieId}`);
        const updatedMovies = allmovies.filter((movie) => movie._id !== response.data._id);
        dispatch(moviesAfterEdit(updatedMovies));
      } catch (err) {
        console.log('Error deleting movie:', err);
      }
    }
  };

  const handlePosterUrl = (value) => {
    setPoster(value);
  };

  const handleTrailerUrl = (value) => {
    setTrailer(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const movieData = {
      movie_name: formData.movie_name,
      description: formData.description,
      city: formData.city,
      certificate: formData.certificate,
      movie_duration: formData.movie_duration,
      genre: formData.genre.split(',').map((g) => g.trim()),
      movie_image: poster,
      trailer: trailer,
      releaseDate: formData.releaseDate,
      animation: formData.animation,
      language: formData.language,
    };

    if (formData.editId) {
      console.log("formData.editId",formData.editId)
      axios
        .put(`/api/movies/${formData.editId}`, movieData)
        .then((res) => {
          const updatedMovies = allmovies.map((movie) =>
            movie._id === res.data._id ? res.data : movie
          );
          dispatch(moviesAfterEdit(updatedMovies));
          resetForm();
        })
        .catch((err) => console.log('Error updating movie:', err));
    } else {
      axios
        .post('/api/movies', movieData)
        .then(() => {
          dispatch(reloadMovies());
          resetForm();
        })
        .catch((err) => console.log('Error adding movie:', err));
    }
  };

  const resetForm = () => {
    setFormData({
      editId: null,
      movie_name: '',
      city: '',
      movie_duration: '',
      genre: '',
      language: '',
      movie_image: '',
      animation: '',
      releaseDate: '',
      certificate: '',
    });
    setPoster('');
    setTrailer('');
  };

  return (
    <div className="movie-app">
      <h1 className="title">Movie App</h1>
      <form onSubmit={handleSubmit} className="movie-form">
        <div className="form-group">
          <label>Title:</label>
          <input type="text" name="movie_name" value={formData.movie_name} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Description:</label>
          <textarea name="description" value={formData.description} onChange={handleChange} rows="4" required />
        </div>
        <div className="form-group">
          <label>Duration:</label>
          <input type="text" name="movie_duration" value={formData.movie_duration} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Release Date:</label>
          <input type="date" name="releaseDate" value={formData.releaseDate} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Genre (comma-separated):</label>
          <input type="text" name="genre" value={formData.genre} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Language:</label>
          <input type="text" name="language" value={formData.language} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>City:</label>
          <input type="text" name="city" value={formData.city} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Animation:</label>
          <input type="text" name="animation" value={formData.animation} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Certificate:</label>
          <input type="text" name="certificate" value={formData.certificate} onChange={handleChange} required />
        </div>
        <Imageupload posterUrl={handlePosterUrl} />
        <VideoApp trailerUrl={handleTrailerUrl} />
        <button type="submit" className="submit-btn">
          {formData.editId ? 'Update Movie' : 'Add Movie'}
        </button>
      </form>

      <h2 className="title">Movie List</h2>
      <div className="movie-list">
        { allmovies.map((movie) => (
          <div key={movie._id} className="movie-card">
            <h3>{movie.movie_name}</h3>
            <p>Duration: {movie.movie_duration}</p>
            <p>Language: {movie.language}</p>
            <p>City: {movie.city}</p>
            <p>Animation: {movie.animation}</p>
            <p>Release Date: {new Date(movie.releaseDate).toLocaleDateString()}</p>
            <p>Genres: {movie.genre.join(', ')}</p>
            {movie.movie_image && <img src={movie.movie_image} alt={movie.movie_name} className="movie-poster" />}
            <div className="button-group">
              <button onClick={() => handleEdit(movie._id)} className="edit-btn">Edit</button>
              <button onClick={() => handleRemove(movie._id)} className="delete-btn">Remove</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieApp;
