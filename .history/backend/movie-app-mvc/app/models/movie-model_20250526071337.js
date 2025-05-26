import { Schema, model } from 'mongoose'

const movieSchema = new Schema({ 
   movie_name:String,
   language:String,
   animation:Array,
   trailer:String,
   description:String,
   city:String,
   certificate:String,
   movie_duration:String,
   genre:Array,
   movie_image:String,
   releaseDate:Date,
   
})

export const Movie = model('Movie', movieSchema)


