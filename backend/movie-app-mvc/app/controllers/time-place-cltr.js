import {Timeplace} from '../models/time-place-model.js'
import {validationResult } from 'express-validator'
const timeplaceCltr={}

// Create a new movie
timeplaceCltr.create= async (req, res) => {
    try{
    const errors = validationResult(req) 
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array()})
    }
    const body = req.body 
    const timeplace = new Timeplace(body)
    await timeplace.save()
    res.status(201).json(timeplace)
    }
    catch (error) {
        res.status(500).json({ error: 'Something went wrong'}) 
      }
    
}

// Get all movies
timeplaceCltr.list=async(req, res) => {
    try {
        const timeplaces = await Timeplace.find({});
        res.json(timeplaces);
      } catch (error) {
        res.status(500).json({ error: 'Something went wrong'}) 
      }
}


// Get a single movie by ID
timeplaceCltr.show= (req, res) => {
    const errors = validationResult(req) 
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array()})
    }
    
    const id = req.params.id 
    Timeplace.findById(id)
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
timeplaceCltr.update= (req, res) => {
    const errors = validationResult(req) 
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array()})
    }
    const id = req.params.id 
    const body = req.body 
    Timeplace.findByIdAndUpdate(id,body, { new: true })
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
timeplaceCltr.remove=(req, res) => {
    const id = req.params.id 

    Timeplace.findByIdAndDelete(id) 
        .then((movie) => {
            if(!movie)  {
                return res.status(404).json({error: 'record not found'})  
            }
            res.json(movie)
        })
        .catch((err) => {
            res.json(err) 
        })
}

timeplaceCltr.seats=async (req, res) => {
  const { movie_name,language, timeSlot, place,seatNumbers } = req.body; 

  try {
    // Find the specific time slot for the movie
    const timePlace = await Timeplace.findOne({
      movie_name,
      language,
      place,
      'time.time': timeSlot
    });
    if (!timePlace) {
      return res.status(404).json({ message: 'Time or movie not found' });
    }

    // Find the specific time slot object
    const timeObj = timePlace.time.find(t => t.time === timeSlot);
    if (!timeObj || !timeObj.seats) {
      return res.status(404).json({ message: 'Time slot not found' });
    }
    const availableSeats = timeObj.seats;

    // Check if all requested seats are available
    const isAvailable = seatNumbers.every(seatNumber => {
      const seat = availableSeats.find(s => s.seatNumber === seatNumber);
      return seat && !seat.isBooked; // Ensure the seat exists and is not booked
    });

    if (!isAvailable) {
      console.log("One or more seats are not available");
      return res.status(400).json({ message: 'One or more seats are already booked' });
    }

    console.log("isAvailable", isAvailable);

    // Update the seats status to 'booked'
    const updatedSeats = availableSeats.map(seat => {
      if (seatNumbers.includes(seat.seatNumber)) {
        seat.isBooked = true; // Mark the seat as booked
      }
      return seat;
    });

    console.log("updatedSeats", updatedSeats);

    // Update the document with the new seat status
    await Timeplace.updateOne(
      { movie_name, language,place, 'time.time': timeSlot },
      { $set: { 'time.$.seats': updatedSeats } }
    );
    console.log("timeplace seats updayed in db i think")
    
      res.status(200).json({ message: 'Seats booked successfully', seatNumbers });
  }
   catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export default timeplaceCltr