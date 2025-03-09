export const userEditSchema={
    firstname:{
        in: ['body'],
        exists:{
            errorMessage:'firstname is required'
        },
        notEmpty:{
            errorMessage:'firstname cannot be empty'
        },
        isString: {
            options: { minlength:1},
            errorMessage: 'first name should atleast be 1'
        },
        trim:true,
    },
    lastname:{
        in: ['body'],
        exists:{
            errorMessage:'lastname is required'
        },
        notEmpty:{
            errorMessage:'lastname cannot be empty'
        },
        isString: {
            options: { minlength:1},
            errorMessage: 'last name should atleast be 2'
        },
        
        trim:true,
    },
    birthday:{
        in: ['body'],
        exists:{
            errorMessage:'birthday field is required'
        },
        notEmpty:{
            errorMessage:' birthday cannot be empty'
        },
        custom: {
            options: function(value) {
                if(new Date(value) > new Date()) {
                    throw new Error('birthdate cannot be greater than today')
                } 
                return true 
            }
    },
        trim:true,
    },
    anniversary:{
        in: ['body'],
        exists:{
            errorMessage:'birthday field is required'
        },
        notEmpty:{
            errorMessage:' birthday cannot be empty'
        },
        custom: {
            options: function(value) {
                if(new Date(value) > new Date()) {
                    throw new Error('birthdate cannot be greater than today')
                } 
                return true 
            }
    },
        trim:true,
    },
   
}
