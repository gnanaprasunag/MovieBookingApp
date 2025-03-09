
import React, { useState ,useEffect} from 'react';
import axios from 'axios';

const App = () => {
  const [currentlat, setcurrentlat] = useState();
  const [currentlon, setcurrentlon] = useState()
  const [lat, setlat] = useState();
  const [lon, setlon] = useState()
console.log("currentlat,currentlon,lat,lon",currentlat,currentlon,lat,lon)
  const[a,setA]=useState()
  console.log("a in distanceblocation",a)
  useEffect(()=>{
    let user=window.confirm("This file wants to \n know your location")
    if(user){
        navigator.geolocation.getCurrentPosition(function (position) {
            console.log("position.coords",position.coords)
            var lat = position.coords.latitude
            var lon = position.coords.longitude;
            setcurrentlat(lat)
            setcurrentlon(lon)
            
        })

    }
    
    
},[])
const getCoordinates = async () => {
    const Key = "pk.2a08003926a37954102c9d1cb3d3d94c"; // Replace with your LocationIQ API key
    const address = "No. 34/1, East Coast Road, Kanathur, Near Toll Plaza, Chennai, Tamil Nadu 603112, India";
  
    // LocationIQ Forward Geocoding API
    const url = `https://us1.locationiq.com/v1/search.php?key=${Key}&q=${address}&format=json`;
  
    console.log("URL in useEffect:", url);
  
    try {
      const response = await fetch(url);
      const data = await response.json();
  
      if (data && data.length > 0) {
        const { lat, lon } = data[0]; // LocationIQ returns an array of possible matches
  
        console.log("Latitude:", lat, "Longitude:", lon);
        
        setlat(lat);
        setlon(lon);
      } else {
        console.log("Location not found.");
      }
    } catch (err) {
      console.log("Error fetching data:", err);
    }
  };
  

  const calculateDistance = async () => {
    
    const Key = 'pk.2a08003926a37954102c9d1cb3d3d94c';
    
    const url = `https://us1.locationiq.com/v1/directions/driving/${currentlon},${currentlat};${lon},${lat}?key=${Key}&overview=simplified&annotations=false`;
console.log("url in location",url)
    try {
        const response = await axios.get(url);
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
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };

  return (
    <div>
      <h2>Distance Calculator</h2>
      <button onClick={getCoordinates}>Calculate Distance</button>
      <button onClick={calculateDistance }>Calculate now Distance</button>
      
      {a && <p>Distance: {a} km</p>}
    </div>
  );
};

export default App
/***15***/
/*import axios from "axios"
import{useState,useEffect} from "react"
export default function App(){
    const[users,setUsers]=useState([])
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const[posts,setPosts]=useState(null)
    useEffect(()=>{
        let user=window.confirm("This file wants to \n know your location")
        if(user){
            navigator.geolocation.getCurrentPosition(function (position) {
                var lat = position.coords.latitude
                var lon = position.coords.longitude;
                console.log([...users,lat,lon])
                setLatitude(lat)
                setLongitude(lon)
                setUsers([...users,lat,lon])
            })
        }
        
    },[])
    let handleChange=()=>{
        const Key = 'pk.2a08003926a37954102c9d1cb3d3d94c';
        axios.get(`https://us1.locationiq.com/v1/reverse.php?key=${Key}&lat=${latitude}&lon=${longitude}&format=json`)
        .then((res)=>{
            console.log(res)
            let data=res.data.address.
            state_district            
            console.log(data)
            setPosts(data)
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    
    return(
        <div>
            <h2>Geo location</h2>
            <hr />
           
            {users.length>0 && (<div>
                <h2>latitude-{users[0]}</h2>
                <h2>longitude-{users[1]}</h2>
            </div>)}
            {posts && <h2>city-{posts}</h2>}
            <button onClick={handleChange}>Get Location</button>
        </div>
    )
}
*/

//lat-12.9496044, lon-80.2404658385833