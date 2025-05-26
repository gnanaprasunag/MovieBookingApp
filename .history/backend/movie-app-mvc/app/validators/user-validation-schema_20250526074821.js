import User from "../models/user-model.js"
export const userRegisterSchema={
    email:{
        in: ['body'],
        exists:{
           errorMessage:'email field is required'
        },
        notEmpty:{
            errorMessage:'email cannot be empty'
        },
        isEmail:{
            errorMessage:'email should be valid format'
        },
        trim:true,
        normalizeEmail:true,
        custom:{
            options:async function(value){
                try{
const user=await User.findOne({email:value})
if(user){
    throw new Error('email is already taken')
}
                }catch(err){
                    throw new Error(err.message)
             
                }
                return true
            }
        }
    },
    mobile:{
        in: ['body'],
        exists:{
            errorMessage:'mobile is required'
        },
        notEmpty:{
            errorMessage:'mobile cannot be empty'
        },
        
        custom:{
            options:async function(value){
                try{
                    if(value.length!=13){throw new Error("number should contain 10 digits")}
const num=await User.findOne({mobile:value})
if(num){
    throw new Error('number is already taken')
}
                }catch(err){
                    throw new Error(err.message)
             
                }
                return true
            }
        },
        trim:true,
    },
    password:{
        in: ['body'],
        exists:{
            errorMessage:'password field is required'
        },
        notEmpty:{
            errorMessage:'password cannot be empty'
        },
        isStrongPassword:{
            options:{
                minLength:8,
                minLowercase:1,
                minUppercase:1,
                minNumber:1,
                minSymbol:1
            },
            errorMessage:"password must contain atleast one lowercase one uppercase one number and one symbol and it must be minimum 8 characters long"
        },
        trim:true
    },
   
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
        /*isDate: {
            options: { format: 'yyyy-mm-dd' },
            errormessage:' birthday is not in format'

        },*/
        anniversary:{
            in: ['body'],
            exists:{
                errorMessage:'anniversary field is required'
            },
            notEmpty:{
                errorMessage:' anniversary cannot be empty'
            },
            custom: {
                options: function(value) {
                    if(new Date(value) > new Date()) {
                        throw new Error('anniversary cannot be greater than today')
                    } 
                    return true 
                }
        },
            trim:true,
        },
    
}
export const userLoginSchema={
    email:{
        exists:{
            errormessage:'email field is required'
        },
        notEmpty:{
            errormessage:'email cannot be empty'
        },
        isEmail:{
            errormessage:'email should be valid format'
        },
        trim:true,
        normalizeEmail:true//AnI to ani or something format but all letters will be in same format
        
    },
    password:{
        exists:{
            errormessage:'password field is required'
        },
        notEmpty:{
            errormessage:'password cannot be empty'
        },
        isStrongPassword:{
            options:{
                minLength:8,
                minLowercase:1,
                minUppercase:1,
                minNumber:1,
                minSymbol:1
            },
            errorMessage:"password must contain atleast one lowercase one uppercase one number and one symbol and it must be minimum 8 characters long"
        },
        trim:true
    }
}

export const userPasswordSchema={
    password:{
        exists:{
            errormessage:'password field is required'
        },
        notEmpty:{
            errormessage:'password cannot be empty'
        },
        isStrongPassword:{
            options:{
                minLength:8,
                minLowercase:1,
                minUppercase:1,
                minNumber:1,
                minSymbol:1
            },
            errorMessage:"password must contain atleast one lowercase one uppercase one number and one symbol and it must be minimum 8 characters long"
        },
        trim:true
    }
}

export const userEmailSchema={
    email:{
        in: ['body'],
        exists:{
            errormessage:'email field is required'
        },
        notEmpty:{
            errormessage:'email cannot be empty'
        },
        isEmail:{
            errormessage:'email should be valid format'
        },
        trim:true,
        normalizeEmail:true,
        custom:{
            options:async function(value){
                try{
const user=await User.findOne({email:value})
if(user){
    throw new Error('email is already taken')
}
                }catch(err){
                    throw new Error(err.message)
             
                }
                return true
            }
        }
    },
   
}

export const userMobileSchema={
    mobile:{
        in: ['body'],
        exists:{
            errormessage:'mobile is required'
        },
        notEmpty:{
            errormessage:'mobile cannot be empty'
        },
        
        custom:{
            options:async function(value){
                try{
                    if(value.length!=13){throw new Error("number should be 10")}
const num=await User.findOne({mobile:value})
if(num){
    throw new Error('number is already taken')
}
                }catch(err){
                    throw new Error(err.message)
             
                }
                return true
            }
        },
        trim:true,
    },
}