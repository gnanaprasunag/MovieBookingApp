import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import './alldetails.css';

export default function App() {
  const { user } = useSelector((state) => state.user);
  const location = useLocation();
  const navigate = useNavigate();
  const {
    movie_name,
    language,
    locationselected,
    placeselected,
    selectedSeats,
    time,
    selectedDate,
    added,
  } = location.state || {};

  let seatcost = 0;
  selectedSeats.map((ele) => {
    if (Number(ele.slice(1)) < 11) {
      seatcost += 350;
    } else if (Number(ele.slice(1)) > 10 && Number(ele.slice(1)) < 91) {
      seatcost += 200;
    } else if (Number(ele.slice(1)) > 90) {
      seatcost += 100;
    }
  });

  let addedcost = 0;
  if (added.length > 0) {
    added.map((ele) => {
      let cost = ele.cost * ele.count;
      addedcost += cost;
    });
  }

  const [offerapplied, setofferapplied] = useState('');
  const [vip, setvip] = useState(false);
  const [birthdate, setbirthdate] = useState(false);
  const [annivers, setannivers] = useState(false);

  useEffect(() => {
    if (user && user.vip === 'yes') {
      setvip(true);
    }
  }, []);
  

  const today = new Date();
  const month = today.getMonth() + 1;
  const date = today.getDate();

  let birthday,anniversary,bdaymonth , bdaydate, annimonth,annidate 
  if(user){
  birthday = new Date(user.birthday);
  anniversary = new Date(user.anniversary);
  bdaymonth = birthday.getMonth() + 1;
  bdaydate = birthday.getDate();
  annimonth = anniversary.getMonth() + 1;
  annidate = anniversary.getDate();
  }


  useEffect(() => {
    if (user && date === bdaydate && month === bdaymonth) {
      setbirthdate(true);
    }
  }, []);

  useEffect(() => {
    if (user && date === annidate && month === annimonth) {
      setannivers(true);
    }
  }, []);

  const [total, settotal] = useState(0);
  useEffect(() => {
    let sum;
    if (added.length > 0 && offerapplied) {
      if (offerapplied === 'BDAY') {
        sum = seatcost + addedcost + 80 - 100;
        settotal(sum);
      } else if (offerapplied === 'ANNIVERSARY') {
        sum = seatcost + addedcost + 80 - 200;
        settotal(sum);
      } else if (offerapplied === 'VIP5') {
        sum = seatcost + addedcost + 80 - 300;
        settotal(sum);
      }
    } else if (added.length === 0 && offerapplied) {
      if (offerapplied === 'BDAY') {
        sum = seatcost + 80 - 100;
        settotal(sum);
      } else if (offerapplied === 'ANNIVERSARY') {
        sum = seatcost + 80 - 200;
        settotal(sum);
      } else if (offerapplied === 'VIP5') {
        sum = seatcost + 80 - 300;
        settotal(sum);
      }
    } else if (added.length > 0) {
      sum = seatcost + addedcost + 80;
      settotal(sum);
    } else if (added.length === 0) {
      sum = seatcost + 80;
      settotal(sum);
    }
  }, [offerapplied]);

  if (!user) {
    return <p className="loading">Loading...</p>;
  }


  return (
    <div className="confirm-booking-container">
      <h1>Confirm Booking</h1>
      <div className="details-container">
        {movie_name && <h2>Movie: {movie_name}</h2>}
        {language && <h2>Language: {language}</h2>}
        {locationselected && <h2>Location: {locationselected}</h2>}
        {selectedSeats && <h2>Seats: {selectedSeats.join(', ')}</h2>}
        {time && <h2>Time: {time}</h2>}
        {selectedDate && <h2>Date: {new Date(selectedDate).toLocaleDateString()}</h2>}
      </div>

      <hr />

      <h1>Applicable Offers</h1>
      <div className="offers-container">
        {vip && <h2>VIP Offer: VIP</h2>}
        {birthdate && <h2>Birthday Offer: BDAY</h2>}
        {user && annivers && <h2>Anniversary Offer: ANNIVERSARY</h2>}
        {user.vip === 'yes' && selectedSeats.length > 4 && (
          <div>
            <h2>POP5</h2>
            <h2>VIP5</h2>
          </div>
        )}
        {user.vip === 'no' && selectedSeats.length > 4 && <h2>POP5</h2>}
        {selectedSeats.length > 2 && <h2>WB2</h2>}
        <input
          type="text"
          placeholder="Enter offer code"
          value={offerapplied}
          onChange={(e) => setofferapplied(e.target.value)}
          style={{maxWidth:'20px'}}
          className="offer-input"
        />
        {offerapplied && (
          <div className="offer-details">
            {offerapplied === 'BDAY' && (
              <p>
                <strong>Benefits:</strong> 1 free ticket, snack combo
              </p>
            )}
            {offerapplied === 'ANNIVERSARY' && (
              <p>
                <strong>Benefits:</strong> 2 free tickets, large snack combo
              </p>
            )}
            {offerapplied === 'VIP' && (
              <p>
                <strong>Benefits:</strong> Eligibility to top 10 seats booking, Free water bottles
              </p>
            )}
            {offerapplied === 'VIP5' && (
              <p>
                <strong>Benefits:</strong> 1 free ticket, free water, parking, popcorn combo
              </p>
            )}
            {offerapplied === 'WB2' && (
              <p>
                <strong>Benefits:</strong> 1 free water bottle
              </p>
            )}
            {offerapplied === 'POP5' && (
              <p>
                <strong>Benefits:</strong> 1 medium popcorn, 1 water bottle
              </p>
            )}
          </div>
        )}
      </div>

      <hr />

      <div className="total-container">
        <h2>Convenience Fee: ₹80</h2>
        <h2>Seat(s) Cost: ₹{seatcost}</h2>
        <h2>Added Snacks: ₹{addedcost}</h2>
        <h2 className="total-pay">Total: ₹{total}</h2>
        {offerapplied && <h4>Offer Applied: {offerapplied}</h4>}
      </div>

      <button
        className="pay-button"
        onClick={() =>
          navigate('/pay', {
            state: {
              bookingpayment: total,
              seatcost,
              addedcost,
              movie_name,
              language,
              locationselected,
              placeselected,
              selectedSeats,
              time,
              selectedDate,
              added,
              offerapplied,
            },
          })
        }
      >
        Pay ₹{total}
      </button>
    </div>
  );
}
