import {Movie} from '../models/movie-model.js'
import {validationResult } from 'express-validator'
const moviesCltr={}

// Create a new movie
moviesCltr.create= async (req, res) => {
    try{
    const errors = validationResult(req) 
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array()})
    }

    const body = req.body 
    const movie = new Movie(body)
    await movie.save()
    res.status(201).json(movie)
    }
    catch (error) {
        res.status(500).json({ error: 'Something went wrong'}) 
      }
    
}


// Get all movies
moviesCltr.list=async(req, res) => {
    try {
        const movies = await Movie.find({});
        res.json(movies);
      } catch (error) {
        res.status(500).json({ error: 'Something went wrong'}) 
      }
}


// Get a single movie by ID
moviesCltr.show= (req, res) => {
    const errors = validationResult(req) 
    
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array()})
    }
    const id = req.params.id 
    Movie.findById(id)
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
moviesCltr.update= (req, res) => {
    const errors = validationResult(req) 

    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array()})
    }

    const id = req.params.id 
    const body = req.body 
console.log("body in movie edot",body)
    Movie.findByIdAndUpdate(id,body, { new: true })
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
moviesCltr.remove=(req, res) => {
    const id = req.params.id 

    Movie.findByIdAndDelete(id) 
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

export default moviesCltr