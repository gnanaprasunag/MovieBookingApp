//import './Date.css';
import React, { useState,useEffect } from 'react';

export default function DateDisplay(){
    const day=['SUN','MON','TUE','WED','THUR','FRI','SAT']
    const all=[]
    let a=new Date()
    console.log("a in datedsplay",a)
    all.push(a)
    const [clickedIndex, setClickedIndex] = useState(0); // Use state to track clicked element

    for(let i=0;i<6;i++){
        if((a.getDate()==31 && a.getMonth()==0)||(a.getDate()==29 && a.getMonth()==1)||(a.getDate()==31 && a.getMonth()==2)||
            (a.getDate()==30 && a.getMonth()==3)||(a.getDate()==31 && a.getMonth()==4)||(a.getDate()==30 && a.getMonth()==5)||
            (a.getDate()==31 && a.getMonth()==6)||(a.getDate()==31 && a.getMonth()==7)||(a.getDate()==30 && a.getMonth()==8)||
            (a.getDate()==31 && a.getMonth()==9)||(a.getDate()==30 && a.getMonth()==10)||(a.getDate()==31 && a.getMonth()==11)
        ){
            a=new Date(a.getFullYear(),a.getMonth()+1,1)
            all.push(a)
        }
        else{
            a=new Date(a.getFullYear(),a.getMonth(),a.getDate()+1)
            all.push(a)
        } 
        
    }
    console.log("al in datedislay",all)
    const handleClick = (index) => {
        console.log("index in date dislay",index)
        setClickedIndex(index)
        localStorage.setItem("index",index)
    };
    console.log("all in date display",all)
    return(<div className="layout"> 
        {all.map((ele ,i)=>{ 
              return <div key={i}  className={i === clickedIndex ? "myStyle" : "myStyle1"}  onClick={() => handleClick(ele)}> 
            <h3>{day[ele.getDay()]}</h3>
            <h3>{String(ele.getDate())}</h3>
            <h3>{ele.toLocaleString('default', { month: 'short' })}</h3>
            </div>
        })
}</div>)}
