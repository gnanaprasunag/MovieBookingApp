import React from 'react';
import axios from '../../config/axios';
import { ratingAfterRemove } from '../../components/movieSlice';
import { useDispatch, useSelector } from 'react-redux';
import './allratings.css';

export default function Allratings() {
  const { allratings } = useSelector((state) => state.movieSlice);
  const dispatch = useDispatch();

  const handleRemove = async (movieId) => {
    if (window.confirm('Are you sure you want to remove this rating?')) {
      try {
        const response = await axios.delete(`/api/rating/${movieId}`);
        const updatedRatings = allratings.filter((ele) => ele._id !== response.data._id);
        dispatch(ratingAfterRemove(updatedRatings));
      } catch (err) {
        console.error('Error removing rating:', err);
      }
    }
  };

  return (
    <div className="ratings-container">
      <h2 className="title">All Ratings</h2>
      <div className="ratings-list">
        {allratings && allratings.map((ele) => (
          <div key={ele._id} className="rating-card">
            <h3 className="movie-name">Movie: {ele.movie_name}</h3>
            <p className="language">Language: {ele.language}</p>
            <p className="user-name">User: {ele.user_name}</p>
            <p className="rating">Rating: {ele.rating}</p>
            {ele.review && <p className="review">Review: {ele.review}</p>}
            <p className="hashtag">Hashtags: {ele.hashtag.join(', ')}</p>
            <button onClick={() => handleRemove(ele._id)} className="remove-btn">Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
}