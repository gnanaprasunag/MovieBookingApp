import express from 'express'
import fileUpload from 'express-fileupload'
import cors from 'cors'
import configureDB from './config/db.js'
import { checkSchema} from 'express-validator'
import dotenv from 'dotenv'

const port = 9213
const app = express()
dotenv.config() 
app.use(express.json())
app.use(cors())
app.use(fileUpload({ useTempFiles: true }));
configureDB()

import usersCltr from './app/controllers/users-cltr.js'
import authenticateUser from './app/middlewares/authentication.js'
import authorizeUser from './app/middlewares/authorizeUser.js'

import moviesCltr from './app/controllers/movie-cltr.js'
import castcrewCltr from './app/controllers/cast-crew-cltr.js'
import timeplaceCltr from './app/controllers/time-place-cltr.js'
import bookinghistoryCltr from './app/controllers/booking-history-cltr.js'

import ratingCltr from './app/controllers/rating-cltr.js'
import callCltr from './app/controllers/call-cltr.js'
import imageCltr from './app/controllers/image-cltr.js'
import sendEmail from './app/controllers/mail-cltr.js'
import sendMessage from './app/controllers/message-cltr.js'
import paymentCltr from './app/controllers/payment-cltr.js'
import notesCltr from './app/controllers/voicetotext-cltr.js'

import { userRegisterSchema,userEmailSchema,userMobileSchema, userLoginSchema ,userPasswordSchema} from './app/validators/user-validation-schema.js'
import { userEditSchema} from './app/validators/user-profile-edit-validation-schema.js'
import { movieValidationSchema,movieidValidationSchema} from './app/validators/movie-validator.js'
import { castcrewValidationSchema,castcrewidValidationSchema} from './app/validators/cast-crew-validator.js'
import { timeplaceValidationSchema,timeplaceidValidationSchema} from './app/validators/time-place-validator.js'
import { ratingValidationSchema,ratingidValidationSchema} from './app/validators/rating-validator.js'
import { bookinghistoryValidationSchema,bookinghistoryidValidationSchema} from './app/validators/booking-history-validator.js'
import { singledateValidationSchema } from './app/validators/singledate-validator.js'
import singledateCltr from './app/controllers/singledate-cltr.js'

app.post('/api/users/register', checkSchema(userRegisterSchema), usersCltr.register)
app.post('/api/users/login', checkSchema(userLoginSchema), usersCltr.login)
app.post('/api/users/mailcheck', usersCltr.onlyemailcheck)
app.get('/api/users/account', authenticateUser, usersCltr.account)
app.get('/api/users/list', authenticateUser,authorizeUser(['admin','moderator']),usersCltr.listUsers)
//authorizeUser(['admin','moderator']) this is higher order function. The reaon why we are creating higher order function is you need to pass arguments to your function
app.delete('/api/users/:id', authenticateUser,authorizeUser(['admin']),usersCltr.destroy)
app.put('/api/users/change-role/:id', authenticateUser,authorizeUser(['admin']),usersCltr.changeRole)
app.put('/api/users/change-profile/:id',checkSchema(userEditSchema), authenticateUser,usersCltr.changeProfile)
app.put('/api/users/change-email/:id', authenticateUser,checkSchema(userEmailSchema),usersCltr.changeEmail)
app.put('/api/users/change-mobile/:id', authenticateUser,checkSchema(userMobileSchema),usersCltr.changeMobile)
app.put('/api/users/vippay/:id', authenticateUser,usersCltr.vipPay)
app.put('/api/users/password-check/:id', authenticateUser,usersCltr.passwordCheck)
app.put('/api/users/password-check',usersCltr.passwordchangeCheck)

app.put('/api/users/password-change/:id', authenticateUser,checkSchema(userPasswordSchema),usersCltr.passwordchange)
app.put('/api/users/password-change', checkSchema(userPasswordSchema),usersCltr.passwordchange)

app.get('/api/movies',moviesCltr.list)
app.post('/api/movies', checkSchema(movieValidationSchema),moviesCltr.create)
app.get('/api/movies/:id', checkSchema(movieidValidationSchema),moviesCltr.show)
app.delete('/api/movies/:id', checkSchema(movieidValidationSchema), moviesCltr.remove)
app.put('/api/movies/:id', checkSchema(movieidValidationSchema), checkSchema(movieValidationSchema),moviesCltr.update)  

app.get('/api/castcrew',castcrewCltr.list)
app.post('/api/castcrew', checkSchema(castcrewValidationSchema),castcrewCltr.create)
app.get('/api/castcrew/:id', checkSchema(castcrewidValidationSchema),castcrewCltr.show)
app.delete('/api/castcrew/:id', checkSchema(castcrewidValidationSchema), castcrewCltr.remove)
app.put('/api/castcrew/:id', checkSchema(castcrewidValidationSchema), checkSchema(castcrewValidationSchema),castcrewCltr.update)  

app.get('/api/timeplace',timeplaceCltr.list)
app.post('/api/timeplace', checkSchema(timeplaceValidationSchema),timeplaceCltr.create)
app.get('/api/timeplace/:id', checkSchema(timeplaceidValidationSchema),timeplaceCltr.show)
app.delete('/api/timeplace/:id', checkSchema(timeplaceidValidationSchema), timeplaceCltr.remove)
app.put('/api/timeplace/:id', checkSchema(timeplaceidValidationSchema), checkSchema(timeplaceValidationSchema),timeplaceCltr.update)  
app.post('/api/seats/book', timeplaceCltr.seats)

app.get('/api/rating',ratingCltr.list)
app.post('/api/rating', checkSchema(ratingValidationSchema),ratingCltr.create)
//app.get('/api/rating/:id', checkSchema(ratingidValidationSchema),ratingCltr.show)
app.delete('/api/rating/:id', checkSchema(ratingidValidationSchema), ratingCltr.remove)
//app.put('/api/rating/:id', checkSchema(ratingidValidationSchema), checkSchema(ratingValidationSchema),ratingCltr.update)  
app.put('/api/rating',ratingCltr.updateMail)  

app.get('/api/bookinghistory',bookinghistoryCltr.list)
app.post('/api/bookinghistory', checkSchema(bookinghistoryValidationSchema),bookinghistoryCltr.create)
//app.get('/api/bookinghistory/:id', checkSchema(bookinghistoryidValidationSchema),bookinghistoryCltr.show)
app.delete('/api/bookinghistory/:id/:bookingId', checkSchema(bookinghistoryidValidationSchema), bookinghistoryCltr.remove)
app.put('/api/bookinghistory/:id', checkSchema(bookinghistoryidValidationSchema),bookinghistoryCltr.update)  
app.put('/api/bookinghistory',bookinghistoryCltr.updateMail)  

app.post('/api/makeCall',callCltr)
app.post('/api/upload',imageCltr.image)
app.post('/api/upload-video',imageCltr.video)
app.post('/api/api/emails/send', sendEmail);
app.post('/api/create-order',paymentCltr)
app.get('/api/notes', notesCltr.get)
app.post('/api/notes',notesCltr.post)
app.post('/api/send-message',sendMessage)

app.post('/api/singledate', checkSchema(singledateValidationSchema),singledateCltr.create)
app.put('/api/singledate/:id', checkSchema(singledateValidationSchema),singledateCltr.update)
app.get('/api/singledate',singledateCltr.list)

app.listen(port, () => {
    console.log('server running on port', port)
})


