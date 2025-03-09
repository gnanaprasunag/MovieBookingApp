import { Schema, model } from 'mongoose'
const addedSchema=new Schema({
   name:String,
   cost:String,
   item:String,
   count:Number
  })
  const bookedSchema=new Schema({
   movie_name:String,
   language:String,
   place:String,
   location:String,
   date:String,
   timeslot:String,
   tickets:Array,
   added:[addedSchema]
  })
const bookinghistorySchema = new Schema({ 
   
   user_name:String,
   booked:[bookedSchema],
   
  
},{timestamps:true})

export const Bookinghistory = model('Bookinghistory', bookinghistorySchema)


