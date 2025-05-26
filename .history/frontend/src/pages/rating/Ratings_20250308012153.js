import React, { useState } from 'react';
import axios from '../../config/axios';
import { reloadRatings } from '../../components/movieSlice'; 
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
//import './App.css'; // Import the CSS file

export default function App() {
    const { allratings } = useSelector((state) => state.movieSlice);
    const { user } = useSelector((state) => state.user);
    const location = useLocation();
    const navigate = useNavigate();
    const { movie } = location.state || {};

    return (
        <div className="ratings-container">
            <h1 className="title">Movie Ratings</h1>
            <div className="ratings-list vertical-layout" style={{display:'flex',flexDirection:'column', alignItems:'center', width: '100%'}}>
                {/* User's Rating Section */}
                {allratings && movie && allratings.filter(ele => ele.user_name === user.email && ele.movie_name === movie.movie_name).map((ele, i) => (
                    <div key={i} className="rating-card" style={{ width: '60%',textAlign: 'center' }}>
                        <h2>Your Rating</h2>
                        <h3 className="movie-name">{ele.movie_name}</h3>
                        <h3 className="rating">Rating: {ele.rating}</h3>
                        {ele.review && <h3 className="review">Review: {ele.review}</h3>}
                        {ele.hashtag && ele.hashtag.length>0 && <h3 className="hashtag">Hashtags: {Array.isArray(ele.hashtag) ? ele.hashtag.join(", ") : "No hashtags"}</h3>}
                    </div>
                ))}

                {/* All Ratings for the Movie */}
                <h2>Other Ratings</h2>
                {allratings && movie && allratings.filter(ele => ele.user_name !=user.email  && ele.movie_name === movie.movie_name).map((ele, i) => (
                    <div key={i} className="rating-card" style={{ width: '60%', textAlign: 'center' }}>
                        <h3 className="rating">Rating: {ele.rating}</h3>
                        {ele.review && <h3 className="review">Review: {ele.review}</h3>}
                        {ele.hashtag && ele.hashtag.length>0 && <h3 className="hashtag">Hashtags: {Array.isArray(ele.hashtag) ? ele.hashtag.join(", ") : "No hashtags"}</h3>}
                    </div>
                ))}
            </div>
        </div>
    );
}
