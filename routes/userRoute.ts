import express from 'express'
const router = express.Router();
import { registerUser, loginUser, updateUser, updateUserImage, deleteUser, getUser, getUserByCookie} from '../controllers/userCont'
import protect from '../middleware/authMiddleware'

router
    .post('/user-register', registerUser)
    .post('/user-login', loginUser)
    .patch('/update-user/', updateUser)
    .patch('/update-user-image/', updateUserImage)
    .delete('/user-card/', deleteUser)
    .get('/get-user-card/:id', getUser)
    .get('/get-user', getUserByCookie)


export default router