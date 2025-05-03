import { useState,useEffect } from "react"
import { Card,CardTitle,CardBody,CardText} from 'reactstrap';
import { useDispatch,useSelector } from 'react-redux';
export default function Genrefilter(){
    const genre=["Action", "Adventure", "Animation", "Comedy", "Crime", "Documentary", "Drama", "Family", "Fantasy", "Horror", "Musical", "Mystery",  "Sci-Fi", "Thriller"]
      const { allmovies} = useSelector((state) => {
        return state.movieSlice
    })
    console.log("all movies",allmovies)
    const dispatch=useDispatch()
    
    const[genrefilter,setgenrefilter]=useState([])
  
      const handleMovie=(value1,value2)=>{
        console.log("value1",value1)
        console.log("value2",value2)
      }
          /* Set the width of the sidebar to 250px (show it) */
const openNav=()=> {
    document.getElementById("mySidepanel").style.width = "250px";
  }
  
  /* Set the width of the sidebar to 0 (hide it) */
  const closeNav=()=>{
    document.getElementById("mySidepanel").style.width = "0";
  }
    const handleGenre=(value)=>{
        console.log("genre",value)
        let a=allmovies.filter((ele)=>{
          return ele.genre.includes(value)
        })
        setgenrefilter(a)
      }
    return(<div>
        <button className="openbtn" onClick={openNav}>&#9776; Genre</button>
          <div id="mySidepanel" className="sidepanel">
  <button className="closebtn" onClick={closeNav} >&times;</button>
  {genre.map((ele,i)=>{return <button onClick={()=>{handleGenre(ele)}} key={i}> 
      {ele}
   </button>})}
</div>
    </div>)
}

/* it works <Card
  style={{
    width: '18rem'
  }}
>
  <CardHeader>
    Genre
  </CardHeader>
  
  <ListGroup flush>
    {genre.map((ele)=>{return <button onClick={()=>{handleGenre(ele)}}> <ListGroupItem>
      {ele}
    </ListGroupItem></button>})}
  </ListGroup>
</Card>*/