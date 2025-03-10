import React, { useState, useEffect } from 'react';
import axios from '../config/axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { handleReload } from '../components/regSlice';
import { reloadBookinghistory ,reloadSingledate} from '../components/movieSlice';

export default function App() {
  const { user } = useSelector((state) => state.user);
  const { allbookinghistories,allsingledate } = useSelector((state) => state.movieSlice);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { vippay, bookingpayment,seatcost,addedcost, movie_name, language, locationselected, placeselected, selectedSeats, time, selectedDate, added,offerapplied } = location.state || {};
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  console.log("selectedDate in starting pay",selectedDate)
  console.log("selectedDate in starting pay",new Date(selectedDate))
  console.log("selectedDate in starting pay new dates",new Date(`${dayNames[new Date(selectedDate).getDay()]}-${monthNames[new Date(selectedDate).getMonth()]}-${new Date(selectedDate).getDate()}-${new Date(selectedDate).getFullYear()}`))
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
        key: 'rzp_test_65QeCr4YwXFMbS', // Replace with your Razorpay key ID
        amount: amountPaise,
        currency,
        name: 'Book My Show',
        description: 'Payment for your movie ticket',
        order_id,
        handler: async (response) => {
          alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);

          // Handle VIP payment
          if (vippay) {
            await axios.put(
              `/api/users/vippay/${user._id}`,
              { vip: 'yes', vipdate: new Date() },
              { headers: { Authorization: localStorage.getItem('token') } }
            );
            dispatch(handleReload());
            alert('VIP subscription activated successfully!');
            navigate('/initialpage', { replace: true });
          }

          // Handle booking payment
          if (bookingpayment) {
            const check = allbookinghistories.filter((ele) => ele.user_name === user.email);
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

            if (check.length > 0) {
              const booked = [...check[0].booked, bookingData];
              await axios.put(
                `/api/bookinghistory/${check[0]._id}`,
                { user_name: user.email, booked },
                { headers: { Authorization: localStorage.getItem('token') } }
              );
              dispatch(reloadBookinghistory());
            } else {
              await axios.post(
                '/api/bookinghistory/',
                { user_name: user.email, booked: [bookingData] },
                { headers: { Authorization: localStorage.getItem('token') } }
              );
              dispatch(reloadBookinghistory());
            }
          }
          //handle bookingpayment end

          //allsingledate
          if(allsingledate){
            const check = allsingledate.filter((ele) => ele.movie_name === movie_name && ele.language==language && ele.time==time && ele.singledate==new Date(selectedDate) && ele.address==locationselected);
            console.log("check in allsinfledate",check)
            let changeddate=new Date(`${dayNames[new Date(selectedDate).getDay()]}-${monthNames[new Date(selectedDate).getMonth()]}-${new Date(selectedDate).getDate()}-${new Date(selectedDate).getFullYear()}`)
            //console.log("check in allsinfledate",check[0].selectedSeats)
            //vcreate {movie_name,language,singledate,place,address,time,selectedSeats}
            /* app.post('/api/singledate', checkSchema(singledateValidationSchema),singledateCltr.create)
            app.put('/api/singledate/:id', checkSchema(singledateValidationSchema),singledateCltr.update)
            app.get('/api/singledate',singledateCltr.list)*/

            if(check.length>0){
              let checked=[...check[0].selectedSeats,...selectedSeats]
              console.log("checked",checked)
              axios.put(`/api/singledate/${check[0]._id}`,{movie_name,language,singledate:changeddate,place:placeselected,address:locationselected,time,selectedSeats:checked})
              .then((res)=>{
                console.log("res in sinfledate then",res.data)
                dispatch(reloadSingledate())
              })
              .catch((err)=>{
                console.log("err in singledate",err)
              })
            }
            else if(check.length==0){
              console.log("new Date(selectedDate) in else if",new Date(selectedDate))
              axios.post('/api/singledate',{  movie_name, language, singledate:changeddate,address:locationselected, place:placeselected, selectedSeats, time, selectedSeats})
              .then((res)=>{
                console.log("res in sinfledate else if length=0then",res.data)
                dispatch(reloadSingledate())
              })
              .catch((err)=>{
                console.log("err in singledate  else if length=0",err)
              })
            }
          }


          //end selecteddates

          // Send SMS to the user
          if(!vippay){
          await axios.post('/api/send-message', {
            number: user.mobile,
            message: `Your booking for ${movie_name} (${language}) at ${locationselected} on ${time} is confirmed. Seat numbers are ${selectedSeats}.`,
          });
        } // Send SMS to the user
        if(vippay){
        await axios.post('/api/send-message', {
          number: user.mobile,
          message:'You got promoted to vip',
        });
      }
          //,{ headers: { 'Authorization': localStorage.getItem('token')}}

          // Replace the current route with the same one to remove history
          navigate('/bookingsummmary', { 
            state: { bookingpayment,seatcost,addedcost,movie_name, language, locationselected, placeselected, selectedSeats, time, selectedDate, added ,offerapplied},
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

      const rzp = new window.Razorpay(options);

      rzp.on('payment.failed', (response) => {
        console.error('Payment failed:', response.error);
        alert('Payment was canceled or failed. Redirecting to the initial page.');
        navigate('/initialpage');
      });

      rzp.open();
    } catch (error) {
      console.error('Error during payment process:', error);
      alert('An error occurred while processing your payment. Please try again.');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', textAlign: 'center', fontFamily: 'Arial, sans-serif' }}>
      <h1>Book My Show - Payment</h1>
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
