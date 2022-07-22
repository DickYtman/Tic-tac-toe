import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
    name: {
        type:String,
        required: [true, 'Please add your name']
    },
    email:{
        type:String,
        required: [true, 'Please add your email']
    },
    password:{
        type:String,
        required: [true, 'Please add your password']
    }
},
    {
        timestamps: true,
    }
)

export default UserSchema