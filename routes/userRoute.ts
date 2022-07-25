import express from 'express'
const router = express.Router();
import { registerUser, loginUser, updateUser, deleteUser, getUser, getUserByCookie} from '../controllers/userCont'

router
    .post('/user-register', registerUser)
    .post('/user-login', loginUser)
    .patch('/user-card/:id', updateUser)
    .delete('/user-card/:id', deleteUser)
    .post('/user-card', getUser)
    .get('/get-user', getUserByCookie)


export default router