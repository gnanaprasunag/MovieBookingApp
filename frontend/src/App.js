import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { handleReload} from './components/regSlice';

import {useEffect} from 'react'


//import { useContext } from 'react'
import PrivateRoute from './components/PrivateRoute';
import AuthorizeRoute from './components/AuthorizeRoute'
//import AuthContext from './context/AuthContext';
import { useDispatch } from 'react-redux'; 
import { reloadMovies,reloadCastcrews,reloadSingledate,reloadTimeplaces,reloadBookinghistory,reloadRatings } from './components/movieSlice';
import Register from './pages/registerLoginUserprofile/Register';
import Login from './pages/registerLoginUserprofile/Login';

import Profile from './pages/registerLoginUserprofile/Profile';
//import Genre from './pages/Genre';
import ListUsers from './pages/registerLoginUserprofile/ListUsers';
import Forbidden from './pages/registerLoginUserprofile/Forbidden';
import Direction from './pages/Direction';


import MovieDetails from './pages/movieCreation/MovieDetails' 
import CastcrewDetails from './pages/castcrewCreation/CastcrewDetails'
import TimeplaceDetails from './pages/timeplaceCreation/TimeplaceDetails'
import BookingHistory from './pages/bookingHistory/BookingHistory'
import UserBookingHistory from './pages/bookingHistory/UserBookingHistory'
import RatingDetails from './pages/rating/RatingDetails'
import Ratings from './pages/rating/Ratings';
import AllRatings from './pages/rating/AllRatings';
import Genre from './pages/Genre'
import BrowseHere from './pages/BrowseHere'
import Call from './pages/Call'
import VoiceSearch from './pages/VoiceSearch'
import InitialPage from './pages/InitialPage'
import Navigation from './pages/Navigation'
import FandQ from './pages/FandQ';
import Pay from './pages/Pay';
import Onmovieclick from './pages/Onmovieclick'
import Onlocationclick from './pages/Onlocationclick'
import Onbooktickets from './pages/Onbooktickets'
import Onplaceclick from './pages/Onplaceclick'
import Snack from './pages/Snack';
import AllDetails from './pages/AllDetails';
import BookingSummary from './pages/BookingSummary'
import AvailableOffers from './pages/AvailableOffers'
import ApplicableOffers from './pages/ApplicableOffers'
import { useNavigate } from 'react-router-dom';

function App() {
  
  const navigate=useNavigate()
    useEffect(() => { // handle page reload 
        (async () => {
            
                try {
                    console.log('before reload dispatch')
                    console.log("in useeffect in app handleReload",handleReload)
                    if(localStorage.getItem('token')) {
                    dispatch(handleReload())
                    }
                    dispatch(reloadMovies())
                    dispatch(reloadCastcrews())
                    dispatch(reloadTimeplaces())
                    dispatch(reloadBookinghistory())
                    dispatch(reloadRatings())
                    dispatch(reloadSingledate())
                         
                } catch(err) {
                    console.log("error",err)
                }
            
        })();
    }, [])

  const dispatch=useDispatch()
  useEffect(()=>{
    if(window.location.pathname=='/'){
      navigate('/initialpage')
    }
    },[])
  
  return (
    <div className="App">
      
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
         
          <Route path="/direction" element={
            
              <Direction />
            
          } />
           <Route path="/moviedetails" element={
            <PrivateRoute>
              <MovieDetails />
            </PrivateRoute>
          } />
          <Route path="/castcrewdetails" element={
            <PrivateRoute>
              <CastcrewDetails />
            </PrivateRoute>
          } />
           <Route path="/timeplacedetails" element={
            <PrivateRoute>
              <TimeplaceDetails />
            </PrivateRoute>
          } />
           <Route path="/bookinghistory" element={
            <PrivateRoute>
              <BookingHistory />
            </PrivateRoute>
          } />
           <Route path="/userbookinghistory" element={
            <PrivateRoute>
              <UserBookingHistory />
            </PrivateRoute>
          } />
           <Route path="/ratingdetails" element={
            <PrivateRoute>
              <RatingDetails />
            </PrivateRoute>
          } />
           <Route path="/ratings" element={
              <Ratings />
          } />
          <Route path="/allratings" element={
            
              <AllRatings />
            
          } />
           <Route path="/alldetails" element={
            <PrivateRoute>
              <AllDetails />
            </PrivateRoute>
          } />
          <Route path="/availableoffers" element={
            
              <AvailableOffers />
            
          } />
          <Route path="/applicableoffers" element={
            <PrivateRoute>
              <ApplicableOffers />
            </PrivateRoute>
          } />
          <Route path="/bookingsummmary" element={
            <PrivateRoute>
              <BookingSummary />
            </PrivateRoute>
          } />
           <Route path="/genre" element={
            
              <Genre />
            
          } />
           <Route path="/browsehere" element={
            
              <BrowseHere />
            
          } />
          <Route path="/call" element={
            <PrivateRoute>
              <Call />
            </PrivateRoute>
          } />
           <Route path="/snack" element={
            <PrivateRoute>
              <Snack />
            </PrivateRoute>
          } />
           <Route path="/voicesearch" element={
            
              <VoiceSearch />
            
          } />
           <Route path="/navigation" element={
            
              <Navigation/>
            
          } />
          <Route path="/initialpage" element={
            
              <InitialPage/>
            
          } />
          <Route path="/profile" element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          } />
          <Route path="/fandq" element={
            
              <FandQ />
            
          } />
           <Route path="/pay" element={
            <PrivateRoute>
              <Pay />
            </PrivateRoute>
          } />
            <Route path="/onmovieclick" element={
            
              <Onmovieclick />
            
          } />
           <Route path="/onplaceclick" element={
            
              <Onplaceclick />
            
          } />
          <Route path="/onlocationclick" element={
            
              <Onlocationclick />
              
          } />
        <Route path="/onbooktickets" element={
            
              <Onbooktickets />
            
          } />
          
          <Route path="/listusers" element={
            <PrivateRoute>
              <AuthorizeRoute roles={['admin','moderator']}>
            <ListUsers />
            </AuthorizeRoute>
          </PrivateRoute>} /> 
          <Route path="/forbidden" element={<Forbidden />}/>
         
        </Routes>

        <ToastContainer />
    </div>
  );
}

export default App;

                       /* {(state.user.role=='admin' || state.user.role=='moderator') && <li><Link to="/list-users">List Users</Link></li>}
             
             <li><Link to="/my-notes">My Notes</Link></li>
           */