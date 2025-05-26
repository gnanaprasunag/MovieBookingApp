import { Schema, model } from 'mongoose'

const singledateSchema = new Schema({ 
   movie_name:String,
   language:String,
   time:String,
   singledate:String,
   place:String,
   address:String,
   selectedSeats:Array
   
})

export const Singledate = model('Singledate', singledateSchema)