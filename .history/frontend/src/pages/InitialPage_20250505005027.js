import { useState ,useRef,useEffect, useMemo, useCallback } from "react";
import axios from '../config/axios';
import { useNavigate,useLocation } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faMicrophone,faStop } from '@fortawesome/free-solid-svg-icons';
import { handleReload,handleLogout } from '../components/regSlice';
import DisplayMovies from './DisplayMovies';
import './Initialpage.css';

export default function App(){
    let appImage="https://res.cloudinary.com/dxrbuyd4b/image/upload/v1737347669/oirr91odqlxcvfmy6vtr.png"
    const navigate=useNavigate()
    const dispatch=useDispatch()

    const location = useLocation();
    const { selectedlocation } = location.state || {};

    const { user } = useSelector((state) => state.user);

    // ✅ Memoize genre and language arrays
    const genre = useMemo(() => ["All","Action", "Adventure", "Animation", "Comedy", "Crime", "Documentary", "Drama", "Family", "Fantasy", "Horror", "Musical", "Mystery", "Sci-Fi", "Thriller"], []);
    const language = useMemo(() => ['Telugu','English','Hindi','Tamil','Korean','Hinglish','Malayalam'], []);

    const[searchMoviename,setsearchMoviename]=useState('');

    //voice search
    const [transcript, setTranscript] = useState('');
    const [isListening, setIsListening] = useState(false);
    const recognitionRef = useRef(null);

    const startListening = useCallback(() => {
        if (!recognitionRef.current) {
            const recognition = new window.webkitSpeechRecognition();
            recognition.continuous = true;
            recognition.interimResults = true;

            recognition.onresult = (event) => {
                const currentTranscript = Array.from(event.results)
                    .map((result) => result[0])
                    .map((result) => result.transcript)
                    .join('');
                setsearchMoviename(currentTranscript.slice(0, currentTranscript.length - 1));
            };

            recognition.onend = () => {};
            recognitionRef.current = recognition;
        }

        recognitionRef.current.start();
        setIsListening(true);
    }, []);

    const stopListening = useCallback(() => {
        if (recognitionRef.current) {
            recognitionRef.current.stop();
            setIsListening(false);
        }
    }, []);

    const[genrefilter,setgenrefilter]=useState(null);

    // ✅ Memoize sidebar functions to avoid re-creating them
    const openNav = useCallback(() => {
        document.getElementById("mySidepanel").style.width = "250px";
    }, []);

    const closeNav = useCallback(() => {
        document.getElementById("mySidepanel").style.width = "0";
    }, []);

    const [currentLocation, setcurrentLocation] = useState(null);
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);

    useEffect(() => {
        if (user && user.vipdate !== null) {
            const date = new Date();
            const vipdate = new Date(user.vipdate);

            if (
                date.getDate() + '/' + date.getMonth() ===
                    vipdate.getDate() + '/' + vipdate.getMonth() &&
                vipdate.getFullYear() + 1 === date.getFullYear()
            ) {
                axios
                    .put(
                        `/api/users/vippay/${user._id}`,
                        { vip: 'no', vipdate: null },
                        { headers: { 'Authorization': localStorage.getItem('token') } }
                    )
                    .then(() => {
                        dispatch(handleReload());
                        alert('Success: VIP subscription updated.');
                        navigate('/initialpage');
                    })
                    .catch((err) => {});
            }
        }
    }, [user, dispatch, navigate]);

    useEffect(() => {
        if (selectedlocation) {
            setcurrentLocation(selectedlocation);
        } else if (!selectedlocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                setLatitude(position.coords.latitude);
                setLongitude(position.coords.longitude);
            });
        }
    }, [selectedlocation]);

    useEffect(() => {
        if(latitude!=null && longitude!=null){
            const Key = 'pk.2a08003926a37954102c9d1cb3d3d94c';
            axios.get(`https://us1.locationiq.com/v1/reverse.php?key=${Key}&lat=${latitude}&lon=${longitude}&format=json`)
            .then((res)=>{
                let data=res.data.address.state_district 
                if (data=="Sri Potti Sriramulu Nellore"){
                    setcurrentLocation("Nellore")
                } else {
                    setcurrentLocation(data)
                }
            });
        }
    }, [latitude,longitude]);

    const[lang,setlang]=useState('Telugu');

    return (
    <div style={{ background: 'linear-gradient(45deg,rgb(240, 125, 125),rgb(223, 87, 232))',}}>
    <div className="header-container" >
        <div className="image-container">
            <img src={appImage} alt="App Logo" style={{ width: '500px' }} />
        </div>

        <div className="actions-container">
            <div className='container1'>
                <div className="search-container">
                    <input
                        type="text"
                        value={searchMoviename}
                        onChange={(e) => setsearchMoviename(e.target.value)}
                        name="search"
                        placeholder="Search..."
                        style={{width:'500px',border:'solid'}}
                    />
                </div>

                <div className="voice-search">
                    <button
                        onClick={isListening ? stopListening : startListening}
                        className="microphone-button"
                        style={{width:'100px',height:'50px',border:'solid',backgroundColor:'white'}}
                    >
                        {isListening ? <FontAwesomeIcon icon={faStop} style={{ color: 'white', fontSize: '24px' }} /> : <FontAwesomeIcon icon={faMicrophone} style={{fontSize:"40px",color:'red'}}/>}
                    </button>
                </div>
            </div>

            <div className="secondpart">
                <div className="user-info" style={{marginLeft:'20px'}}>
                {localStorage.getItem('token') ? (
                    <div style={{marginTop:'30px'}}>
                    <h3>{user && `Hi, ${user.firstname}`}</h3>
                    <FontAwesomeIcon icon={faUser} style={{ fontSize: '60px', color: 'green' }} />
                    </div>
                ) : (
                    <div style={{marginTop:'60px'}}><button style={{backgroundColor:'pink'}} onClick={() => navigate('/login')}>Sign In</button></div>
                )}
                </div>

                {currentLocation && <h3 style={{height:'60px',margin:'8% 0'}}>{currentLocation}</h3>}
                <button className="openbtn" style={{height:'60px',margin:'8% 0',border:'solid'}} onClick={() => navigate('/navigation')}>Navigate</button>

                <div>
                    <button className="openbtn" style={{margin:'50% 0',marginRight:'30px',border:'solid'}} onClick={() => document.getElementById('menuSidepanel').style.width = '250px'}>
                    ☰ Menu
                    </button>
                    <div id="menuSidepanel" className="sidepanel">
                        <button className="closebtn" onClick={() => document.getElementById('menuSidepanel').style.width = '0'}>
                        &times;
                        </button>
                        <button onClick={() => navigate('/profile')}>Profile</button>
                        <button onClick={() => navigate('/userbookinghistory')}>Booking History</button>
                        <button onClick={() => navigate('/call')}>Support</button>
                        <button onClick={() => navigate('/fandq')}>F&Q</button>
                        <button onClick={() => navigate('/applicableoffers')}>Applicable Offers</button>
                        <button onClick={() => navigate('/availableoffers')}>Available Offers</button>
                        <button onClick={() => dispatch(handleLogout())}>Logout</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    {/* Admin Dashboard */}
    {user && user.role === 'admin' && (
    <div className="admin-dashboard">
        <button onClick={() => navigate('/moviedetails')}>Movies</button>
        <button onClick={() => navigate('/bookinghistory')}>Booking History</button>
        <button onClick={() => navigate('/listusers')}>Users</button>
        <button onClick={() => navigate('/castcrewdetails')}>Cast Crew</button>
        <button onClick={() => navigate('/timeplacedetails')}>Time Places</button>
        <button onClick={() => navigate('/allratings')}>Ratings</button>
    </div>
    )}

    {/* Languages */}
    <div className="language-container">
    {language.map((ele, i) => (
        <button
        style={lang === ele ? { backgroundColor: 'blue', color: 'white' } : {}}
        onClick={() => setlang(ele)}
        key={i}
        >
        {ele}
        </button>
    ))}
    </div>

    {/* VIP subscription */}
    <div style={{ display: 'flex', justifyContent: 'center' }}>
    {(user && user.vip=='no') || (!localStorage.getItem('token')) && <div>
        <img src={"https://res.cloudinary.com/dxrbuyd4b/image/upload/v1737658392/fchgv2fa1kg3u3qwrhfv.jpg"} alt="Uploaded" style={{ width: '300px' }} />
        <br/>
        <button style={{ marginLeft:'100px',backgroundColor:'black',color:'gold' }} onClick={()=>{if(!localStorage.getItem('token')){navigate('/login')}navigate('/pay',{state:{vippay:500}})}}>Subscribe</button>
        </div>}
    </div>

    {/* Footer */}
    <footer>
    <button
        className="footer-left-button"
        onClick={() => navigate('/browsehere', { state: { currentLocation } })}
    >
        Browse here
    </button>

    <button className="footer-right-button" onClick={openNav}>
        ☰ Genre
    </button>

    <div id="mySidepanel" className="sidepanel">
        <button className="closebtn" onClick={closeNav}>
        &times;
        </button>
        {genre.map((item, index) => (
        <button key={index} onClick={() => setgenrefilter(item)}>
            {item}
        </button>
        ))}
    </div>
    </footer>

    {/*Display movies*/}
    {currentLocation!=null && <DisplayMovies currentLocation={currentLocation} genrefilter={genrefilter} lang={lang} searchMoviename={searchMoviename} />}
    </div>
    );
}
