import express from 'express'
const router = express.Router();
import { registerUser, loginUser, updateUser, deleteUser} from '../controllers/userCont'

router
    .post('/register-user', registerUser)
    .post('/login-user', loginUser)
    .patch('/user-card', updateUser)
    .delete('/user-card', deleteUser)


export default router