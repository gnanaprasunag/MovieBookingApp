import React, { useState, useEffect } from 'react';
import axios from '../config/axios';
import {useDispatch,useSelector  } from 'react-redux'; 
import { useNavigate } from 'react-router-dom';
import './displaymovies.css'


export default function Movies(props){
    const navigate=useNavigate()
    console.log("props",props)
    const { allmovies} = useSelector((state) => {
        return state.movieSlice
    })
console.log("allmovies in displaymovies",allmovies)
    console.log("props.currentLocation in displaymovies",props.currentLocation)
    const[filteredmovies,setfilteredmovies]=useState([])
    
    useEffect(()=>{
        if(allmovies!=null && props.currentLocation!=null){
            console.log("props.currentLocation in useeffect in displaymocies",props.currentLocation)
            console.log("allmovies in useeffect in displaymovies",allmovies)
let filter=allmovies.filter((ele)=>{
    return ele.city==props.currentLocation && ele.language==props.lang
})
setfilteredmovies(filter)
console.log("1")
    }
    },[props.currentLocation])

    useEffect(()=>{
        if(allmovies && props.searchMoviename.length>0){
let filter=allmovies.filter((ele)=>{
    console.log("props.searchMoviename in useeffect diaplaymovies",props.searchMoviename)
    console.log("props.searchMoviename in useeffect diaplaymovies length",props.searchMoviename.length)
    console.log("props.searchMoviename in useeffect diaplaymovies",ele.movie_name)
    console.log("props.searchMoviename in useeffect diaplaymovies includes of ",ele.movie_name.includes(props.searchMoviename))
    return ele.movie_name.toLowerCase().includes(props.searchMoviename.toLowerCase()) && ele.city==props.currentLocation
})
setfilteredmovies(filter)
console.log("2")

    }
    else{
        if(allmovies){
        let filter=allmovies.filter((ele)=>{
            return ele.city==props.currentLocation && ele.language==props.lang
        })
        setfilteredmovies(filter)
        console.log("2.1")
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
                console.log("3")
            }
            else{
                let filter=allmovies.filter((ele)=>{
                    return ele.genre.includes(props.genrefilter) && ele.city==props.currentLocation && ele.language==props.lang
                })
                setfilteredmovies(filter)
                console.log("3")
            }
        
    }
            },[props.genrefilter])

    useEffect(()=>{
        if(allmovies){
        let filter=allmovies.filter((ele)=>{
            return ele.language==props.lang && ele.city==props.currentLocation
        })
        setfilteredmovies(filter)
        console.log("4")
    }
            },[props.lang])


    console.log("filteredmovies",filteredmovies)
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
                {/*<p className="movie-info"><strong>Duration:</strong> {movie.movie_duration}</p>
                <p className="movie-info"><strong>Language:</strong> {movie.language}</p>
                <p className="movie-info"><strong>City:</strong> {movie.city}</p>
                <p className="movie-info"><strong>Animation:</strong> {movie.animation}</p>
                <p className="movie-info"><strong>Release Date:</strong> {new Date(movie.releaseDate).toLocaleDateString()}</p>
                <p className="movie-info"><strong>Genres:</strong> {movie.genre.join(', ')}</p>*/}
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