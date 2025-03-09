export const singledateValidationSchema = {
    movie_name: {
         //in: ['body'],
         exists: {
             errorMessage: 'movie_name is required'
         },
         notEmpty: {
             errorMessage: 'movie_name cannot be empty'
         },
         trim: true 
     },
     
     time: {
         in: ['body'],
         exists: {
             errorMessage: 'time is required'
         },
         notEmpty: {
             errorMessage: 'time cannot be empty'
         },
         trim: true 
     },
     language:{
        in: ['body'],
        
        exists: {
            errorMessage: 'language is required'
        },
        notEmpty: {
            errorMessage: 'language cannot be empty'
        },
        trim: true 
    },
    
  
     place:{
         in: ['body'],
         exists: {
             errorMessage: ' place is required'
         },
         notEmpty: {
             errorMessage: ' place cannot be empty'
         },
         trim: true 
     },
   
     address: {
         in: ['body'],
         exists: {
             errorMessage: ' address is required'
         },
         notEmpty: {
             errorMessage: ' address cannot be empty'
         },
         
         trim: true 
     },
     singledate: {
         in: ['body'],
         exists: {
             errorMessage: 'singledate is required'
         },
         notEmpty: {
             errorMessage: 'singledate cannot be empty'
         },
         
         trim: true 
     },
     selectedSeats: {
             in: ['body'],
             exists: {
                 errorMessage: ' selectedSeats is required'
             },
             notEmpty: {
                 errorMessage: ' selectedSeats cannot be empty'
             },
             
             trim: true 
         },
       
 }
 
 

 