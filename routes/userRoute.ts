import express from 'express'
const router = express.Router();
import { registerUser, loginUser } from '../controllers/userCont'

router
    .post('/register-user', registerUser)
    .post('/login-user', loginUser)


export default router