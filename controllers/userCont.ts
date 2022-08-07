import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import asyncHandler from 'express-async-handler'
import UserModel from '../models/userModel'
const cloudinary = require('../utils/cloudinary')

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}


// register new User
// @route Post /users/register-user
// access public

export const registerUser = async(req, res) => {
    try {
    const { firstName, email, password } = req.body
console.log(firstName, email, password);
    if(!password) {
        res.status(400)
        throw new Error('Please fill all the fields')
    }

    const userExists = await UserModel.findOne( {email} )
    if(userExists) {
        const userError = (`${email} already exists`)   
        res.send(
            { userError }
        )

    } else {

        // Hash password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
            
        //Create user
        const user = await UserModel.create({
            firstName,
            email,
            password:hashedPassword    
        })

        res.send({
            user, 
            token: generateToken(user._id)
        })

    }   
       } catch(error) {
        const registerError = error
        res.send({registerError})
        console.error(error);
    }
}


// login  User
// @route Post /users/login-user
// access public

export const loginUser = async(req, res) => {
    try {
    const { email, password } = req.body
    
    // check for user email
    const user = await UserModel.findOne( {email} )

    if(user && (await bcrypt.compare(password, user.password))) {
        res.cookie('user', user._id)
        res.send({
            user,
            token: generateToken(user._id)
        })

    } else {
        res.status(400)
        throw new Error('Invalid credentials')
    }
    } catch(error) {
        console.error(error)
    }
}


// Get user by cookie
export const getUserByCookie = async(req, res) => {
    try {
        const { user } = req.cookies
        if(!user) {
            throw new Error('User not found')
        }

        const userDB = await UserModel.findById( user )
        if(!userDB) {
            throw new Error('userDB not found' )
        }
        res.send({ ok:true, userDB })
    } catch (error) {
        console.log(error);
        res.send( {error} )
    }
}


// Update User
// @route PUT /users/user-card/:id
// Access Private

export const updateUser = async(req, res) => {
    try {
        const { userProp, userValue, userId } = req.body
        const options = { new: true }

        if(!userProp) {
            res.status(400)
            throw new Error('User not found')
        } 
    
        const updateUser = await UserModel.findByIdAndUpdate( 
                {_id: userId},     
                {[userProp] : userValue},
                options
        )
            console.log(userValue);
        if( updateUser[userProp] === userValue) {
            console.log(updateUser);
            res.send(
                { updateUser }
            )
        }

    } catch (error) {
        console.error(error)
    }
    
}

export const updateUserImage = async(req, res) => {
    const { picture, userId } = req.body
    try{
        const result = await cloudinary.uploader.upload(picture, {
            folder: "users",
        })
        const options = { new: true }

        const updateUser = await UserModel.findByIdAndUpdate( 
            {_id: userId},
                {image: {
                    public_id: result.public_id,
                    url: result.secure_url
                }
            }       
            ,
            options
    )
    res.send({
        updateUser
    })

    } catch(error) {
        console.error(error)
    }
}


// Delete User
// @route DELETE /users/user-card/:id
// Access Private

export const deleteUser = async (req, res) => {
    console.log('hello');
    const user = await UserModel.findById(req.params.id)
    console.log(user.firstName);
    if(!user) {
        res.status(400)
        throw new Error('User not found')
    } 

    await user.remove()

    res.status(200).json( {id: req.params.id} )
}


// Get User
// @route GET /users/get-user-card/:id
// Access Private
export const getUser = async(req, res) => {
    try{
    const id = req.params.id
    const user = await UserModel.findById(id)
    res.send( {user} )
    } catch(error) {
        console.log(error)
    }
}

