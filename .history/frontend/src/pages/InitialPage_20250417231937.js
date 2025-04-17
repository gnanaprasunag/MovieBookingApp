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
    <img src={appImage} alt="App Logo" style={{ width: '400px',backgroundSize:'cover' }} />
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