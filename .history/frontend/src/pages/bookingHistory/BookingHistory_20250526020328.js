import axios from '../../config/axios';
import { useDispatch, useSelector } from 'react-redux';
import { reloadBookinghistory } from '../../components/movieSlice';
import './bookinghistory.css'; // Assuming CSS is in the same directory

export default function BookingHistoryApp() {
  const { allbookinghistories } = useSelector((state) => state.movieSlice);
  const dispatch = useDispatch();

  const handleRemove = async (userId, historyId) => {
    try {
      const confirm = window.confirm('Are you sure you want to remove this booking?');
      if (confirm) {
        await axios.delete(`/api/bookinghistory/${userId}/${historyId}`, {
          headers: { Authorization: localStorage.getItem('token') },
        });
        dispatch(reloadBookinghistory());
      }
    } catch (err) {
      console.error('Error removing booking:', err);
    }
  };


  return (
    <div className="booking-history-app">
      
        {allbookinghistories && allbookinghistories.map((userBooking) => (
          <div key={userBooking._id} >
            <h3 className="user-name">User: {userBooking.user_name}</h3>
            {userBooking.booked.map((booking, index) => (
              <div key={index} className="booking-card">
                <h4>Movie: {booking.movie_name}</h4>
                <p>Language: {booking.language}</p>
                <p>Theater: {booking.place}</p>
                <p>Location: {booking.location}</p>
                <p>Timeslot: {booking.timeslot}</p>
                <p>Tickets: {booking.tickets.join(', ')}</p>
                <button
                  onClick={() => handleRemove(userBooking._id, booking._id)}
                  className="remove-btn"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        ))}
      
    </div>
  );
}
