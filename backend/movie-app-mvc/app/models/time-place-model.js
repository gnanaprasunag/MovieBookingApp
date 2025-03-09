import { Schema, model } from 'mongoose'
const TimeSchema=new Schema({
    time:String,
    seats:Array
   })
const timeplaceSchema = new Schema({ 
   movie_name:String,
   language:String,
   time:[TimeSchema],
   place:String,
   location:String,
   cancellation:String,
   animation:String
})

export const Timeplace = model('Timeplace', timeplaceSchema)


