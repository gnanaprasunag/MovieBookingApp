import { Routes, Route ,Navigate} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { handleReload } from './components/regSlice';
import { useEffect, lazy, Suspense } from 'react';
import PrivateRoute from './components/PrivateRoute';
import AuthorizeRoute from './components/AuthorizeRoute';
import { useDispatch } from 'react-redux';
import {
    reloadMovies,
    reloadCastcrews,
    reloadSingledate,
    reloadTimeplaces,
    reloadBookinghistory,
    reloadRatings
} from './components/movieSlice';


// Lazy-loaded components
const Register = lazy(() => import('./pages/registerLoginUserprofile/Register'));
const Login = lazy(() => import('./pages/registerLoginUserprofile/Login'));
const Profile = lazy(() => import('./pages/registerLoginUserprofile/Profile'));
const ListUsers = lazy(() => import('./pages/registerLoginUserprofile/ListUsers'));
const Forbidden = lazy(() => import('./pages/registerLoginUserprofile/Forbidden'));
const Direction = lazy(() => import('./pages/Direction'));

const MovieDetails = lazy(() => import('./pages/movieCreation/MovieDetails'));
const CastcrewDetails = lazy(() => import('./pages/castcrewCreation/CastcrewDetails'));
const TimeplaceDetails = lazy(() => import('./pages/timeplaceCreation/TimeplaceDetails'));
const BookingHistory = lazy(() => import('./pages/bookingHistory/BookingHistory'));
const UserBookingHistory = lazy(() => import('./pages/bookingHistory/UserBookingHistory'));
const RatingDetails = lazy(() => import('./pages/rating/RatingDetails'));
const Ratings = lazy(() => import('./pages/rating/Ratings'));
const AllRatings = lazy(() => import('./pages/rating/AllRatings'));

const Genre = lazy(() => import('./pages/Genre'));
const BrowseHere = lazy(() => import('./pages/BrowseHere'));
const Call = lazy(() => import('./pages/Call'));
const VoiceSearch = lazy(() => import('./pages/VoiceSearch'));
const InitialPage = lazy(() => import('./pages/InitialPage'));
const Navigation = lazy(() => import('./pages/Navigation'));
const FandQ = lazy(() => import('./pages/FandQ'));
const Pay = lazy(() => import('./pages/Pay'));
const Onmovieclick = lazy(() => import('./pages/Onmovieclick'));
const Onlocationclick = lazy(() => import('./pages/Onlocationclick'));
const Onbooktickets = lazy(() => import('./pages/Onbooktickets'));
const Onplaceclick = lazy(() => import('./pages/Onplaceclick'));
const Snack = lazy(() => import('./pages/Snack'));
const AllDetails = lazy(() => import('./pages/AllDetails'));
const BookingSummary = lazy(() => import('./pages/BookingSummary'));
const AvailableOffers = lazy(() => import('./pages/AvailableOffers'));
const ApplicableOffers = lazy(() => import('./pages/ApplicableOffers'));

function App() {
    
    const dispatch = useDispatch();

    // Reload data and user session when app starts
    useEffect(() => {
        (async () => {
            try {
                if (localStorage.getItem('token')) {
                    dispatch(handleReload());
                }
                dispatch(reloadMovies());
                dispatch(reloadCastcrews());
                dispatch(reloadTimeplaces());
                dispatch(reloadBookinghistory());
                dispatch(reloadRatings());
                dispatch(reloadSingledate());
            } catch (err) {
                console.log('error', err);
            }
        })();
    }, []);

   

    return (
        <div className="App">
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    <Route path="/" element={<Navigate to="/initialpage" replace />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/direction" element={<Direction />} />

                    <Route path="/moviedetails" element={<PrivateRoute><MovieDetails /></PrivateRoute>} />
                    <Route path="/castcrewdetails" element={<PrivateRoute><CastcrewDetails /></PrivateRoute>} />
                    <Route path="/timeplacedetails" element={<PrivateRoute><TimeplaceDetails /></PrivateRoute>} />
                    <Route path="/bookinghistory" element={<PrivateRoute><BookingHistory /></PrivateRoute>} />
                    <Route path="/userbookinghistory" element={<PrivateRoute><UserBookingHistory /></PrivateRoute>} />
                    <Route path="/ratingdetails" element={<PrivateRoute><RatingDetails /></PrivateRoute>} />
                    <Route path="/ratings" element={<Ratings />} />
                    <Route path="/allratings" element={<AllRatings />} />
                    <Route path="/alldetails" element={<PrivateRoute><AllDetails /></PrivateRoute>} />
                    <Route path="/availableoffers" element={<AvailableOffers />} />
                    <Route path="/applicableoffers" element={<PrivateRoute><ApplicableOffers /></PrivateRoute>} />
                    <Route path="/bookingsummmary" element={<PrivateRoute><BookingSummary /></PrivateRoute>} />
                    <Route path="/genre" element={<Genre />} />
                    <Route path="/browsehere" element={<BrowseHere />} />
                    <Route path="/call" element={<PrivateRoute><Call /></PrivateRoute>} />
                    <Route path="/snack" element={<PrivateRoute><Snack /></PrivateRoute>} />
                    <Route path="/voicesearch" element={<VoiceSearch />} />
                    <Route path="/navigation" element={<Navigation />} />
                    <Route path="/initialpage" element={<InitialPage />} />
                    <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
                    <Route path="/fandq" element={<FandQ />} />
                    <Route path="/pay" element={<PrivateRoute><Pay /></PrivateRoute>} />
                    <Route path="/onmovieclick" element={<Onmovieclick />} />
                    <Route path="/onplaceclick" element={<Onplaceclick />} />
                    <Route path="/onlocationclick" element={<Onlocationclick />} />
                    <Route path="/onbooktickets" element={<Onbooktickets />} />

                    <Route path="/listusers" element={
                        <PrivateRoute>
                            <AuthorizeRoute roles={['admin', 'moderator']}>
                                <ListUsers />
                            </AuthorizeRoute>
                        </PrivateRoute>
                    } />

                    <Route path="/forbidden" element={<Forbidden />} />
                </Routes>
            </Suspense>
            <ToastContainer />
        </div>
    );
}

export default App;
