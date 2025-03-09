import { Schema, model } from 'mongoose'
const CastSchema = new Schema({
   casturl:String,
    castName: String,
    castRole: String
  });
  const CrewSchema = new Schema({
   crewurl:String,
    crewName: String,
    crewPosition: String
  });
const castcrewSchema = new Schema({ 
   movie_name:String,
   language:String,
   cast:[CastSchema],
  crew:[CrewSchema],
})

export const Castcrew = model('Castcrew', castcrewSchema)


