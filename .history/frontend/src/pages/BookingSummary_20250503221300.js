import { useLocation, useNavigate } from 'react-router-dom';
import './alldetails.css';

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    bookingpayment,
    seatcost,
    addedcost,
    movie_name,
    language,
    locationselected,
    selectedSeats,
    time,
    selectedDate,
    offerapplied,
  } = location.state || {};

  return (
    <div className="confirm-booking-container">
      <h1>Your Booking is Confirmed!</h1>

      <div className="details-container">
        {movie_name && <h2><b>Movie:</b> {movie_name}</h2>}
        {language && <h2><b>Language:</b> {language}</h2>}
        {locationselected && <h2><b>Location:</b> {locationselected}</h2>}
        {selectedSeats && <h2><b>Seats:</b> {selectedSeats.join(', ')}</h2>}
        {time && <h2><b>Time:</b> {time}</h2>}
        {selectedDate && <h2><b>Date:</b> {new Date(selectedDate).toLocaleDateString()}</h2>}
      </div>

      <hr />

        {offerapplied && <h2>Applied Offer: {offerapplied}</h2>}
        <div className="offer-details">
          {offerapplied === 'VIP' && (
            <p>
              <strong>Benefits:</strong> Eligibility to top 10 seats booking, Free water bottles.
            </p>
          )}
          {offerapplied === 'BDAY' && (
            <p>
              <strong>Benefits:</strong> 1 free movie ticket, Snack combo.
            </p>
          )}
          {offerapplied === 'ANNIVERSARY' && (
            <p>
              <strong>Benefits:</strong> 2 free movie tickets, Large snack combo.
            </p>
          )}
          {offerapplied === 'VIP5' && (
            <p>
              <strong>Benefits:</strong> 1 free movie ticket, Free water bottles, Free parking, Popcorn combo.
            </p>
          )}
          {offerapplied === 'WB2' && (
            <p>
              <strong>Benefits:</strong> 1 free water bottle.
            </p>
          )}
          {offerapplied === 'POP5' && (
            <p>
              <strong>Benefits:</strong> 1 medium popcorn, 1 water bottle.
            </p>
          )}
        </div>


      <hr />

      <div className="total-container" >
        <h2>Convenience Fee: ₹80</h2>
        <h2>Seat Cost: ₹{seatcost}</h2>
        {addedcost > 0 && <h2>Added Snacks: ₹{addedcost}</h2>}
        {offerapplied === 'BDAY' && <h2>Offer Discount: ₹100</h2>}
        {offerapplied === 'ANNIVERSARY' && <h2>Offer Discount: ₹200</h2>}
        {offerapplied === 'VIP5' && <h2>Offer Discount: ₹300</h2>}
        <h2 className="total-pay">Total Payment: ₹{bookingpayment}</h2>
      </div>

      <button className="pay-button" onClick={() => navigate('/initialpage')}>
        Back to Home
      </button>
    </div>
  );
}
