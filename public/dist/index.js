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
var _this = this;
var submitRegistration = document.querySelector('#submitRegistration');
var submitLogin = document.querySelector('#submitLogin');
var handleLoadCookie = function (ev) {
    getUserByCookie();
};
var handleRegistration = function (ev) { return __awaiter(_this, void 0, void 0, function () {
    var _a, firstName, email, password, data, error, user, userError, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = inputScraper(ev), firstName = _a.firstName.value, email = _a.email.value, password = _a.password.value;
                return [4 /*yield*/, axios.post('/users/user-register', {
                        firstName: firstName,
                        email: email,
                        password: password
                    })];
            case 1:
                data = (_b.sent()).data;
                error = data.error, user = data.user, userError = data.userError;
                console.log(error);
                if (error) {
                    // document.querySelector('#errorUser').innerHTML = error.message
                    alert(error);
                }
                if (userError) {
                    alert(userError);
                }
                if (user) {
                    window.location.href = "./tictactoe.html?userId=" + user._id;
                }
                return [3 /*break*/, 3];
            case 2:
                error_1 = _b.sent();
                // alert(`Please fill all the fields`);  
                console.error(error_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var handleLogin = function (ev) { return __awaiter(_this, void 0, void 0, function () {
    var _a, email, password, data, user, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = inputScraper(ev), email = _a.email.value, password = _a.password.value;
                return [4 /*yield*/, axios.post('/users/user-login', {
                        email: email,
                        password: password
                    })];
            case 1:
                data = (_b.sent()).data;
                user = data.user;
                if (user) {
                    window.location.href = "./tictactoe.html?userId=" + user._id;
                }
                return [3 /*break*/, 3];
            case 2:
                error_2 = _b.sent();
                console.log(error_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var getUserByCookie = function () { return __awaiter(_this, void 0, void 0, function () {
    var data, userDB, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, axios.get('/users/get-user')];
            case 1:
                data = (_a.sent()).data;
                userDB = data.userDB;
                if (userDB) {
                    window.location.href = "./tictactoe.html?userId=" + userDB._id;
                }
                return [3 /*break*/, 3];
            case 2:
                error_3 = _a.sent();
                console.log(error_3);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var inputScraper = function (event) {
    event.preventDefault();
    var inputObject = {};
    var element = event.target;
    for (var i = 0; i < element.length; i++) {
        if (element[i].name && element[i].value) {
            inputObject[element[i].name] = {
                value: element[i].value,
                name: element[i].name,
                type: element[i].type
            };
        }
        else {
            inputObject[element[i].name] = {
                value: '',
                name: element[i].name,
                type: element[i].type
            };
        }
    }
    event.target.reset();
    return inputObject;
};
submitRegistration.addEventListener('submit', handleRegistration);
submitLogin.addEventListener('submit', handleLogin);
