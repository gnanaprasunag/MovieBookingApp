import { useState, useContext ,useEffect} from 'react' 
//import AuthContext from '../context/AuthContext'
import { handleLogin,handlemailcheck,handleServerErrors} from '../../components/regSlice'; 
import { useSelector,useDispatch } from 'react-redux'; 
//import { Navigate } from 'react-router-dom';
import axios from '../../config/axios';
import { useNavigate } from 'react-router-dom'

export default function Login(){
    //const { handleLogin} = useContext(AuthContext)
    const { user,error} = useSelector((state) => {
        return state.user
    })
    const tok=localStorage.getItem('token')

    
  const [new1, setNew1] = useState('');
  const [new2, setNew2] = useState('');
  const [messageMobile, setMessageMobile] = useState(null);
  const [changeNow, setMobileChangeNow] = useState(null);
    
  useEffect(()=>{
    if (messageMobile) {
      let input = window.prompt("Enter the code");//input type is string
    
      if( messageMobile){
        if (input == messageMobile) {
          setMobileChangeNow(true);
          setMessageMobile(null);
        }
      }
    }
  },[messageMobile])
    
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const dispatch=useDispatch()
    const navigate=useNavigate()


      const handlePassword = () => {
        if(email && email.includes('@')){
          
          dispatch(handlemailcheck({email}))
          .then((result) => {
            console.log("result on file",result)
            if (result.payload.user) {
              
              const message = Math.floor(Math.random() * 1000);
              console.log("mesage in while ail check",message)
              console.log("result.payload.user.mobile.slice(-10)",result.payload.user.mobile.slice(-10))
                  axios.post('/api/send-message', { number: result.payload.user.mobile, message })
                    .then(() => {
                      console.log("yes in afters end number")
                      setMessageMobile(message);
                      dispatch(handleServerErrors(null));
                    })
                    
              dispatch(handleServerErrors(null));
            } 
          })
          .catch(() => alert("An error occurred while logging in."));
          
        }
        else{
          console.log('enter your mail')
          dispatch(handleServerErrors(['enter your correct mail id']))
        }
      };
    
      const handleNew = () => {
        
        axios.put(`/api/users/password-change`, { email:email,password: new1 })
          .then(() => {
            
            dispatch(handleServerErrors(null));
            setMobileChangeNow(null);
          })
          .catch((err) => handleServerErrors(err));
        
      };

     

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = {
            email: email,
            password: password 
        }
        // runClientSideValidations() 
        // after client side validations pass
        console.log("formdata in login",formData)
        dispatch(handleLogin(formData))
        .then((result) => {
          console.log("result in login",result)
          if (result.payload.user) {
            dispatch(handleServerErrors(null))
            navigate(-1); // Navigate only on success
            
          } 
          
        })
        .catch((err) => handleServerErrors(err));
        
    }
    console.log("error in login",error)
    return (
        <div>
            {error!=null && <div className="server-errors" style={{display:'flex',flexDirection:'column',width:'20%',margin:'0 auto' ,borderRadius:'20px',alignItems:'center'}}>
            {error!=null &&<h2>Server errors</h2>}
            <ul>{error.map((ele,i)=>{
                return <li key={i}>{ele}</li>
            })}</ul>
            </div>}
            <h2 style={{marginLeft:'45%',marginBottom:'10px'}}>Login Page</h2>
            <form onSubmit={handleSubmit} className="form">
                <input 
                    type="text" 
                    placeholder='Enter email' 
                    value={email} 
                    required
                    style={{width:'30%',margin:'0 auto',border:'solid'}}
                    onChange={e => setEmail(e.target.value)} 
                /> <br />
                <input 
                    type="password" 
                    placeholder='Enter password' 
                    value={password} 
                    className="input"
                    style={{width:'30%',margin:'0 auto',border:'solid'}}
                    onChange={e => setPassword(e.target.value)} 
                /> <br /> 
                <input type="submit" style={{width:'10%',marginLeft:'45%',fontSize:'20px',backgroundColor: '#28a745',border:'solid',borderRadius:'10px',cursor:'pointer'}}/>
            </form>
            <button onClick={()=>{navigate('/register')}} style={{width:'10%',marginLeft:'45%',marginTop:'20px',fontSize:'20px',backgroundColor: '#28a745',border:'solid',borderRadius:'10px',cursor:'pointer'}} >Register</button>
            <button onClick={handlePassword } style={{width:'20%',marginLeft:'40%',marginTop:'20px',fontSize:'20px',color:'black',backgroundColor: 'skyblue',border:'solid',borderRadius:'10px',cursor:'pointer'}} >Change Password</button>

            <div>

            

            {changeNow==true && (
        <div className="password-change-box">
          <label>Enter New Password</label>
          <input type="password" value={new1} onChange={(e) => setNew1(e.target.value)} />
          <label>Re-enter New Password</label>
          <input type="password" value={new2} onChange={(e) => setNew2(e.target.value)} />
          {new1 === new2 ? (
            <button onClick={handleNew} className="submit-btn">Submit</button>
          ) : (
            <p className="error">Passwords do not match</p>
          )}
        </div>
      )}
            </div>
        </div>
    )
}