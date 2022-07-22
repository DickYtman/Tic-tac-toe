import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import asyncHandler from 'express-async-handler'
import UserModel from '../models/userModel'

// register new User
// @route Post /users/register-user
// access public

export const registerUser = asyncHandler(async(req, res) => {
    const { name, email, password } = req.body

    if(!name && !email && !password) {
        res.status(400)
        throw new Error('Please fill all the fields')
    }

    const userExists = await UserModel.findOne( {email} )
    if(userExists) {
        res.status(400)
        throw new Error(`${email} already exists`)
    }

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    //Create user
    const user = await UserModel.create({
        name,
        email,
        password:hashedPassword
    })

    if(user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            password: user.password,
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})


// login  User
// @route Post /users/login-user
// access public

export const loginUser = asyncHandler(async(req, res) => {
    const { email, password } = req.body

    // check for user email
    const userExists = await UserModel.findOne( {email} )
    
    if(userExists && (await bcrypt.compare(password, userExists.password))) {
        res.status(201).json({
            _id: userExists.id,
            name: userExists.name,
            email: userExists.email,
        })
    } else {
        res.status(400)
        throw new Error('Invalid credentials')
    }
})