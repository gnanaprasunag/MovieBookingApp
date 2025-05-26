import { useState,useEffect } from "react";
import { handleEditId, handleReload, handleServerErrors } from '../../components/regSlice'; 
import { useSelector, useDispatch } from 'react-redux'; 
import { useNavigate } from 'react-router-dom';
import axios from '../../config/axios';
import Register from "./Register";
import './profile.css';

export default function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [succ, setSucc] = useState(false);
  const [new1, setNew1] = useState('');
  const [new2, setNew2] = useState('');
  const [messageMail, setMessageMail] = useState(null);
  const [messageMobile, setMessageMobile] = useState(null);
  const [mailChange, setMailChange] = useState(null);
  const [mobileChange, setMobileChange] = useState(null);
  const [email, setEmail] = useState(null);
  const [mobile, setMobile] = useState(null);

  const { user, error,editId } = useSelector((state) => state.user);
  console.log("token in profile",localStorage.getItem('token'))
  
  useEffect(()=>{
    if (messageMail || messageMobile) {
      let input = window.prompt("Enter the code");//input type is string
      if (input && messageMail) {
        if (input == messageMail) {
          setMailChange(true);
          setMessageMail(null);
        }
      }
      else if(user && messageMobile){
        if (input == messageMobile) {
          setMobileChange(true);
          setMessageMobile(null);
        }
      }
    }
  },[messageMail,messageMobile])

  if (!user) {
    return <p>Loading...</p>;
  }


  const handleMailsms = () => {
    const message = Math.floor(Math.random() * 1000);
    axios.post('/api/send-message', { number: user.mobile, message })
      .then(() => {
        setMessageMail(message);
        dispatch(handleServerErrors(null));
      })
      .catch((err) => handleServerErrors (err));
  };

  const handleMobilesms = () => {
    const message = Math.floor(Math.random() * 1000);
    axios.post('/api/send-message', { number: user.mobile, message })
      .then(() => {
        setMessageMobile(message);
        dispatch(handleServerErrors(null));
      })
      .catch((err) => handleServerErrors (err));
  };

  const handleEditMail = () => {
    axios.put(`/api/users/change-email/${user._id}`, { email }, { headers: { 'Authorization': localStorage.getItem('token') }})
      .then(() => {
        setMailChange(null);
        dispatch(handleReload());
        dispatch(handleServerErrors(null));
      })
      .catch((err) => handleServerErrors (err));
  };

  const handleEditMobile = () => {
    axios.put(`/api/users/change-mobile/${user._id}`, { mobile: `+91${mobile}` }, { headers: { 'Authorization': localStorage.getItem('token') }})
      .then(() => {
        setMobileChange(null);
        dispatch(handleReload());
        dispatch(handleServerErrors(null));
      })
      .catch((err) => handleServerErrors (err));
  };

  const handlePassword = () => {
    let currentPassword = window.prompt("Enter your current password");
    axios.put(`/api/users/password-check/${user._id}`, { password: currentPassword }, { headers: { 'Authorization': localStorage.getItem('token') }})
      .then(() => {
        setSucc(true);
        dispatch(handleServerErrors(null));
      })
      .catch((err) => handleServerErrors (err));
  };

  const handleNew = () => {
    axios.put(`/api/users/password-change/${user._id}`, { password: new1 }, { headers: { 'Authorization': localStorage.getItem('token') }})
      .then(() => {
        setSucc(false);
        dispatch(handleServerErrors(null));
      })
      .catch((err) => handleServerErrors (err));
  };

  const handleEditUser = (userId) => {
    dispatch(handleEditId(userId));  
    navigate('/register');
    
  };

  return (
    <div className="profile-container">
      {error && (
        <div className="error-box">
          <h2>Server Errors</h2>
          <ul>
            {error.map((ele, i) => (
              <li key={i}>{ele}</li>
            ))}
          </ul>
        </div>
      )}
      <h2 className="title">Profile Page</h2>
      <button onClick={() => handleEditUser(user._id)} className="edit-profile-btn">Edit Profile</button>
      <div className="profile-details">
        <p>Email: {user.email}</p>
        <button onClick={handleMailsms} className="edit-btn">Edit Email</button>
        <p>Mobile: {String(user.mobile).slice(3)}</p>
        <button onClick={handleMobilesms} className="edit-btn">Edit Mobile</button>
        <p>First Name: {user.firstname}</p>
        <p>Role: {user.role}</p>
        <p>Birthday: {user.birthday.split('T')[0]}</p>
        <p>Anniversary: {user.anniversary.split('T')[0]}</p>
        <button onClick={handlePassword} className="edit-btn">Change Password</button>
      </div>

      {succ && (
        <div className="password-change-box">
          <label>Enter New Password</label>
          <input type="password" value={new1} onChange={(e) => setNew1(e.target.value)} required/>
          <label>Re-enter New Password</label>
          <input type="password" value={new2} onChange={(e) => setNew2(e.target.value)} required/>
          {new1 === new2 ? (
            <button onClick={handleNew} className="submit-btn">Submit</button>
          ) : (
            <p className="error">Passwords do not match</p>
          )}
        </div>
      )}

      {mailChange && (
        <div className="email-change-box">
          <label>Enter New Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <button onClick={handleEditMail} className="submit-btn">Submit</button>
        </div>
      )}

      {mobileChange && (
        <div className="mobile-change-box">
          <label>Enter New Mobile Number</label>
          <input type="number" value={mobile} onChange={(e) => setMobile(e.target.value)} />
          <button onClick={handleEditMobile} className="submit-btn">Submit</button>
        </div>
      )}

      
    </div>
  );
}
