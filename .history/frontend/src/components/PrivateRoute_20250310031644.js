import { useNavigate } from 'react-router-dom'
export default function PrivateRoute(props) {
    let navigate=useNavigate()
    if(localStorage.getItem('token')) {
        return props.children 
    } else {
        return navigate("/login")
    }
}