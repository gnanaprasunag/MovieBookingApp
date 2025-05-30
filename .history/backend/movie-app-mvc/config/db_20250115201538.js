import mongoose from 'mongoose'
const configureDB=async ()=>{
    //const dburl='mongodb://127.0.0.1:27017/expense-app-mar24-mvc'

    try{
        //const db=await mongoose.connect(dburl)
        const db=await mongoose.connect(process.env.DB_URL)
        console.log("connected to db")
    }
    catch(err) {
        console.log( err)
    }
}
export default configureDB
//user1@gmail.com-Secret@user1

