import {Rating} from '../models/rating-model.js'
import {validationResult } from 'express-validator'
const ratingCltr={}

// Create a new movie
ratingCltr.create= async (req, res) => {
    try{
    const errors = validationResult(req) 
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array()})
    }

    const body = req.body 
    const rating = new Rating(body)
    await rating.save()
    res.status(201).json(rating)
    }
    catch (error) {
        res.status(500).json({ error: 'Something went wrong'}) 
      }
    
}


// Get all movies
ratingCltr.list=async(req, res) => {
    try {
        const timeplaces = await Rating.find({});
        res.json(timeplaces);
      } catch (error) {
        res.status(500).json({ error: 'Something went wrong'}) 
      }
}

//update mail
ratingCltr.updateMail=(req, res) => {
  const { old, email } = req.body; 
     
     Rating.updateMany(
      { user_name: old }, // Match old email
      { $set: { user_name: email } } // Update user_name with new email
    )
        .then((movie) => {
            if(!movie)  {
                return res.status(404).json({error: 'record not found'})  
            }
            res.json(movie) 
        })
        .catch((err) => {
            res.status(500).json({ error: 'something went wrong'})
        })
  }

// Delete a movie by ID
ratingCltr.remove=(req, res) => {
    const id = req.params.id 

    Rating.findByIdAndDelete(id) 
        .then((movie) => {
            if(!movie)  {
                return res.status(404).json({error: 'record not found'})  
            }
            res.json(movie)
        })
        .catch((err) => {
          res.status(500).json({ error: 'something went wrong'})
        })
}


export default ratingCltr