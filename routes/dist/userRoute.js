"use strict";
exports.__esModule = true;
var express_1 = require("express");
var router = express_1["default"].Router();
var userCont_1 = require("../controllers/userCont");
router
    .post('/user-register', userCont_1.registerUser)
    .post('/user-login', userCont_1.loginUser)
    .patch('/update-user/', userCont_1.updateUser)
    .patch('/update-user-image/', userCont_1.updateUserImage)["delete"]('/user-card/', userCont_1.deleteUser)
    .get('/get-user-card/:id', userCont_1.getUser)
    .get('/get-user', userCont_1.getUserByCookie);
exports["default"] = router;
