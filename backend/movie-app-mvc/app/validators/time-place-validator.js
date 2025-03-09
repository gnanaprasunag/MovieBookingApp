export const timeplaceValidationSchema = {
    movie_name: {
      in: ['body'],
      exists: {
        errorMessage: 'movie_name is required',
      },
      notEmpty: {
        errorMessage: 'movie_name cannot be empty',
      },
      trim: true,
    },
    language: {
      in: ['body'],
      exists: {
        errorMessage: 'language is required',
      },
      notEmpty: {
        errorMessage: 'language cannot be empty',
      },
      trim: true,
    },
    'time.*.time': {
      in: ['body'],
      exists: {
        errorMessage: 'time is required for each time entry',
      },
      notEmpty: {
        errorMessage: 'time cannot be empty',
      },
      /*matches: {
        options: [/^(0[1-9]|1[0-2]):[0-5][0-9] (AM|PM)$/], // Example: 02:30 PM
        errorMessage: 'time must be in the format HH:MM AM/PM',
      },*/
      trim: true,
    },
    'time.*.seats': {
      in: ['body'],
      exists: {
        errorMessage: 'seats array is required for each time entry',
      },
      isArray: {
        options: { min: 1 },
        errorMessage: 'seats must be an array with at least one item',
      },
    },
    place: {
      in: ['body'],
      exists: {
        errorMessage: 'place is required',
      },
      notEmpty: {
        errorMessage: 'place cannot be empty',
      },
      trim: true,
    },
    location: {
      in: ['body'],
      exists: {
        errorMessage: 'location is required',
      },
      notEmpty: {
        errorMessage: 'location cannot be empty',
      },
      trim: true,
    },
    cancellation: {
      in: ['body'],
      exists: {
        errorMessage: 'cancellation is required',
      },
      notEmpty: {
        errorMessage: 'cancellation cannot be empty',
      },
      /*isBoolean: {
        errorMessage: 'cancellation must be true or false',
      },*/
    },
    animation: {
      in: ['body'],
      exists: {
        errorMessage: 'animation is required',
      },
      notEmpty: {
        errorMessage: 'animation cannot be empty',
      },
      /*isIn: {
        options: [['2D', '3D', 'IMAX']],
        errorMessage: 'animation must be one of the following: 2D, 3D, IMAX',
      },*/
      trim: true,
    },
  };
  
 
  export const timeplaceidValidationSchema = {
    id : {
    in: ['params'],
    isMongoId: {
        errorMessage: 'Invalid object Id format'
    }
 } 
}

 