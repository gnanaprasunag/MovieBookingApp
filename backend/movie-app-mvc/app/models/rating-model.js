import { Schema, model } from 'mongoose'

const ratingSchema = new Schema({ 
   movie_name:String,
   user_name:String,
   review:String,
   rating:Number,
   hashtag:Array
  
},{timestamps:true})

export const Rating = model('Rating', ratingSchema)


