import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
    firstName: {
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

const UserModel = mongoose.model("users", UserSchema)

export default UserModel