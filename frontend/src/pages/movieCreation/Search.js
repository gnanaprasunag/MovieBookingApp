import {useState,useEffect} from 'react'
import {useSelector  } from 'react-redux'; 

export default function App(){
    const[search,setSearch]=useState('')
    const [result,setResult]=useState(null)
    const { allmovies} = useSelector((state) => {
        return state.movieSlice
    })
  
    console.log("search",search)
    //  console.log("res",res)
    console.log("type res",typeof res)
    useEffect(()=>{
        if(search.length>0){
        let a=allmovies.filter((ele)=>{
        return ele.movie_name.toLowerCase().includes(search.toLowerCase()) 
            
         })
         console.log("a",a)
         setResult(a)}
         else if(search.length==0){
            setResult(null)
         }
    },[search])
    
    return(<div>
        <input type="text" value={search} onChange={(e)=>{setSearch(e.target.value)}} name="search" placeholder="Search.."/>&#128269; 
        {result && JSON.stringify(result)}
        </div>)
}