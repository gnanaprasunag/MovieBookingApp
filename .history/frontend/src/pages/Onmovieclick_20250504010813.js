import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import "./onmovieclick.css";

export default function Onmovieclick() {
  const { user } = useSelector((state) => state.user);
  const { allmovies, allcastcrews ,allratings} = useSelector((state) => state.movieSlice);
  console.log("allratings in onmovieclick",allratings)

  const location = useLocation();
  const navigate = useNavigate();
  const { movie, currentLocation } = location.state || {};

  const [castcrew, setCastcrew] = useState(null);
  const[rated,setrated]=useState(false)
  const [rating,setrating]=useState(0)
  const[count,setcount]=useState(0)
  const[ratingcount,setratingcount]=useState(0)

console.log("test1")
  useEffect(() => {
    if (allcastcrews) {
      let arr = allcastcrews.filter((ele) => {
        if (movie && ele.movie_name === movie.movie_name) {
          setCastcrew(ele);
        }
      });
      console.log("arr", arr);
    }
  }, [allmovies]);

  useEffect(()=>{
    if(allratings&& allratings.length>0 && movie){
      let ratingcount=0
            let count=0
    allratings.map((ele)=>{
        if(ele.movie_name==movie.movie_name){
            ratingcount=ratingcount+ele.rating
            count=count+1
            }
    })
    setratingcount(ratingcount)
    setcount(count)
    
      allratings.filter((ele)=>{
      if(user && movie && ele.movie_name==movie.movie_name && ele.user_name==user.email){
        console.log("1")
setrated(true)
setrating(ele.rating)
      }
    })
  }
  },[allratings])
  

  return (
    <div style={{ background: 'linear-gradient(45deg, #ff6ec4, #7873f5)',}} className="movie-details-container">
      {/* Video and Movie Info Section */}
      <div className="video-container">
        {movie && (
          <video width="600" height="400" controls>
            <source src={movie.trailer} />
            Your browser does not support the video tag.
          </video>
        )}

        {movie && (
          <div className="movie-info" style={{border:"none"}}>
            <h2 style={{color:'white'}}>{movie.movie_name}</h2>
            <div style={{fontFamily:'cursive',color: "red"}}>
              <button  onClick={()=>{user ? navigate('/ratings',{state:{movie:movie}}) : navigate('/login')}}>&#11088;</button>
              {count>0 && <h2 style={{margin:"auto auto"}}>{Math.ceil(ratingcount/count)+ "/"+count }</h2>}
              {rated==false ? <button onClick={()=>{user ? navigate('/ratingdetails',{state:{movie:movie, currentLocation}}) : navigate('/login')}}>Rate</button> : <h2 style={{fontSize:'25px',padding:'0px',margin:'auto auto'}}>Your rating:<span style={{color:'black'}}>{rating}/5</span></h2>}
            </div>
            <h4>
              {movie.language} | {movie.certificate}
            </h4>
            <h4>{movie.genre.join(",")}</h4>
            <h4>{movie.releaseDate.split("T")[0]}</h4>
          </div>
        )}
      </div>
        
      <div style={{fontSize:'20px',color:'white',fontFamily:'cursive'}}>{movie.description}</div>
      {/* Cast Section */}
      <div className="cast-crew-section">
        <label className="cast-crew-label">Cast</label>
        <div className="cast-crew-container">
          {castcrew &&
            castcrew["cast"].map((e, i) => (
              <div key={i} className="cast-crew-card">
                <img src={e.casturl} alt={e.castName} />
                <h3 style={{color:'white'}}>{e.castName}</h3>
              </div>
            ))}
        </div>

        {/* Crew Section */}
        <label className="cast-crew-label">Crew</label>
        <div className="cast-crew-container">
          {castcrew &&
            castcrew["crew"].map((e, i) => (
              <div key={i} className="cast-crew-card">
                <img src={e.crewurl} alt={e.crewName} />
                <h3 style={{color:'white'}}>{e.crewName}</h3>
              </div>
            ))}
        </div>
      </div>

      {/* Book Tickets Button */}
      <button
        className="book-tickets-button"
        onClick={() =>{
          navigate("/onbooktickets", {
            state: { movie: movie, currentLocation: currentLocation },
          }) }
        }
      >
        Book Tickets
      </button>
    </div>
  );
}