import { Routes, Route, Link } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { handleLogout,handleReload} from './components/regSlice';

import {useEffect} from 'react'


//import { useContext } from 'react'
import PrivateRoute from './components/PrivateRoute';
import AuthorizeRoute from './components/AuthorizeRoute'
//import AuthContext from './context/AuthContext';
import { useSelector, useDispatch } from 'react-redux'; 
import { reloadMovies,reloadCastcrews,reloadSingledate,reloadTimeplaces,reloadBookinghistory,reloadRatings } from './components/movieSlice';
import Register from './pages/registerLoginUserprofile/Register';
import Login from './pages/registerLoginUserprofile/Login';
import Dashboard from './pages/registerLoginUserprofile/Dashboard';
import Profile from './pages/registerLoginUserprofile/Profile';
//import Genre from './pages/Genre';
import ListUsers from './pages/registerLoginUserprofile/ListUsers';
import Forbidden from './pages/registerLoginUserprofile/Forbidden';


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


function App() {
  //const { state, handleLogout} = useContext(AuthContext)
  
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
                    .then((result) => console.log("Thunk resolved:", result))
    .catch((error) => console.log("Thunk rejected:", error));
                    console.log('after reload dispatch')
                    //const userResponse = await axios.get('/api/users/account', { headers: { 'Authorization': localStorage.getItem('token')}})
                    //dispatch({ type: 'LOGIN_USER', payload: userResponse.data })
                } catch(err) {
                    console.log("error",err)
                }
            
        })();
    }, [])
  const {isLoggedin} = useSelector((state) => {
    return state.user
})
  const notify=()=>{
    toast("toast",{autoClose:2000})
  }
  const dispatch=useDispatch()
  return (
    <div className="App">
        
        
        <ul>
          { isLoggedin ? (
            <>
             <li><Link to="/dashboard">Dashboard</Link></li>
             <li><Link to="/profile">Profile</Link></li>
            <li><Link to="/listusers">ListUsers</Link></li>
            <li><Link to="/moviedetails">Movie details</Link></li>
            <li><Link to="/castcrewdetails">Castcrew details</Link></li>
            <li><Link to="/timeplacedetails">Timeplace details</Link></li>
            <li><Link to="/bookinghistory">Booking history</Link></li>
            <li><Link to="/userbookinghistory">User Booking history</Link></li>
            <li><Link to="/ratingdetails">Rating details</Link></li>
            <li><Link to="/ratings">Ratings</Link></li>
            <li><Link to="/allratings">All Ratings</Link></li>
            <li><Link to="/genre">Genre</Link></li>
            <li><Link to="/browsehere">Browse Here</Link></li>
            <li><Link to="/call">Call</Link></li>
            <li><Link to="/voicesearch">Voice search</Link></li>
            <li><Link to="/initialpage">Initial page</Link></li>
            <li><Link to="/navigation">Navigation</Link></li>
             <li><button onClick={()=>{dispatch(handleLogout())}}>logout</button></li>
            </>
          ): (
            <>
              <li><Link to="/register">Register</Link></li>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/moviedetails">Movie details</Link></li>
              <li><Link to="/castcrewdetails">Castcrew details</Link></li>
              <li><Link to="/timeplacedetails">Timeplace details</Link></li>
              <li><Link to="/bookinghistory">Booking history</Link></li>
              <li><Link to="/userbookinghistory">User Booking history</Link></li>
              <li><Link to="/ratingdetails">Rating details</Link></li>
              <li><Link to="/ratings">Ratings</Link></li>
              <li><Link to="/initialpage">Initial page</Link></li>
            </>
          )}
        </ul>

        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
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
            <PrivateRoute>
              <AvailableOffers />
            </PrivateRoute>
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
            <PrivateRoute>
              <VoiceSearch />
            </PrivateRoute>
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
            <PrivateRoute>
              <FandQ />
            </PrivateRoute>
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
            <PrivateRoute>
              <Onlocationclick />
              </PrivateRoute>
          } />
        <Route path="/onbooktickets" element={
            <PrivateRoute>
              <Onbooktickets />
            </PrivateRoute>
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