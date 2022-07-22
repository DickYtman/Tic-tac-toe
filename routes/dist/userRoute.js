"use strict";
exports.__esModule = true;
var express_1 = require("express");
var router = express_1["default"].Router();
var userCont_1 = require("../controllers/userCont");
router
    .post('/register-user', userCont_1.registerUser)
    .post('/login-user', userCont_1.loginUser)
    .patch('/user-card', userCont_1.updateUser)["delete"]('/user-card', userCont_1.deleteUser);
exports["default"] = router;
