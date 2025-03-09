export const castcrewValidationSchema = {
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
    'cast.*.casturl': {
      in: ['body'],
      exists: {
        errorMessage: 'casturl is required',
      },
      notEmpty: {
        errorMessage: 'casturl cannot be empty',
      },
      isURL: {
        errorMessage: 'casturl must be a valid URL',
      },
      trim: true,
    },
    'cast.*.castName': {
      in: ['body'],
      exists: {
        errorMessage: 'castName is required',
      },
      notEmpty: {
        errorMessage: 'castName cannot be empty',
      },
      isLength: {
        options: { min: 2 },
        errorMessage: 'castName must be at least 2 characters long',
      },
      trim: true,
    },
    'cast.*.castRole': {
      in: ['body'],
      exists: {
        errorMessage: 'castRole is required',
      },
      notEmpty: {
        errorMessage: 'castRole cannot be empty',
      },
      trim: true,
    },
    'crew.*.crewurl': {
      in: ['body'],
      exists: {
        errorMessage: 'crewurl is required',
      },
      notEmpty: {
        errorMessage: 'crewurl cannot be empty',
      },
      isURL: {
        errorMessage: 'crewurl must be a valid URL',
      },
      trim: true,
    },
    'crew.*.crewName': {
      in: ['body'],
      exists: {
        errorMessage: 'crewName is required',
      },
      notEmpty: {
        errorMessage: 'crewName cannot be empty',
      },
      isLength: {
        options: { min: 2 },
        errorMessage: 'crewName must be at least 2 characters long',
      },
      trim: true,
    },
    'crew.*.crewPosition': {
      in: ['body'],
      exists: {
        errorMessage: 'crewPosition is required',
      },
      notEmpty: {
        errorMessage: 'crewPosition cannot be empty',
      },
      trim: true,
    },
  };
  
  export const castcrewidValidationSchema = {
    id : {
    in: ['params'],
    isMongoId: {
        errorMessage: 'Invalid object Id format'
    }
 } 
}
 