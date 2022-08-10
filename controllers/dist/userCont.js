"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.getUser = exports.deleteUser = exports.updateUserImage = exports.updateUser = exports.getUserByCookie = exports.loginUser = exports.registerUser = void 0;
var jsonwebtoken_1 = require("jsonwebtoken");
var bcryptjs_1 = require("bcryptjs");
var userModel_1 = require("../models/userModel");
var joiPassword_1 = require("../utils/joiPassword");
var cloudinary = require('../utils/cloudinary');
// Generate JWT
var generateToken = function (id) {
    return jsonwebtoken_1["default"].sign({ id: id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });
};
// register new User
// @route Post /users/register-user
// access public
exports.registerUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, firstName, email, password, error, userExists, userError, salt, hashedPassword, user, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 7, , 8]);
                _a = req.body, firstName = _a.firstName, email = _a.email, password = _a.password;
                error = joiPassword_1["default"].validate({ email: email, password: password }).error;
                if (error) {
                    console.debug(error);
                    throw error;
                }
                return [4 /*yield*/, userModel_1["default"].findOne({ email: email })];
            case 1:
                userExists = _b.sent();
                if (!userExists) return [3 /*break*/, 2];
                userError = (email + " already exists");
                res.send({ userError: userError });
                return [3 /*break*/, 6];
            case 2: return [4 /*yield*/, bcryptjs_1["default"].genSalt(10)];
            case 3:
                salt = _b.sent();
                return [4 /*yield*/, bcryptjs_1["default"].hash(password, salt)
                    //Create user
                ];
            case 4:
                hashedPassword = _b.sent();
                return [4 /*yield*/, userModel_1["default"].create({
                        firstName: firstName,
                        email: email,
                        password: hashedPassword
                    })];
            case 5:
                user = _b.sent();
                res.send({
                    user: user,
                    token: generateToken(user._id)
                });
                _b.label = 6;
            case 6: return [3 /*break*/, 8];
            case 7:
                error_1 = _b.sent();
                res.send({ error: error_1.message });
                return [3 /*break*/, 8];
            case 8: return [2 /*return*/];
        }
    });
}); };
// login  User
// @route Post /users/login-user
// access public
exports.loginUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, user, _b, error_2;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 4, , 5]);
                _a = req.body, email = _a.email, password = _a.password;
                return [4 /*yield*/, userModel_1["default"].findOne({ email: email })];
            case 1:
                user = _c.sent();
                _b = user;
                if (!_b) return [3 /*break*/, 3];
                return [4 /*yield*/, bcryptjs_1["default"].compare(password, user.password)];
            case 2:
                _b = (_c.sent());
                _c.label = 3;
            case 3:
                if (_b) {
                    res.cookie('user', user._id);
                    res.send({
                        user: user,
                        token: generateToken(user._id)
                    });
                }
                else {
                    res.status(400);
                    throw new Error('Invalid credentials');
                }
                return [3 /*break*/, 5];
            case 4:
                error_2 = _c.sent();
                console.error(error_2);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
// Get user by cookie
exports.getUserByCookie = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, userDB, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                user = req.cookies.user;
                if (!user) {
                    throw new Error('User not found');
                }
                return [4 /*yield*/, userModel_1["default"].findById(user)];
            case 1:
                userDB = _a.sent();
                if (!userDB) {
                    throw new Error('userDB not found');
                }
                res.send({ ok: true, userDB: userDB });
                return [3 /*break*/, 3];
            case 2:
                error_3 = _a.sent();
                console.log(error_3);
                res.send({ error: error_3 });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
// Update User
// @route PUT /users/user-card/:id
// Access Private
exports.updateUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, userProp, userValue, userId, options, updateUser_1, error_4;
    var _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 2, , 3]);
                _a = req.body, userProp = _a.userProp, userValue = _a.userValue, userId = _a.userId;
                options = { "new": true };
                if (!userProp) {
                    res.status(400);
                    throw new Error('User not found');
                }
                return [4 /*yield*/, userModel_1["default"].findByIdAndUpdate({ _id: userId }, (_b = {}, _b[userProp] = userValue, _b), options)];
            case 1:
                updateUser_1 = _c.sent();
                console.log(userValue);
                if (updateUser_1[userProp] === userValue) {
                    console.log(updateUser_1);
                    res.send({ updateUser: updateUser_1 });
                }
                return [3 /*break*/, 3];
            case 2:
                error_4 = _c.sent();
                console.error(error_4);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.updateUserImage = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, picture, userId, result, options, updateUser_2, error_5;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, picture = _a.picture, userId = _a.userId;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                return [4 /*yield*/, cloudinary.uploader.upload(picture, {
                        folder: "users"
                    })];
            case 2:
                result = _b.sent();
                options = { "new": true };
                return [4 /*yield*/, userModel_1["default"].findByIdAndUpdate({ _id: userId }, { image: {
                            public_id: result.public_id,
                            url: result.secure_url
                        }
                    }, options)];
            case 3:
                updateUser_2 = _b.sent();
                res.send({
                    updateUser: updateUser_2
                });
                return [3 /*break*/, 5];
            case 4:
                error_5 = _b.sent();
                console.error(error_5);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
// Delete User
// @route DELETE /users/user-card/:id
// Access Private
exports.deleteUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log('hello');
                return [4 /*yield*/, userModel_1["default"].findById(req.params.id)];
            case 1:
                user = _a.sent();
                console.log(user.firstName);
                if (!user) {
                    res.status(400);
                    throw new Error('User not found');
                }
                return [4 /*yield*/, user.remove()];
            case 2:
                _a.sent();
                res.status(200).json({ id: req.params.id });
                return [2 /*return*/];
        }
    });
}); };
// Get User
// @route GET /users/get-user-card/:id
// Access Private
exports.getUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, user, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.params.id;
                return [4 /*yield*/, userModel_1["default"].findById(id)];
            case 1:
                user = _a.sent();
                res.send({ user: user });
                return [3 /*break*/, 3];
            case 2:
                error_6 = _a.sent();
                console.log(error_6);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
