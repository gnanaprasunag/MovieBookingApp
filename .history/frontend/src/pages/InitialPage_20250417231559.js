/* https://res.cloudinary.com/dxrbuyd4b/image/upload/v1737347669/oirr91odqlxcvfmy6vtr.png*/
import { useState ,useRef,useEffect} from "react"
import axios from '../config/axios';
import { useNavigate,useLocation} from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faMicrophone,faStop } from '@fortawesome/free-solid-svg-icons';
 // Import specific icon(s) you need
import { handleReload,handleLogout} from '../components/regSlice';
import DisplayMovies from './DisplayMovies'
import './Initialpage.css'


export default function App(){
    let appImage="data:image/jpeg;base64,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"
    const navigate=useNavigate()
    const dispatch=useDispatch()

    const location = useLocation();
    const { selectedlocation } = location.state || {};
    console.log("selectedlocation initial page",selectedlocation)

    const { user} = useSelector((state) => {
        return state.user
    })
      useEffect(() => {
        if (user && user.vipdate !== null) {
          const date = new Date();
          const vipdate = new Date(user.vipdate);
      
          if (
            date.getDate() + '/' + date.getMonth() ===
              vipdate.getDate() + '/' + vipdate.getMonth() &&
            vipdate.getFullYear() + 1 === date.getFullYear()
          ) {
            console.log('VIP expired');
            axios
              .put(
                `/api/users/vippay/${user._id}`,
                { vip: 'no', vipdate: null },
                { headers: { 'Authorization': localStorage.getItem('token') } }
              )
              .then((res) => {
                console.log('res in pay', res);
                dispatch(handleReload());
                alert('Success: VIP subscription updated.');
                navigate('/initialpage');
              })
              .catch((err) => {
                console.log('err', err);
              });
          } else {
            console.log('VIP not expired');
          }
        } else if (user && user.vipdate === null) {
          console.log('No VIP date');
        }
      }, [user]);
      

    const genre=["All","Action", "Adventure", "Animation", "Comedy", "Crime", "Documentary", "Drama", "Family", "Fantasy", "Horror", "Musical", "Mystery",  "Sci-Fi", "Thriller"]
    const { allmovies,alltimeplaces} = useSelector((state) => {
      return state.movieSlice
  })

    const[searchMoviename,setsearchMoviename]=useState('')

    //voice search
    const [transcript, setTranscript] = useState('');
      const [isListening, setIsListening] = useState(false);
      const recognitionRef = useRef(null);

        // Initialize SpeechRecognition instance
  const startListening = () => {
    if (!recognitionRef.current) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;

      recognition.onresult = (event) => {
        const currentTranscript = Array.from(event.results)
          .map((result) => result[0])
          .map((result) => result.transcript)
          .join('');

        //setTranscript(currentTranscript);
        console.log("currentTranscript.slice(0,currentTranscript.length-1)",currentTranscript.slice(0,currentTranscript.length-1))
        setsearchMoviename(currentTranscript.slice(0,currentTranscript.length-1));
      };

      recognition.onend = () => {
        console.log('Speech recognition stopped.');
      };
      console.log("recognition",recognition)
      recognitionRef.current = recognition;
    }

    recognitionRef.current.start();
    setIsListening(true);
  };
//stop listening
  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  //genre
  const[genrefilter,setgenrefilter]=useState(null)
  /* Set the width of the sidebar to 250px (show it) */
const openNav=()=> {
    document.getElementById("mySidepanel").style.width = "250px";
  }
  /* Set the width of the sidebar to 0 (hide it) */
  const closeNav=()=>{
    document.getElementById("mySidepanel").style.width = "0";
  }
  console.log("genrefilter",genrefilter)

  //present location
  const [currentLocation, setcurrentLocation] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  useEffect(()=>{
    if(selectedlocation){
      console.log("selectedlocation")
      setcurrentLocation(selectedlocation)
    }
    else if(!selectedlocation){
        navigator.geolocation.getCurrentPosition(function (position) {
            var lat = position.coords.latitude
            var lon = position.coords.longitude;
            console.log('lat,long in initailapage',[lat,lon])
            setLatitude(lat)
            setLongitude(lon)
        })
    
  }
},[selectedlocation])
useEffect(()=>{
  if(latitude!=null && longitude!=null){
  const Key = 'pk.2a08003926a37954102c9d1cb3d3d94c';
    axios.get(`https://us1.locationiq.com/v1/reverse.php?key=${Key}&lat=${latitude}&lon=${longitude}&format=json`)
    .then((res)=>{
        console.log(res)
        let data=res.data.address.state_district 
        if (data=="Sri Potti Sriramulu Nellore"){
          setcurrentLocation("Nellore")
        }
        else{setcurrentLocation(data)}
        console.log("datat in navigation.geolocation",data)
    })
    .catch((err)=>{
        console.log(err)
    })
  }
},[latitude,longitude])
console.log("new date))",new Date())
const[lang,setlang]=useState('Telugu')
const language=['Telugu','English','Hindi','Tamil','Korean','Hinglish','Malayalam']
console.log("screen.width",window.screen.width)
    return(<div>
    <div className="header-container" style={{backgroundColor:'gold'}}>
  {/* Left side: Image */}
  <div className="image-container">
    <img src={appImage} alt="App Logo" style={{ width: '500px' }} />
  </div>

  {/* Right side: Actions */}
  <div className="actions-container">
    <div className='container1'>
    {/* Search bar */}
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

    {/* Voice search */}
    <div className="voice-search">
      <button
        onClick={isListening ? stopListening : startListening}
        className="microphone-button"
        style={{width:'100px',height:'50px',border:'solid'}}
      >
        {isListening ? <FontAwesomeIcon icon={faStop} style={{ color: 'white', fontSize: '24px' }} /> : <FontAwesomeIcon icon={faMicrophone} style={{fontSize:"40px",color:'green'}}/>}
      </button>
      {/* Hidden Textarea for Transcription */}
      <textarea
        value={transcript}
        onChange={(e) => setTranscript(e.target.value)}
        rows="4"
        cols="50"
        style={{ display: "none" }}
      />
    </div>
    </div>

<div className="secondpart">
    {/* Sign-in or user info */}
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

    {/*Navigation */}
    {currentLocation && <h3 style={{height:'60px',margin:'8% 0'}}>{currentLocation}</h3>}
    <button className="openbtn" style={{height:'60px',margin:'8% 0',border:'solid'}} onClick={() => navigate('/navigation')}>Navigate</button>

    {/* Menu */}
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
    <div style={{backgroundColor:'black'}}>
{user && user.role === 'admin' && (
  <div className="admin-dashboard" >
    <button onClick={() => navigate('/moviedetails')}>Movies</button>
    <button onClick={() => navigate('/bookinghistory')}>Booking History</button>
    <button onClick={() => navigate('/listusers')}>Users</button>
    <button onClick={() => navigate('/castcrewdetails')}>Cast Crew</button>
    <button onClick={() => navigate('/timeplacedetails')}>Time Places</button>
    <button onClick={() => navigate('/allratings')}>Ratings</button>
  </div>
)}

{/* Languages */}
<div className="language-container" >
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
</div>


      {/* vip subscription*/}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
      {(user && user.vip=='no') || (!localStorage.getItem('token')) && <div>
        <img src={"https://res.cloudinary.com/dxrbuyd4b/image/upload/v1737658392/fchgv2fa1kg3u3qwrhfv.jpg"} alt="Uploaded" style={{ width: '300px' }} />
        <br/>
        <button style={{ marginLeft:'100px',backgroundColor:'black',color:'gold' }} onClick={()=>{if(!localStorage.getItem('token')){navigate('/login')}navigate('/pay',{state:{vippay:500}})}}>Subscribe</button>
        </div>}
        </div>
        
       {/* Footer */}
<footer>
  {/* Browse Here button */}
  <button
    className="footer-left-button"
    onClick={() => navigate('/browsehere', { state: { currentLocation } })}
  >
    Browse here
  </button>

  {/* Genre button */}
  <button className="footer-right-button" onClick={openNav}>
    ☰ Genre
  </button>

  {/* Sidepanel for Genre */}
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


        {/*Dispaly movies*/}
        {currentLocation!=null && <DisplayMovies currentLocation={currentLocation} genrefilter={genrefilter} lang={lang} searchMoviename={searchMoviename} />}
    </div>)
}