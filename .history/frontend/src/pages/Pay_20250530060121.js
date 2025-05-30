import { useState, useEffect } from 'react';
import axios from '../config/axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { handleReload } from '../components/regSlice';
import { reloadBookinghistory, reloadSingledate } from '../components/movieSlice';

export default function App() {
  const { user } = useSelector((state) => state.user);
  const { allbookinghistories, allsingledate } = useSelector((state) => state.movieSlice);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    vippay, bookingpayment, seatcost, addedcost,
    movie_name, language, locationselected,
    placeselected, selectedSeats, time,
    selectedDate, added, offerapplied
  } = location.state || {};
console.log("locationselected oin pay",locationselected)
console.log("locationselected oin pay",placeselected)
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const [amount, setAmount] = useState('');

  const selecteddate = selectedDate
    ? `${dayNames[new Date(selectedDate).getDay()]}-${monthNames[new Date(selectedDate).getMonth()]}-${new Date(selectedDate).getDate()}-${new Date(selectedDate).getFullYear()}`
    : '';

  useEffect(() => {
    if (vippay) {
      setAmount(vippay);
    } else if (bookingpayment) {
      setAmount(bookingpayment);
    }
  }, [vippay, bookingpayment]);

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    const isRazorpayLoaded = await loadRazorpayScript();
    if (!isRazorpayLoaded) {
      alert('Razorpay SDK failed to load. Please try again.');
      return;
    }

    if (!amount || isNaN(amount) || amount <= 0) {
      alert('Please enter a valid amount.');
      return;
    }

    try {
      const { data } = await axios.post('/api/create-order', { amount });

      const { id: order_id, amountPaise, currency } = data;

      const options = {
        key: 'rzp_test_65QeCr4YwXFMbS',
        amount: amountPaise,
        currency,
        name: 'Filmy Entertainment',
        description: 'Payment for your movie ticket',
        order_id,
        handler: async (response) => {
          alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);

          //  Handle VIP payment
          if (vippay) {
            await axios.put(
              `/api/users/vippay/${user._id}`,
              { vip: 'yes', vipdate: new Date() },
              { headers: { Authorization: localStorage.getItem('token') } }
            );
            dispatch(handleReload());
            alert('VIP subscription activated successfully!');
            navigate('/initialpage', { replace: true });
            return; // Don't proceed with booking logic if it's VIP payment only
          }

          // Handle booking payment
          const existing = allbookinghistories.filter((ele) => ele.user_name === user.email);

          const bookingData = {
            movie_name,
            language,
            place: placeselected,
            location: locationselected,
            date: selecteddate,
            timeslot: time,
            tickets: selectedSeats,
            added,
          };

          if (existing.length > 0) {
            const booked = [...existing[0].booked, bookingData];
            await axios.put(
              `/api/bookinghistory/${existing[0]._id}`,
              { user_name: user.email, booked },
              { headers: { Authorization: localStorage.getItem('token') } }
            );
          } else {
            await axios.post(
              '/api/bookinghistory',
              { user_name: user.email, booked: [bookingData] },
              { headers: { Authorization: localStorage.getItem('token') } }
            );
          }
          dispatch(reloadBookinghistory());

          // Update singledate bookings
          const matchingDate = allsingledate.find(ele =>
            ele.movie_name === movie_name &&
            ele.language === language &&
            ele.time === time &&
            new Date(ele.singledate).toDateString() === new Date(selectedDate).toDateString() &&
            ele.address === locationselected
          );

          const changeddate = new Date(`${dayNames[new Date(selectedDate).getDay()]}-${monthNames[new Date(selectedDate).getMonth()]}-${new Date(selectedDate).getDate()}-${new Date(selectedDate).getFullYear()}`);

          if (matchingDate) {
            const updatedSeats = [...matchingDate.selectedSeats, ...selectedSeats];
            console.log("updatedSeats in pay",updatedSeats)
            console.log("place in pay 1",placeselected)
            await axios.put(
              `/api/singledate/${matchingDate._id}`,
              { movie_name, language, singledate: changeddate, place: placeselected, address: locationselected, time, selectedSeats: updatedSeats }
            );
          } else {
            console.log("selectedSeats in pay",selectedSeats)
        console.log("place in pay 2",placeselected)
            await axios.post(
              '/api/singledate',
              { movie_name, language, singledate: changeddate, place: placeselected, address: locationselected, time, selectedSeats }
            );
          }
          dispatch(reloadSingledate());

          // Send SMS 
          {/*try {
            await axios.post('/api/send-message', {
              number: user.mobile,
              message: `Your booking for ${movie_name} (${language}) at ${locationselected} on ${time} is confirmed. Seats: ${selectedSeats.join(', ')}.`,
            });
          } catch (smsError) {
            console.error('SMS sending failed:', smsError);
            // Optional: Show alert or skip silently
          }*/}

          // Navigate to summary
          navigate('/bookingsummmary', {
            state: { bookingpayment, seatcost, addedcost, movie_name, language, locationselected, placeselected, selectedSeats, time, selectedDate, added, offerapplied },
            replace: true
          });

        },
        prefill: {
          name: user.firstname,
          email: user.email,
          contact: user.mobile,
        },
        theme: {
          color: '#F37254',
        },
      };

      //cancel      
      const rzp = new window.Razorpay(options);

      rzp.on('payment.failed', (response) => {
          console.error('Payment failed:', response.error);
          alert('Payment failed or was canceled.');
          window.location.href = '/alldetails';
      });
      
      rzp.on('dismiss', () => {
          console.log('Payment popup closed.');
          window.location.href = '/alldetails';
      });
      
      rzp.open();

    } catch (error) {
      console.error('Error during payment process:', error);
      alert('An error occurred while processing your payment.');
    }
  };

  return (
    <div style={{ maxWidth: '400px', marginLeft: '50%', textAlign: 'center', fontFamily: 'Arial, sans-serif' }}>
      <h1> Filmy Entertainment- Payment</h1>
      <input
        type="number"
        placeholder="Enter amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        style={{ padding: '10px', width: '100%', marginBottom: '20px', borderRadius: '5px', border: '1px solid #ddd' }}
      />
      <button
        onClick={handlePayment}
        style={{
          padding: '10px 20px',
          backgroundColor: '#F37254',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          fontSize: '16px',
        }}
      >
        Pay Now
      </button>
    </div>
  );
}
