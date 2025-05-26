export const movieValidationSchema = {
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
    
    movie_duration: {
        in: ['body'],
        exists: {
            errorMessage: 'movie_duration is required'
        },
        notEmpty: {
            errorMessage: 'movie_duration cannot be empty'
        },
        trim: true 
    },
  
    genre:{
        in: ['body'],
        exists: {
            errorMessage: 'genre is required'
        },
        notEmpty: {
            errorMessage: 'genre cannot be empty'
        },
        trim: true 
    },
    language:{
        in: ['body'],
        exists: {
            errorMessage: 'language is required'
        },
        notEmpty: {
            errorMessage: '   language cannot be empty'
        },
        trim: true 
    },
    
    movie_image: {
        in: ['body'],
        exists: {
            errorMessage: 'movie_image is required'
        },
        notEmpty: {
            errorMessage: 'movie_image cannot be empty'
        },
        
        trim: true 
    },
    description: {
        in: ['body'],
        exists: {
            errorMessage: 'description is required'
        },
        notEmpty: {
            errorMessage: 'description cannot be empty'
        },
        
        trim: true 
    },
    city: {
            in: ['body'],
            exists: {
                errorMessage: 'city is required'
            },
            notEmpty: {
                errorMessage: 'city cannot be empty'
            },
            
            trim: true 
        },
      
        
        certificate: {
            in: ['body'],
            exists: {
                errorMessage: 'location is required'
            },
            notEmpty: {
                errorMessage: 'location cannot be empty'
            },
            
            trim: true 
        },
         
    releaseDate: {
        in: ['body'],
        exists: {
            errorMessage: 'releaseDate is required'
        },
        notEmpty: {
            errorMessage: 'releaseDate cannot be empty'
        },
        trim: true 
    },
   animation: {
        in: ['body'],
        exists: {
            errorMessage: 'releaseDate is required'
        },
        notEmpty: {
            errorMessage: 'releaseDate cannot be empty'
        },
        trim: true 
    },
    trailer: {
        in: ['body'],
        exists: {
            errorMessage: 'releaseDate is required'
        },
        notEmpty: {
            errorMessage: 'releaseDate cannot be empty'
        },
        trim: true 
    },

}


export const movieidValidationSchema = {
    id : {
    in: ['params'],
    isMongoId: {
        errorMessage: 'Invalid object Id format'
    }
 } 
}
