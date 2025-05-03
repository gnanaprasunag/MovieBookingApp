import React, { useState, useEffect } from 'react';
import {useSelector  } from 'react-redux'; 
import { useNavigate } from 'react-router-dom';
import './displaymovies.css'

export default function Movies(props){
    const navigate=useNavigate()
    console.log("props",props)
    const { allmovies} = useSelector((state) => {
        return state.movieSlice
    })
    const[filteredmovies,setfilteredmovies]=useState([])
    
    useEffect(()=>{
        if(allmovies!=null && props.currentLocation!=null){
let filter=allmovies.filter((ele)=>{
    return ele.city==props.currentLocation && ele.language==props.lang
})
setfilteredmovies(filter)
    }
    },[props.currentLocation])

    useEffect(()=>{
        if(allmovies && props.searchMoviename.length>0){
let filter=allmovies.filter((ele)=>{
    return ele.movie_name.toLowerCase().includes(props.searchMoviename.toLowerCase()) && ele.city==props.currentLocation
})
setfilteredmovies(filter)
    }
    else{
        if(allmovies){
        let filter=allmovies.filter((ele)=>{
            return ele.city==props.currentLocation && ele.language==props.lang
        })
        setfilteredmovies(filter)
    }
    }
    },[props.searchMoviename])

    useEffect(()=>{
        if(allmovies){
            if(props.genrefilter=="All"){
                let filter=allmovies.filter((ele)=>{
                    return ele.city==props.currentLocation && ele.language==props.lang
                })
                setfilteredmovies(filter)
            }
            else{
                let filter=allmovies.filter((ele)=>{
                    return ele.genre.includes(props.genrefilter) && ele.city==props.currentLocation && ele.language==props.lang
                })
                setfilteredmovies(filter)
            }}
            },[props.genrefilter])

    useEffect(()=>{
        if(allmovies){
        let filter=allmovies.filter((ele)=>{
            return ele.language==props.lang && ele.city==props.currentLocation
        })
        setfilteredmovies(filter)
    }
            },[props.lang])

    return(<div className="movies-container"  style={{backgroundColor:'#88caf2'}}>
        {filteredmovies && filteredmovies.length>0  ?
          filteredmovies.map((movie) => (
            <div key={movie._id} className="movie-card">
              {/* Movie Image */}
              {movie.movie_image && (
                <div className="movie-image">
                  <img src={movie.movie_image} alt={movie.movie_name} />
                </div>
              )}
      
              {/* Movie Details */}
              <div className="movie-details">
                <h3 className="movie-title" >{movie.movie_name}</h3>
                <button
                  className="movie-button"
                  onClick={() => {
                    navigate('/onmovieclick', {
                      state: { movie: movie, currentLocation: props.currentLocation },
                    });
                  }}
                >
                  View Details
                </button>
              </div>
            </div>
          )) : <div className="nomovie">"No movies found"</div>}
      </div>
      )
}