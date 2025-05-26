import { useState} from 'react';
import CastImage from './ImageUpload'

export default function App(prop){
const[castName,setCastName]=useState('')
const[castRole,setCastRole]=useState('')
const[crewName,setCrewName]=useState('')
const[crewPosition,setCrewPosition]=useState('')

const [cast, setCast] = useState([]);
const [crew, setCrew] = useState([]);

const[casturl,setCasturl]=useState("")
const[crewurl,setCrewurl]=useState("")


const handleCastUrl=(value)=>{
  setCasturl(value)
}
const handleCrewUrl=(value)=>{
  setCrewurl(value)
}

const handleCast=(e)=>{
    e.preventDefault()
    let formData={castName,castRole,casturl}
    let a=[...cast]
    a.push(formData)
    setCast(a)
    prop.handleCast(a)
    setCastName('')
    setCastRole('')
    setCasturl('')
}
const handleCrew=(e)=>{
    e.preventDefault()
    let a={crewName,crewPosition,crewurl}
    let b=[...crew]
    b.push(a)
    setCrew(b)
    prop.handleCrew(b)
    setCrewName('')
    setCrewPosition('')
    setCrewurl('')
}

        return(
        <div>
          <h1>CAST</h1>
          <CastImage handleCastUrl={handleCastUrl}/>
            <form onSubmit={handleCast}>
        <div>
          <label>Cast Name:</label>
          <input type="text" name="castName" value={castName} onChange={(e)=>{setCastName(e.target.value)}} required />
        </div>
        <div>
          <label>Cast Role:</label>
          <input type="text" name="castRole" value={castRole} onChange={(e)=>{setCastRole(e.target.value)}} required />
        </div>
        <input type="submit"/>
        <hr/>
        </form>
        <h1>CREW</h1>
        <CastImage handleCrewUrl={handleCrewUrl}/>
        <form onSubmit={handleCrew}>
        <div>
          <label>Crew Name:</label>
          <input type="text" name="crewName" value={crewName} onChange={(e)=>{setCrewName(e.target.value)}} required />
        </div>
        <div>
          <label>Crew Position:</label>
          <input type="text" name="crewPosition" value={crewPosition} onChange={(e)=>{setCrewPosition(e.target.value)}} required />
        </div>
        <input type="submit"/>
        <hr/>
        </form>
        
       {cast && cast.map((ele,i)=>{return (<div key={i}>
            <h1>{JSON.stringify(ele)}</h1>
            <h3>{ele.castName}</h3>
            <h3>{ele.castRole}</h3>
            </div>)
        })}
        
        {crew && crew.map((ele,i)=>{return (<div key={i}>
            <h1>{JSON.stringify(ele)}</h1>
            <h3>{ele.crewName}</h3>
            <h3>{ele.crewPosition}</h3>
            </div>)
        })}
        </div>
        )
        
}