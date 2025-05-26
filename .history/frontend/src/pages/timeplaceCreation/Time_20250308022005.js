import { useState ,useEffect} from "react";
export default function Time(prop){
const[time,setTime]=useState()
const[timeseats,setTimeseats]=useState([])

console.log("tise",timeseats)
useEffect(()=>{
  prop.handleTimeseats(timeseats)
  
},[timeseats])

    const handleSubmit=(e)=>{
        e.preventDefault()
        
        let formData={time,seats}
        console.log("formData",formData)
        let a=[...timeseats]
        a.push(formData)
        console.log("a",a)
        setTimeseats(a)
        setTime('')
    }
    let seats = [];
  for (let i = 1; i <= 100; i++) {
    seats.push({ seatNumber: `S${i}`, isBooked: false });
  }
  console.log("seats",seats)
    return (<div>
      <h2>Time-Seats</h2>
        <form onSubmit={handleSubmit}>
        <div>
          <label>Time:</label>
          <input type="text" name="Time" value={time} onChange={(e)=>{setTime(e.target.value)}} required />
        </div>
        <button type="submit">Add Timeseats</button>
        </form>
    </div>)
}