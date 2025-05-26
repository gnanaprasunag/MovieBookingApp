import { useState ,useEffect} from 'react';
import axios from '../config/axios';
import { useSelector } from 'react-redux';

const CallInitiator = () => {
  
  const { user } = useSelector((state) => {
    return state.user;
  });

  const [phoneNumber, setPhoneNumber] = useState(); 
  const [message, setMessage] = useState('');

  useEffect(()=>{
    if(user && user.mobile){
      setPhoneNumber(user.mobile.slice(3))
    }
  },[user])

  if (!user) {
    return <p>Loading...</p>;
  }
  const handleInputChange = (e) => {
    const input = e.target.value;
    // Allow only digits and ensure it's at most 10 characters
    if (/^\d{0,10}$/.test(input)) {
      setPhoneNumber(input);
    }
  };

  const handleCallInitiation = async () => {
    if (phoneNumber.length !== 10) {
      setMessage('Please enter a valid 10-digit Indian mobile number.');
      return;
    }

    try {
      const response = await axios.post('/api/makeCall', {
        to: `+91${phoneNumber}`, 
      });
      setMessage(response.data);
    } catch (error) {
      console.error('Error initiating call:', error);
      setMessage('Failed to initiate call. Please try again.');
    }
  };


  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '50px',
      }}
    >
      <h1>Call Initiator</h1>
      <label htmlFor="phoneNumber" style={{ marginBottom: '10px' }}>
        Enter Indian Phone Number:
      </label>
      <input
        type="tel"
        id="phoneNumber"
        value={phoneNumber}
        onChange={handleInputChange}
        placeholder="Enter 10-digit phone number"
        style={{
          padding: '10px',
          width: '300px',
          marginBottom: '20px',
          fontSize: '16px',
        }}
      />
      <button
        onClick={handleCallInitiation}
        style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}
      >
        Initiate Call
      </button>
      {message && (
        <p
          style={{
            marginTop: '20px',
            color: message.includes('Failed') ? 'red' : 'green',
          }}
        >
          {message}
        </p>
      )}
    </div>
  );
};

export default CallInitiator; 