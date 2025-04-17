import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../config/axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import "./onbooktickets.css";

export default function App() {
  const { alltimeplaces,allbookinghistories} = useSelector((state) => state.movieSlice);
  const {user}=useSelector((state)=>state.user)
  const location = useLocation();
  const navigate = useNavigate();
  const { movie, currentLocation } = location.state || {};

  const [timeplaceFiltered, setTimeplaceFiltered] = useState(null);
  const [currentlat, setcurrentlat] = useState();
    const [currentlon, setcurrentlon] = useState()
    const [lat, setlat] = useState();
    const [lon, setlon] = useState()
    const[alllocations,setAlllocations]=useState([])
    const[a,setA]=useState()
    const [showModal, setShowModal] = useState(false);
    const Key = "pk.2a08003926a37954102c9d1cb3d3d94c";

    useEffect(()=>{
      
      
          navigator.geolocation.getCurrentPosition(function (position) {
              console.log("position.coords",position.coords)
              var lat = position.coords.latitude
              var lon = position.coords.longitude;
              setcurrentlat(lat)
              setcurrentlon(lon)
              
          })
          if(currentlon,currentlat,lat,lon){
          const url = `https://us1.locationiq.com/v1/directions/driving/${currentlon},${currentlat};${lon},${lat}?key=${Key}&overview=simplified&annotations=false`;
          console.log("url in location",url)    
          axios.get(url)
          .then((response)=>{
              const result = response.data;
              
              console.log("API Response:", result);
          
              if (result.routes && result.routes.length > 0) {
                const distanceInMeters = result.routes[0].distance;
                const distanceInKilometers = distanceInMeters / 1000;
          
                console.log("Distance in Kilometers:", distanceInKilometers);
                setA(distanceInKilometers);
              } else {
                console.error("No route found in API response.");
              }
          }
      )     
               .catch ((error)=> {
                console.error('Error fetching data: ', error);
              })
          
      }
      
      
  },[currentlon,currentlat,lon,lat])

  const click1=(address)=>{
  const url1 = `https://us1.locationiq.com/v1/search.php?key=${Key}&q=${address}&format=json`;
  console.log("url in location",url1)    
  axios.get(url1)
  .then((response)=>{
      const data = response.data;
if (data && data.length > 0) {
  const { lat, lon } = data[0]; // LocationIQ returns an array of possible matches

  console.log("Latitude:", lat, "Longitude:", lon);
  
  setlat(lat);
  setlon(lon);
} else {
  console.log("Location not found.");
}
  }
)     
       .catch ((error)=> {
        console.error('Error fetching data: ', error);
      })
    }
    const nav= () => {
      window.open(`https://www.google.com/maps?q=${lat},${lon}`, "_blank");
    };

  useEffect(() => {
    if (alltimeplaces) {
      let filter = alltimeplaces.filter((ele) => {
        return (
          ele.movie_name === movie.movie_name &&
          ele.language === movie.language &&
          ele.location.toLowerCase().includes(currentLocation.toLowerCase())
        );
      });
      setTimeplaceFiltered(filter);
    }
  }, [alltimeplaces, movie.movie_name, movie.language, currentLocation]);
  useEffect(()=>{
    if(allbookinghistories && user){
  const az=allbookinghistories.filter((ele)=>{
    if(ele.user_name==user.email){
      return ele.booked
    }
  })
  console.log("az in onbooktickets",az)
  let all=az[0].booked.map((el)=>{
      return el.location
    })
    setAlllocations(all)
    console.log("alllocations",alllocations)
}
  
},[])

  return (
    <div className="timeplace-container">
      <h2 className="page-title">Select Your Show</h2>
      {timeplaceFiltered && timeplaceFiltered.length > 0 ? (
        timeplaceFiltered.map((ele, index) => (
          <div key={index} className="timeplace-card">
            <h3 className="place-name">{ele.place}  <button style={{textSize:'100px',backgroundColor:'rgba(19, 14, 81, 0.648)',paddingLeft:'30px'}} onClick={() => {setShowModal(true)
              click1(ele.location)
            }}><FontAwesomeIcon icon={faMapMarkerAlt} style={{ color: "red", fontSize: "24px" }} /></button> {alllocations.includes(ele.location) && <span  className="visited">Visited</span>}</h3>
            <h4 className="location-name">{ele.location}</h4>
            
            
            <div className="time-buttons">
              {ele.time.map((el, idx) => (
                <button
                  key={idx}
                  className="time-button"
                  onClick={() =>
                    navigate("/onlocationclick", {
                      state: {
                        movie_name: movie.movie_name,
                        language: movie.language,
                        locationselected: ele.location,
                        placeselected: ele.place,
                        seats: el.seats,
                        time: el.time,
                      },
                    })
                  }
                >
                  {el.time}
                </button>
              ))}
            </div>
            {showModal && (
        <div className="modal fade show d-block" tabIndex="-1">
          <div className="modal-dialog modal-sm">
            <div className="modal-content">
              <div className="modal-body text-center">
                <p>{a && `Distance - ${a.toFixed(1)} km`}</p>

                {/* Extra Button Inside Modal */}
                <button className="btn btn-success mb-2" onClick={nav}>Directions</button>
              <br/>
                {/* Close Button */}
                <button className="btn btn-danger" onClick={() => setShowModal(false)}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Overlay (Backdrop) */}
      {showModal && <div className="modal-backdrop fade show" onClick={() => setShowModal(false)}></div>}
          </div>
        ))
      ) : (
        <p className="no-shows">No shows available at this location.</p>
      )}
    </div>
  );
}
