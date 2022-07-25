"use strict";
exports.__esModule = true;
var express_1 = require("express");
var router = express_1["default"].Router();
var userCont_1 = require("../controllers/userCont");
router
    .post('/user-register', userCont_1.registerUser)
    .post('/user-login', userCont_1.loginUser)
    .patch('/user-card/:id', userCont_1.updateUser)["delete"]('/user-card/:id', userCont_1.deleteUser)
    .post('/user-card', userCont_1.getUser);
exports["default"] = router;
