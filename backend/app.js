import express from 'express'
import cors from 'cors'
import {
	getUsers,
	getUser,
	createUser,
	editUser
} from './src/controllers/profile.Controllers.js'
import { validateProfile } from './src/validators/profile.Validation.js'
import { errorHandler } from './src/middlewares/errorHandler.middlewares.js'


const app = express()

app.use(express.json())
app.use(cors())

app.get('/',(req,res)=>{
res.status(200).send("server is running")
})

app.get('/api/profiles', getUsers)
app.get('/api/profiles/:id', getUser)
app.post('/api/profiles', validateProfile, createUser)
app.put('/api/profiles/:id', validateProfile, editUser)

app.use(errorHandler)

export {app}