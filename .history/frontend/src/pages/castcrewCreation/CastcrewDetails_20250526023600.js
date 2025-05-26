import { useState } from 'react';
import axios from '../../config/axios';
import Cast from './Cast';
import { castcrewAfterRemove, reloadCastcrews } from '../../components/movieSlice';
import { useDispatch, useSelector } from 'react-redux';
import './castcrew.css';

export default function Castcrew() {
  const [movieName, setMovieName] = useState('');
  const [language, setLanguage] = useState('');
  const [casts, setCasts] = useState([]);
  const [crews, setCrews] = useState([]);

  const dispatch = useDispatch();
  const { allcastcrews } = useSelector((state) => state.movieSlice);

  const handleCast = (value) => {
    setCasts(value);
  };

  const handleCrew = (value) => {
    setCrews(value);
  };

  const handleRemove = async (movieId) => {
    if (window.confirm('Are you sure you want to remove this cast/crew?')) {
      try {
        const response = await axios.delete(`/api/castcrew/${movieId}`);
        const updatedCastCrew = allcastcrews.filter((ele) => ele._id !== response.data._id);
        dispatch(castcrewAfterRemove(updatedCastCrew));
      } catch (err) {
        console.error('Error removing cast/crew:', err);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const castcrewData = {
      movie_name: movieName,
      language,
      cast: casts,
      crew: crews,
    };

    try {
      await axios.post('/api/castcrew', castcrewData, {
        headers: { 'Authorization': localStorage.getItem('token') },
      });
      dispatch(reloadCastcrews());
      setMovieName('');
      setLanguage('');
    } catch (err) {
      console.error('Error adding cast/crew:', err);
    }
  };

  return (
    <div className="castcrew-container">
      <form onSubmit={handleSubmit} className="castcrew-form">
        <div className="form-group">
          <label htmlFor="movieName">Title:</label>
          <input
            id="movieName"
            type="text"
            name="movie_name"
            value={movieName}
            onChange={(e) => setMovieName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="language">Language:</label>
          <input
            id="language"
            type="text"
            name="language"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-btn">Add Cast/Crew</button>
      </form>

      <Cast handleCast={handleCast} handleCrew={handleCrew} />

      <h2 className="title">Cast & Crew</h2>
      <div className="castcrew-list">
        {allcastcrews && allcastcrews.map((ele) => (
          <div key={ele._id} className="castcrew-card">
            <h3 className="movie-name">{ele.movie_name}</h3>
            <p className="language">Language: {ele.language}</p>

            <div className="cast-section">
              <h4>Cast:</h4>
              <div className="cast-images">
                {ele.cast && ele.cast.map((el) => (
                  <div key={el.casturl}>
                    <img src={el.casturl} alt="Cast" className="cast-image" />
                    <h3>{el.castName}</h3>
                    <h3>{el.castRole}</h3>
                  </div>
                ))}
              </div>
            </div>

            <div className="crew-section">
              <h4>Crew:</h4>
              <div className="crew-images">
                {ele.crew && ele.crew.map((el) => (
                  <div key={el.crewurl}>
                    <img src={el.crewurl} alt="Crew" className="crew-image" />
                    <h3>{el.crewName}</h3>
                    <h3>{el.crewPosition}</h3>
                  </div>
                ))}
              </div>
            </div>

            <button onClick={() => handleRemove(ele._id)} className="remove-btn">Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
}
