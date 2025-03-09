import {Schema,model} from "mongoose"
const userSchema=new Schema({
    email:String,
    mobile:String,
    password:String,
    role:{
        type:String,
        default:'user'
    },
    vip:{
        type:String,
        default:'no'
    },
    vipdate:{
        type:Date,
        default:null
    },
    firstname:String,
    lastname:String,
    birthday:Date,
    anniversary:Date,
},{timestamps:true})
const User=model('User',userSchema)
export default User