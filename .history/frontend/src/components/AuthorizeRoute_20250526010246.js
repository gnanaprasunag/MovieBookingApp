import { Navigate } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'; 
export default function AuthorizeRoute(props) {
    console.log("props in authorize",props)
    const { user} = useSelector((state) => {
        return state.user
    })
    if(!user) {
        return <p>loading...</p>
    }
    if(props.roles.includes(user.role)) {
        return props.children 
    } else {
        return <Navigate to="/forbidden" />
    }
}