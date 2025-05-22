import React, { useState,useEffect } from 'react';
import './register.css';
import { handleEditProfile,handleRegister,handleServerErrors,handleEditId } from '../../components/regSlice'; 
import { useSelector, useDispatch } from 'react-redux'; 
import { useNavigate } from 'react-router-dom'


export default function Register() {

    const { user,error,editId} = useSelector((state) => {
        return state.user
    })

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [reenterPassword, setReenterPassword] = useState('');
    const [mobile, setMobile] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [birthday, setBirthday] = useState('');
    const [anniversary, setAnniversary] = useState('');
    const registerErrors={}
    const [clientErrors, setclientErrors] = useState(null);

    const dispatch=useDispatch()
    const navigate=useNavigate()

    useEffect(()=>{
        if(editId){
            setFirstname(user.firstname)
            setLastname(user.lastname)
            const dateOnly = user.birthday.split('T')[0];
            console.log("dateOnly",dateOnly);
            setBirthday(dateOnly)
            const dateOnly1 = user.anniversary.split('T')[0];
            console.log("dateOnly1",dateOnly1);
            setAnniversary(dateOnly1)
        }
        
    },[editId])
    
    
        const runRegisterClientValidation = () => {
            if(email.trim().length == 0) {
                registerErrors.email = 'email cannot be empty'
            }
            if(String(mobile).trim().length == 0) {
                registerErrors.mobile = 'mobile cannot be empty'
            } else if(mobile.length> 10 ) {
                registerErrors.mobile = 'mobile should be  equal to 10'
            } 
            if(password.trim().length == 0) {
                registerErrors.password = 'password cannot be empty'
            }  
            if(reenterPassword.trim().length == 0) {
                registerErrors.reenterPassword = 're enter password cannot be empty'
            }  
            if(firstname.trim().length == 0) {
                registerErrors.firstname = 'firstname cannot be empty'
            } 
            if(birthday=='') {
                registerErrors.birthday = 'enter birthdate'
            }  
            if(new Date(birthday)>new Date()) {
                registerErrors.birthdaygreater = 'enter correct birthdate'
            }  
            if(anniversary=='') {
                registerErrors.anniversary = 'enteranniversary'
            } 
            if(new Date(anniversary)>new Date()) {
                registerErrors.anniversarygreater = 'enter correct anniversary date'
            }  
            if (password !== reenterPassword){
                registerErrors.passwordmatch = 'password did not match'
            }
        }
    
    
    
        const handleSubmit=(e)=>{
            e.preventDefault()
             let formData={
                email:email,
                mobile:`+91${mobile}`,
                password:password,
                firstname:firstname,
                lastname:lastname,
                birthday:birthday,
                anniversary:anniversary,
            }
        if(!editId){
            runRegisterClientValidation()
        }
    
            console.log("formdata",formData)
            //after client sde validation passed
            if(Object.keys(registerErrors).length == 0) {
                if(editId){
                    console.log("if editid in handlesubmit")
                    dispatch(handleEditProfile({editId,formData}))
                    console.log("if editid in handlesubmit after dispatch",formData)
                    dispatch(handleEditId(null))
                    setFirstname('')
            setLastname('')
            setBirthday('')
            setAnniversary('')
            setMobile('')
            setEmail('')
            setPassword('')
            setReenterPassword('')
            dispatch(handleServerErrors(null))
            navigate(-1)
                    //navigate('/profile')
                    
                }
                
               else{
            dispatch(handleRegister(formData))
            .then((result)=>{
                console.log("result inregister",result)
                if(result.payload.user){
                    
                    console.log("after register")
                    setclientErrors({})
                    dispatch(handleServerErrors(null))
                    navigate('/login')
                }
                
            })
            .catch((err)=>{
                dispatch(handleServerErrors(err))
            })
            
        }}
            
            else {
                console.log("in else client errors")
                setclientErrors(registerErrors)
            }
        }
       

console.log("email",email)
    return (
        <div className="container">
            {error!=null && <div className="server-errors" style={{display:'flex',flexDirection:'column',width:'20%',margin:'0 auto' ,borderRadius:'20px',alignItems:'center'}}>
            {error!=null &&<h2>Server errors</h2>}
            <ul>{error.map((ele,i)=>{
                return <li key={i}>{ele}</li>
            })}</ul>
            </div>}
            <form className="form" onSubmit={handleSubmit} autocomplete="on">
                {!editId && 
                <div>
                <label className="label">Email</label>
                <input className="input" type="email" value={email} onChange={(e) =>setEmail(e.target.value)} />
                {!editId && clientErrors && clientErrors.email && <span className="error">{clientErrors.email}</span>}

                <label className="label">Password</label>
                <input className="input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                {!editId && clientErrors&& clientErrors.password && <span className="error">{clientErrors.password}</span>}

                <label className="label">Re-enter Password</label>
                <input className="input" type="password" value={reenterPassword} onChange={(e) => setReenterPassword(e.target.value)} />
                {!editId && clientErrors && clientErrors.reenterPassword && <span className="error">{clientErrors.reenterPassword}</span>}
                {!editId && clientErrors && clientErrors.passwordmatch && <span className="error">{clientErrors.passwordmatch}</span>}

                <label className="label">Mobile</label>
                <input className="input" type="number" value={mobile} onChange={(e) => setMobile(e.target.value)} />
                {!editId && clientErrors && clientErrors.mobile && <span className="error">{clientErrors.mobile}</span>}
                </div>
                }

                <label className="label">First Name</label>
                <input className="input" type="text" value={firstname} onChange={(e) => setFirstname(e.target.value)} />
                {clientErrors && clientErrors.firstname && <span className="error">{clientErrors.firstname}</span>}

                <label className="label">Last Name</label>
                <input className="input" type="text" value={lastname} onChange={(e) => setLastname(e.target.value)} />
                

                <label className="label">Birthday</label>
                <input className="input" type="date" value={birthday} onChange={(e) => setBirthday(e.target.value)} />
                {clientErrors && clientErrors.birthday && <span className="error">{clientErrors.birthday}</span>}
                {clientErrors && clientErrors.birthdaygreater && <span className="error">{clientErrors.birthdaygreater}</span>}

                <label className="label">Anniversary</label>
                <input className="input" type="date" value={anniversary} onChange={(e) => setAnniversary(e.target.value)} />
                {clientErrors && clientErrors.anniversary && <span className="error">{clientErrors.anniversary}</span>}
                {clientErrors && clientErrors.anniversarygreater && <span className="error">{clientErrors.anniversarygreater}</span>}

                {!editId ? <input className="submit" type="submit" value="Register" /> : <input className="submit" type="submit" value="Edit" />}
            </form>
        </div>
    );
}
