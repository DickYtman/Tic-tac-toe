import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import asyncHandler from 'express-async-handler'
import UserModel from '../models/userModel'

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

    if(!firstName && !email && !password) {
        res.status(400)
        throw new Error('Please fill all the fields')
    }

    const userExists = await UserModel.findOne( {email} )
    if(userExists) {
        const userError = (`${email} already exists`) 
        res.send(
            userError
        )
        res.status(400)
        throw new Error(`${email} already exists`)
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
}

    // if(user) {
    //     res.status(201).json({
    //         _id: user.id,
    //         firstName: user.firstName,
    //         email: user.email,
    //         password: user.password,
    //         token: generateToken(user._id),
    //     })
    // } else {
    //     res.status(400)
    //     throw new Error('Invalid user data')
    // }
    } catch(error) {
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
    const userExists = await UserModel.findOne( {email} )
    
    if(userExists && (await bcrypt.compare(password, userExists.password))) {
        res.status(201).json({
            id: userExists.id,
            _id: userExists._id,
            firstName: userExists.firstName,
            email: userExists.email,
            token: generateToken(userExists._id),
        })
    } else {
        res.status(400)
        throw new Error('Invalid credentials')
    }
    } catch(error) {
        console.error(error)
    }
}


// Update User
// @route PUT /users/user-card/:id
// Access Private

export const updateUser = async(req, res) => {
    const user = await UserModel.findById(req.params.id)

    if(!user) {
        res.status(400)
        throw new Error('User not found')
    } 

    const updateUser = await UserModel.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        })
    
    res.status(200).json(updateUser)
}


// Delete User
// @route DELETE /users/user-card/:id
// Access Private

export const deleteUser = async (req, res) => {
    console.log('hello');
    const user = await UserModel.findById(req.params.id)
    console.log(user);
    if(!user) {
        res.status(400)
        throw new Error('User not found')
    } 

    await user.remove()

    res.status(200).json( {id: req.params.id} )
}
