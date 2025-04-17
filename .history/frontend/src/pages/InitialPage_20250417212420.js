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
    let appImage="https://res.cloudinary.com/dxrbuyd4b/image/upload/v1737347669/oirr91odqlxcvfmy6vtr.png"
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
    return(<div style={{backgroundSize:'contain',backgroundImage: `url('data:image/jpeg;base64,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')`}}>
    <div className="header-container" >
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