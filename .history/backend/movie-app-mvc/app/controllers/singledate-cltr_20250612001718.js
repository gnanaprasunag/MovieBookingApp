import {Singledate} from '../models/singledate-model.js'
import {validationResult } from 'express-validator'
const singledateCltr={}

// Create a new movie
singledateCltr.create= async (req, res) => {
    const {movie_name,language,singledate,place,address,time,selectedSeats}=req.body
    try{
    const errors = validationResult(req) 
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array()})
    }
   let a=new Date(singledate)
     const singledates = new Singledate({movie_name,language,singledate:a,place,address,time,selectedSeats})
    await singledates.save()
    res.status(201).json(singledates)
    }
    catch (error) {
        res.status(500).json({ error: 'Something went wrong'}) 
      }
    
}

//update 
singledateCltr.update= async (req, res) => {
    const {selectedSeats}=req.body
    const id=req.params.id
    try{
    const errors = validationResult(req) 
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array()})
    }
    const singledates=await Singledate.findByIdAndUpdate(id,{selectedSeats},{new:true})
    await singledates.save()
    res.status(201).json(singledates)
    }
    catch (error) {
        res.status(500).json({ error: 'Something went wrong'}) 
      }
    
}

// Get all movies
singledateCltr.list=async(req, res) => {
    try {
        const singledates = await Singledate.find({});
        res.json(singledates);
      } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Something went wrong'}) 
      }
}

export default singledateCltr