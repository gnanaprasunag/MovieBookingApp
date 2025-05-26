import { useState } from 'react';
import axios from '../../config/axios';
import { reloadRatings } from '../../components/movieSlice'; 
import { useDispatch } from 'react-redux';
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import './ratingdetails.css'; 

export default function App() {
    const dispatch = useDispatch();
    const location = useLocation();

    const { movie, currentLocation} = location.state || {};
    const { user } = useSelector((state) => state.user);

    const [rating, setRating] = useState(0);
    const [review, setReview] = useState('');
    const [hover, setHover] = useState(0);
    const [hash, setHash] = useState([]);

    const hashtags = ["#MustWatch", "#MovieNight", "#TheaterVibes", "#Blockbuster", "#MovieReview", "#Cinephile", "#BMSReview", "#TicketBooked", "#MovieTime", "#Entertainment", "#PopcornTime", "#NowPlaying", "#MovieBuff", "#BingeWatch", "#BookMyShow", "#FilmReview", "#MovieLover", "#WeekendPlans", "#LiveEvents", "#ConcertExperience"];
    
    const handleHash = (value) => {
        setHash(prev => prev.includes(value) ? prev.filter(h => h !== value) : [...prev, value]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const ratingData = { movie_name:movie.movie_name, user_name:user.email, rating, hashtag: hash, review };
        axios.post('/api/rating', ratingData)
            .then(() => {
                dispatch(reloadRatings());
                setRating(0);
                setHash([]);
                setReview('');
                window.history.go(-1)
            })
            .catch(error => console.error('Error adding movie:', error));
    };

    return (
        <div className="container">
            <h1>Rate the Movie</h1>
            <div className="star-rating">
                {[...Array(5)].map((_, index) => {
                    index += 1;
                    return (
                        <button
                            key={index}
                            value={rating}
                            className={`star ${index <= (hover || rating) ? 'on' : 'off'}`}
                            onClick={() => setRating(index)}
                            onMouseEnter={() => setHover(index)}
                            onMouseLeave={() => setHover(rating)}
                        >
                            &#9733;
                        </button>
                    );
                })}
            </div>
            <h3>Rating: {rating}</h3>
            
            <h4>Express yourself with hashtags!</h4>
            <div className="hashtags">
                {hashtags.map((ele) => (
                    <button 
                        key={ele} 
                        className={`hash-btn ${hash.includes(ele) ? 'selected' : ''}`} 
                        onClick={() => handleHash(ele)}
                    >
                        {ele}
                    </button>
                ))}
            </div>
            
            <h2>Express more, write a review (Optional)</h2>
            <textarea 
                rows="4" 
                cols="50" 
                className="review-box"
                value={review} 
                onChange={(e) => setReview(e.target.value)}
                placeholder="Share your thoughts..."
            />
            <br/>
            <button className="submit-btn" onClick={handleSubmit}>Add Review</button>
        </div>
    );
}
