const authorizeUser = (permittedRoles) => {
    //execute some code
    return(req, res, next)=>{
        if(permittedRoles.includes(req.role)){
            next()
        }else{
            return res.status(403).json({errors:'you do not have access to this page'})
        }
    }
}
export default authorizeUser
