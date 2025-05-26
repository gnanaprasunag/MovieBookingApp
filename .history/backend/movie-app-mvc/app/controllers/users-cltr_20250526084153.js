import User from '../models/user-model.js' 
import { validationResult } from 'express-validator'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

const usersCltr = {}
usersCltr.register = async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    //extract only the fields required
    const {email,password,birthday,firstname,lastname,mobile,anniversary}= req.body 
    try {

        const user = new User({email,password,birthday,firstname,lastname,mobile,anniversary}) 
        const usersCount=await User.countDocuments()
        try{
        if(usersCount==0){
            user.role='admin'
        }
        }
        catch(err){
            console.log("error",err)
        }
        const salt = await bcryptjs.genSalt() //29 characters
        const hash = await bcryptjs.hash(user.password, salt)
        user.password = hash 
        await user.save()
        res.status(201).json({user})
    } catch(err) {
        res.status(500).json({ error: "something went wrong"})
    }
}

usersCltr.login = async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array()})
    }
    const { email, password } = req.body
    console.log("iin login user",req.body)
    try {   
        const user = await User.findOne({ email })
        if(!user) {
            console.log("no such mail in login")
            return res.status(404).json({ error: 'invalid email'})
        }
        
        console.log("password inlogin user",password)
        console.log("user in login",user)
        console.log("password inlogin uer.user",user.password)
        const isValid  =await bcryptjs.compare(password, user.password)
        console.log("isvalid in login",isValid)
        if(!isValid) {
            console.log("password not valid in login")
            return res.status(404).json({ error: 'invalid password '})
        }
        console.log("login 1")
        const tokenData = { userId: user._id,role:user.role }//add role in the token data
        const token = jwt.sign(tokenData, process.env.JWT_SECRET )//{ expiresIn: '7d'}
        console.log("login 2")
        return res.json({ user:user,token })
    } catch(err) {
        res.status(500).json({ error: "something went wrong"})
    }
}

usersCltr.onlyemailcheck = async (req, res) => {
    const { email} = req.body
    try {   
        const user = await User.findOne({ email: email })
        if(!user) {
            return res.status(404).json({ error: 'invalid email'})
        }
        return res.json({ user:user })
    } catch(err) { 
        res.status(500).json({ error: "something went wrong"})
    }
}

usersCltr.account = async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        console.log("errors, in ogin",errors.array())
        return res.status(400).json({ errors: errors.array()})
    }
    try  {
        const user = await User.findById(req.userId) 
        return res.json(user)
    } catch(err) {
        res.status(500).json({ error: "something went wrong"})
    }
}
usersCltr.listUsers=async (req, res) =>{
    try{
        const users=await User.find()
        res.json(users)
    }
    catch(err){
        res.status(500).json({error:"something went wrong"})
    }
}
usersCltr.destroy=async (req, res) =>{
    try{
        const id=req.params.id
        if(id==req.userId){
            res.status(400).json({error:'you cannot delete your own account'})
        }
        const user=await User.findByIdAndDelete(id)
        res.json(user)
    }
    catch(err){
        res.status(500).json({error:'something went wrong'})
    }
}
usersCltr.changeRole=async (req, res) =>{
    try{
        const id=req.params.id
        const {role}= req.body 
        if(id==req.userId){
            return res.status(400).json({error:'you cannot change role of your own account'})
        }
        const user=await User.findByIdAndUpdate(id,{role},{new:true})
        res.json(user)
    }
    catch(err){
        res.status(500).json({error:'something went wrong'})
    }
    
}

usersCltr.changeEmail=async (req, res) =>{
    try{
        const id=req.params.id
        const {email}= req.body 
        console.log("email",email)
        const errors = validationResult(req)
        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        const user=await User.findByIdAndUpdate(id,{email},{new:true})
        res.json(user)
    }
    catch(err){
        res.status(500).json({error:'something went wrong'})
    }
    
}

usersCltr.changeMobile=async (req, res) =>{
    try{
        const id=req.params.id
        const {mobile}= req.body 
        const errors = validationResult(req)
        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        const user=await User.findByIdAndUpdate(id,{mobile},{new:true})
        res.json(user)
    }
    catch(err){
        res.status(500).json({error:'something went wrong'})
    }
    
}

usersCltr.changeProfile=async (req, res) =>{
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    try{
        const id=req.params.id
        const {birthday,firstname,lastname,anniversary}=req.body
        const user=await User.findByIdAndUpdate(id,{birthday,firstname,lastname,anniversary},{new:true})
        res.json(user)
    }
    catch(err){
        res.status(500).json({error:'something went wrong'})
    }
    
}


usersCltr.passwordchangeCheck = async (req, res) => {
    const { email} = req.body
    try {   
        const user=await User.findOne({email:email})
        if(!user) {
            return res.status(404).json({ error: 'invalid email  '})
        }
        
        return res.json({ succ:'found' })
    } catch(err) {
        res.status(500).json({ error: "something went wrong"})
    }
}

usersCltr.passwordCheck = async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const {  password } = req.body
    const id=req.params.id
    try {   
        const user=await User.findById(id)
        if(!user) {
            return res.status(404).json({ error: 'invalid  password '})
        }
        const isValid  = await bcryptjs.compare(password, user.password)
        if(!isValid) {
            return res.status(404).json({ error: 'invalid password '})
        }
       
        return res.json("matched password")
    } catch(err) {
        res.status(500).json({ error: "something went wrong"})
    }
}

usersCltr.passwordchange = async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const {password}= req.body 
    try {
        if(req.body.email){
            const usermail=await User.findOne({email:req.body.email})
            console.log("usermail in password change gthrough mail",usermail)
            const user=await User.findByIdAndUpdate(usermail.id,{password},{new:true})
            const salt = await bcryptjs.genSalt()
        const hash =  await bcryptjs.hash(user.password, salt)
        user.password = hash 
        console.log("user.password in mail password change",user.password)
        await user.save()
        res.status(201).json(user)
        }
        else{
            if(req.params.id){
                console.log("req.params id in passwordchag",req.params.id)
        const user=await User.findByIdAndUpdate(req.params.id,{password},{new:true})
        const salt = await bcryptjs.genSalt()
        const hash = await bcryptjs.hash(user.password, salt)
        user.password = hash 
        console.log("user.password in id password change",user.password)
        await user.save()
        res.status(201).json(user)
            }
        }
    } catch(err) {
        res.status(500).json({ error: "something went wrong"})
    }
}
usersCltr.vipPay=async (req, res) =>{
    try{
        const id=req.params.id
        const {vip,vipdate}=req.body
        const user=await User.findByIdAndUpdate(id,{vip,vipdate},{new:true})
        res.json(user)
    }
    catch(err){
        res.status(500).json({error:'something went wrong'})
    }
    
}

export default usersCltr