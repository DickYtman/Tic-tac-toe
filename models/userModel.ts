import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
    image: {
        public_id: {
            type: String,
        },
        url: {
            type: String
        }
    },

    firstName: {
        type:String,
        required: [true, 'Please add your name']
    },

    lastName: {
        type:String,
   
    },

    phoneNum: {
        type:String,
   
    },

    birthDate: {
        type:String,
   
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