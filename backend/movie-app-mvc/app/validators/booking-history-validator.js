export const bookinghistoryValidationSchema = {
    user_name: {
      in: ['body'],
      exists: {
        errorMessage: 'user_name is required',
      },
      notEmpty: {
        errorMessage: 'user_name cannot be empty',
      },
      trim: true,
    },
    'booked.*.movie_name': {
      in: ['body'],
      exists: {
        errorMessage: 'movie_name is required',
      },
      notEmpty: {
        errorMessage: 'movie_name cannot be empty',
      },
      trim: true,
    },
    'booked.*.language': {
      in: ['body'],
      exists: {
        errorMessage: 'language is required',
      },
      notEmpty: {
        errorMessage: 'language cannot be empty',
      },
      trim: true,
      
    },
    'booked.*.place': {
      in: ['body'],
      exists: {
        errorMessage: 'place is required',
      },
      notEmpty: {
        errorMessage: 'place cannot be empty',
      },
      trim: true,
    },
    'booked.*.location': {
      in: ['body'],
      exists: {
        errorMessage: 'location is required',
      },
      notEmpty: {
        errorMessage: 'location cannot be empty',
      },
      trim: true,
    },
    'booked.*.date': {
      in: ['body'],
      exists: {
        errorMessage: 'date is required',
      },
      notEmpty: {
        errorMessage: 'date cannot be empty',
      },
      trim: true,
      /*matches: {
        options: [/^\d{4}-\d{2}-\d{2}$/],
        errorMessage: 'date must be in YYYY-MM-DD format',
      },*/
    },
    'booked.*.timeslot': {
      in: ['body'],
      exists: {
        errorMessage: 'timeslot is required',
      },
      notEmpty: {
        errorMessage: 'timeslot cannot be empty',
      },
      trim: true,
    },
    'booked.*.tickets': {
      in: ['body'],
      exists: {
        errorMessage: 'tickets are required',
      },
      isArray: {
        options: { min: 1 },
        errorMessage: 'tickets must be an array with at least one item',
      },
    },
  };
  
  export const bookinghistoryidValidationSchema = {
    id: {
      in: ['params'],
      isMongoId: {
        errorMessage: 'Invalid object ID format',
      },
    },
  };
  