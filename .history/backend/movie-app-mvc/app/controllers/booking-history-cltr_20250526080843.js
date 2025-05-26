import {Bookinghistory} from '../models/booking-history-model.js'
import {validationResult } from 'express-validator'
const bookinghistoryCltr={}

// Create a new movie
bookinghistoryCltr.create= async (req, res) => {
  
    try{
    const errors = validationResult(req) 
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array()})
    }
    const body = req.body 
    const rating = new Bookinghistory(body)
    await rating.save()
    res.status(201).json(rating)
    }
    catch (error) {
        res.status(500).json({ error: 'Something went wrong'}) 
      }
    
}

// Get all movies
bookinghistoryCltr.list=async(req, res) => {
    try {
        const timeplaces = await Bookinghistory.find({});
        res.json(timeplaces);
      } catch (error) {
        res.status(500).json({ error: 'Something went wrong'}) 
      }
}


// Update a movie by ID
bookinghistoryCltr.update= (req, res) => {
    const errors = validationResult(req) 

    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array()})
    }

    const id = req.params.id 
    const body = req.body 
    
    Bookinghistory.findByIdAndUpdate(id,{user_name:body.user_name,booked:body.booked}, { new: true })
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


//update mail
bookinghistoryCltr.updateMail=(req, res) => {
const { old, email } = req.body; 
  Bookinghistory.updateOne(
    { user_name: old }, 
    { $set: { user_name: email } }
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


bookinghistoryCltr.remove=async(req, res) => {
    const {id, bookingId } = req.params 
    try{
    
    const result = await Bookinghistory.findOneAndUpdate(
      { _id: id }, // Match the user document
      { $pull: { booked: { _id: bookingId } } }, // Remove the booking with the specific _id
      { new: true } // Return the updated document
    );
  
    if (!result) {
      return res.status(404).json({error: 'record not found'})  
    }
    res.json(result)
        
      }
        catch(err) {
          res.status(500).json({ error: 'something went wrong'})
        }
}

export default bookinghistoryCltr