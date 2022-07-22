"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var UserSchema = new mongoose_1["default"].Schema({
    name: {
        type: String,
        required: [true, 'Please add your name']
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
