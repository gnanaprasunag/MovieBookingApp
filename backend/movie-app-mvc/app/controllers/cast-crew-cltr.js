import {Castcrew} from '../models/cast-crew-model.js'
import {validationResult } from 'express-validator'
const castcrewCltr={}

// Create a new movie
castcrewCltr.create= async (req, res) => {
    try{
    const errors = validationResult(req) 
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array()})
    }

    const body = req.body 
    const castcrew = new Castcrew(body)
    await castcrew.save()
    res.status(201).json(castcrew)
    }
    catch (error) {
        res.status(500).json({ error: 'Something went wrong'}) 
      }
    
}


// Get all movies
castcrewCltr.list=async(req, res) => {
    try {
        const castcrews = await Castcrew.find({});
        res.json(castcrews);
      } catch (error) {
        res.status(500).json({ error: 'Something went wrong'}) 
      }
}


// Get a single movie by ID
castcrewCltr.show= (req, res) => {
    const errors = validationResult(req) 
    
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array()})
    }
    const id = req.params.id 
    Castcrew.findById(id)
        .then((movie) => {
            if(!movie)  {
                return res.status(404).json({error: 'record not found'})  
            } 
            res.json(movie)
        })
        .catch((err) => {
            res.status(500).json({ error: 'Something went wrong'}) 
        })
}


// Update a movie by ID
castcrewCltr.update= (req, res) => {
    const errors = validationResult(req) 

    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array()})
    }

    const id = req.params.id 
    const body = req.body 
    Castcrew.findByIdAndUpdate(id,body, { new: true })
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
castcrewCltr.remove=(req, res) => {
    const id = req.params.id 

   Castcrew.findByIdAndDelete(id) 
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

export default castcrewCltr