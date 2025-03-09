
import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [currentlat, setcurrentlat] = useState();
  const [currentlon, setcurrentlon] = useState()
  const [lat, settlat] = useState();
  const [lon, setlon] = useState()

  const[a,setA]=useState()
  useEffect(()=>{
    let user=window.confirm("This file wants to \n know your location")
    if(user){
        navigator.geolocation.getCurrentPosition(function (position) {
            var lat = position.coords.latitude
            var lon = position.coords.longitude;
            setcurrentlat(lat)
            setcurrentlon(lon)
            
        })
    }
    
},[])
  const calculateDistance = async () => {
    
    const Key = 'pk.2a08003926a37954102c9d1cb3d3d94c';
    const url = `https://us1.locationiq.com/v1/directions/driving/currentlatcurrentlat;lat,lon?key=pk.2a08003926a37954102c9d1cb3d3d94c&overview=simplified&annotations=false`;
console.log("url in location",url)
    try {
      const response = await axios.get(url);
      const result = response.data;
      console.log("response.data",response.data)
      console.log("response.data2",response.data.routes[0].distance)
      const distanceInMeters = result.routes[0].distance
      const distanceInkiloMeters = result.routes[0].distance/1000
      console.log("distanceInkiloMeters",distanceInkiloMeters)
      setA(distanceInkiloMeters);
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };

  return (
    <div>
      <h2>Distance Calculator</h2>
      <button onClick={calculateDistance}>Calculate Distance</button>
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