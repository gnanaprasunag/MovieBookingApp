import { useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'; // Success icon
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

  const offerBenefits = {
    VIP: 'Eligibility to top 10 seats booking, Free water bottles.',
    BDAY: '1 free movie ticket, Snack combo.',
    ANNIVERSARY: '2 free movie tickets, Large snack combo.',
    VIP5: '1 free movie ticket, Free water bottles, Free parking, Popcorn combo.',
    WB2: '1 free water bottle.',
    POP5: '1 medium popcorn, 1 water bottle.',
  };

  const offerDiscounts = {
    BDAY: 100,
    ANNIVERSARY: 200,
    VIP5: 300,
  };

  return (
    <div className="confirm-booking-container">
      <h1>Your Booking is Confirmed! <span><FontAwesomeIcon
        icon={faCheckCircle}
        style={{
          fontSize: '50px',
          color: 'green',
          
          animation: 'bounce 1s ease infinite'
        }}
      /></span></h1>

      <div className="details-container">
        {movie_name && <h2><b>Movie:</b> {movie_name}</h2>}
        {language && <h2><b>Language:</b> {language}</h2>}
        {locationselected && <h2><b>Location:</b> {locationselected}</h2>}
        {selectedSeats && <h2><b>Seats:</b> {selectedSeats.join(', ')}</h2>}
        {time && <h2><b>Time:</b> {time}</h2>}
        {selectedDate && <h2><b>Date:</b> {new Date(selectedDate).toLocaleDateString()}</h2>}
      </div>

      <hr />

      {offerapplied && (
        <>
          <h2>Applied Offer: {offerapplied}</h2>
          <div className="offer-details">
            <p><strong>Benefits:</strong> {offerBenefits[offerapplied]}</p>
          </div>
        </>
      )}

      <hr />

      <div className="total-container">
        <h2>Convenience Fee: ₹80</h2>
        <h2>Seat Cost: ₹{seatcost}</h2>
        {addedcost > 0 && <h2>Added Snacks: ₹{addedcost}</h2>}
        {offerapplied && offerDiscounts[offerapplied] && (
          <h2>Offer Discount: ₹{offerDiscounts[offerapplied]}</h2>
        )}
        <h2 className="total-pay">Total Payment: ₹{bookingpayment}</h2>
      </div>

      <button className="pay-button" onClick={() => navigate('/initialpage')}>
        Back to Home
      </button>
    </div>
  );
}
