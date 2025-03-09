export const ratingValidationSchema = {
    movie_name: {
         in: ['body'],
         exists: {
             errorMessage: 'movie_name is required'
         },
         notEmpty: {
             errorMessage: 'movie_name cannot be empty'
         },
         trim: true 
     },
     user_name: {
        in: ['body'],
        exists: {
            errorMessage: 'movie_name is required'
        },
        notEmpty: {
            errorMessage: 'movie_name cannot be empty'
        },
        trim: true 
    },
    review: {
        in: ['body'],
        exists: {
            errorMessage: 'language is required'
        },
        
        trim: true 
    },
    rating: {
        in: ['body'],
        exists: {
            errorMessage: 'language is required'
        },
        notEmpty: {
            errorMessage: 'language cannot be empty'
        },
        trim: true 
    },
    hashtag: {
        in: ['body'],
        exists: {
            errorMessage: 'hashtag is required'
        },
        isArray:{
            errorMessage: 'hashtag should be array'
        },
        notEmpty: {
            errorMessage: 'hashtag cannot be empty'
        },
        trim: true 
    }
 }

 export const ratingidValidationSchema = {
    id : {
    in: ['params'],
    isMongoId: {
        errorMessage: 'Invalid object Id format'
    }
}
 }
 
 

 