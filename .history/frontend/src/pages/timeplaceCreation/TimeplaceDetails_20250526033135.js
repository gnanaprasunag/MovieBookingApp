import { useState, useEffect } from 'react';
import axios from '../../config/axios';
import Time from './Time'
import { useDispatch,useSelector } from 'react-redux';
import {timeplaceAfterRemove,reloadTimeplaces} from '../../components/movieSlice'; 

export default function Castcrew(){

    const { alltimeplaces} = useSelector((state) => {
        return state.movieSlice
    })
    
    const dispatch=useDispatch()
    
    const[time,setTime]=useState()
    const[movie_name,setMovie_name]=useState('')
    const[language,setLanguage]=useState('')
    const[place,setPlace]=useState('')
    const[location,setLocation]=useState('')
    const[animation,setAnimation]=useState('')
    const[cancellation,setCancellation]=useState('')

    
  const handleTimeseats=(value)=>{
    setTime(value)
  }
      
    const handleRemove=async(movieId)=>{
      try{
        const confirm=window.confirm("Are you sure")
      if(confirm){
          const response=await axios.delete(`/api/timeplace/${movieId}`,{ headers: { 'Authorization': localStorage.getItem('token')}})
          const newArr=alltimeplaces.filter((ele)=>{
              return ele._id!=response.data._id
              
          })
          dispatch(timeplaceAfterRemove(newArr))
        }
      }
      catch(err){
        console.log("err server",err)
      }
    }

      const handleSubmit=(e) => {
        e.preventDefault();
        const timeplaceData = {
            movie_name: movie_name,
            language:language,
            time:time,
            place:place,
            location:location,
            animation:animation,
            cancellation:cancellation
        };
       
        axios.post('/api/timeplace',timeplaceData
          )
          .then(response => {
            
            dispatch(reloadTimeplaces())
            setMovie_name('')
            setLanguage('')
            setPlace('')
            setLocation('')
            setAnimation('')
            setCancellation('')
            
          })
          .catch(error => console.error('Error adding movie:', error));
        
      };
      return(<div>
        <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input type="text" name="movie_name" value={movie_name} onChange={(e)=>{setMovie_name(e.target.value)}} required />
        </div>
        <div>
          <label>Language:</label>
          <input type="text" name="language" value={language} onChange={(e)=>{setLanguage(e.target.value)}} required />
        </div>
        <div>
          <label>Animation:</label>
          <input type="text" name="animation" value={animation} onChange={(e)=>{setAnimation(e.target.value)}} required />
        </div>
        <div>
          <label>Cancellation</label>
          <input type="text" name="cancellation" value={cancellation} onChange={(e)=>{setCancellation(e.target.value)}} required />
        </div>
        <div>
          <label>Place:</label>
          <input type="text" name="place" value={place} onChange={(e)=>{setPlace(e.target.value)}} required />
        </div>
        <div>
          <label>Location:</label>
          <input type="text" name="location" value={location} onChange={(e)=>{setLocation(e.target.value)}} required />
        </div>
        <button type="submit" className="submit-btn" style={{marginTop:'10px'}}>Add Timeplace</button>
        </form>
        <br/>
        <Time handleTimeseats={handleTimeseats}/>
        <br/>
        
        <h2 style={{margin:'0 auto',fontSize:'bold'}}>TIME PLACE</h2>
      
        {alltimeplaces && alltimeplaces.map((ele,index)=>{
            return (<div key={index} className="timeplace-card" style={{margin: '0 auto'}}>
               <h2 className="place-name">{ele.movie_name}</h2>
               <p className="location-name">{ele.language}</p>
               <p className="location-name">{ele.place}</p>
               <p className="location-name">{ele.location}</p>
               <div className="time-buttons">
              {ele.time.map((e, i) => {
                return <div>
                  <button className="time-button">{e.time}</button>
                </div>
        })}
            </div>
            <button
                  className="remove-btn"
                  onClick={()=>{handleRemove(ele._id)}}
                >
                  remove
                </button>

            </div>)
        })}
        
      </div>)
}