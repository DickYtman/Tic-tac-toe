"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var UserSchema = new mongoose_1["default"].Schema({
    image: {
        public_id: {
            type: String
        },
        url: {
            type: String
        }
    },
    firstName: {
        type: String,
        required: [true, 'Please add your name']
    },
    lastName: {
        type: String
    },
    phoneNum: {
        type: String
    },
    birthDate: {
        type: String
    },
    email: {
        type: String,
        required: [true, 'Please add your email']
    },
    password: {
        type: String,
        required: [true, 'Please add your password']
    }
}, {
    timestamps: true
});
var UserModel = mongoose_1["default"].model("users", UserSchema);
exports["default"] = UserModel;
