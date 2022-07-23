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
exports.deleteUser = exports.updateUser = exports.loginUser = exports.registerUser = void 0;
var jsonwebtoken_1 = require("jsonwebtoken");
var bcryptjs_1 = require("bcryptjs");
var userModel_1 = require("../models/userModel");
var generateToken = function (id) {
    return jsonwebtoken_1["default"].sign({ id: id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });
};
// register new User
// @route Post /users/register-user
// access public
exports.registerUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, firstName, email, password, userExists, userError, salt, hashedPassword, user, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 5, , 6]);
                _a = req.body, firstName = _a.firstName, email = _a.email, password = _a.password;
                if (!firstName && !email && !password) {
                    res.status(400);
                    throw new Error('Please fill all the fields');
                }
                return [4 /*yield*/, userModel_1["default"].findOne({ email: email })];
            case 1:
                userExists = _b.sent();
                if (userExists) {
                    userError = (email + " already exists");
                    res.send(userError);
                    res.status(400);
                    throw new Error(email + " already exists");
                }
                return [4 /*yield*/, bcryptjs_1["default"].genSalt(10)];
            case 2:
                salt = _b.sent();
                return [4 /*yield*/, bcryptjs_1["default"].hash(password, salt)
                    //Create user
                ];
            case 3:
                hashedPassword = _b.sent();
                return [4 /*yield*/, userModel_1["default"].create({
                        firstName: firstName,
                        email: email,
                        password: hashedPassword
                    })];
            case 4:
                user = _b.sent();
                if (user) {
                    res.status(201).json({
                        _id: user.id,
                        firstName: user.firstName,
                        email: user.email,
                        password: user.password,
                        token: generateToken(user._id)
                    });
                }
                else {
                    res.status(400);
                    throw new Error('Invalid user data');
                }
                return [3 /*break*/, 6];
            case 5:
                error_1 = _b.sent();
                console.error(error_1);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
// login  User
// @route Post /users/login-user
// access public
exports.loginUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, userExists, _b, error_2;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 4, , 5]);
                _a = req.body, email = _a.email, password = _a.password;
                return [4 /*yield*/, userModel_1["default"].findOne({ email: email })];
            case 1:
                userExists = _c.sent();
                _b = userExists;
                if (!_b) return [3 /*break*/, 3];
                return [4 /*yield*/, bcryptjs_1["default"].compare(password, userExists.password)];
            case 2:
                _b = (_c.sent());
                _c.label = 3;
            case 3:
                if (_b) {
                    res.status(201).json({
                        id: userExists.id,
                        _id: userExists._id,
                        firstName: userExists.firstName,
                        email: userExists.email,
                        token: generateToken(userExists._id)
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
// Update User
// @route PUT /users/user-card/:id
// Access Private
exports.updateUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, updateUser;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, userModel_1["default"].findById(req.params.id)];
            case 1:
                user = _a.sent();
                if (!user) {
                    res.status(400);
                    throw new Error('User not found');
                }
                return [4 /*yield*/, userModel_1["default"].findByIdAndUpdate(req.params.id, req.body, {
                        "new": true
                    })];
            case 2:
                updateUser = _a.sent();
                res.status(200).json(updateUser);
                return [2 /*return*/];
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
                console.log(user);
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
