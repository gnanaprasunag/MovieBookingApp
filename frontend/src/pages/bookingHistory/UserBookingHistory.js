import React from 'react';
import { useSelector } from 'react-redux';
import './bookinghistory.css';

export default function App(props) {
  const { allbookinghistories } = useSelector((state) => state.movieSlice);
  const { user } = useSelector((state) => state.user);

  return (
    <div className="booking-history-app">
      {allbookinghistories &&
        allbookinghistories.map((el, i) => {
          if (user && el.user_name === user.email) {
            return (
              <div key={i} className="user-booking">
                <h3 className="user-name">User: {el.user_name}</h3>
                <div className="booked-movies">
                  {el.booked.map((ele, j) => {
                    return (
                      <div key={j} className="booking-card">
                        <h4 className="movie-title">Movie: {ele.movie_name}</h4>
                        <p>Language: {ele.language}</p>
                        <p >Place: {ele.place}</p>
                        <p >Location: {ele.location}</p>
                        <p >Timeslot: {ele.timeslot}</p>
                        <p>Tickets: {ele.tickets.join(', ')}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          }
          return null;
        })}
    </div>
  );
}