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
var getUserId = function () {
    try {
        var queryString = window.location.search;
        var urlParams = new URLSearchParams(queryString);
        var userId = urlParams.get('userId');
        return userId;
    }
    catch (error) {
        console.error(error);
        return false;
    }
};
// get User name on "start game" page
var handleLoad = function () {
    renderGamePageUser();
};
// render User for game page
var renderGamePageUser = function () { return __awaiter(_this, void 0, void 0, function () {
    var userID, data, user, userCardId;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userID = getUserId();
                return [4 /*yield*/, axios.get("/users/get-user-card/" + userID)];
            case 1:
                data = (_a.sent()).data;
                user = data.user;
                userCardId = document.querySelector('#userCardId');
                userCardId.innerHTML =
                    "\n                    <a href='userCard.html?userId=" + userID + "'>\n                         <h1>Hello " + user.firstName + "</h1>\n                    </a>\n               ";
                return [2 /*return*/];
        }
    });
}); };
// render User on User Page
var handleLoadUser = function () {
    renderUserImage();
    renderUserCard();
};
var picture;
// upload User image on User page
function handleProfileCard(ev) {
    ev.preventDefault();
    var file = ev.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
        picture = reader.result;
        handleProfileCardSend();
        document.querySelector('.imageCont').innerHTML =
            "  \n                                                            <p>Loading</p>      \n                                                            <lottie-interactive style=\"width: 50px; height: 50px;\" id=\"preloader\" path=\"./lottieAnimations/preloader.json\" speed=\"1.3\" loop controls autoplay></lottie-interactive>\n                                                            ";
    };
}
// upload image file to "onchange" input
function handleProfileCardSend() {
    return __awaiter(this, void 0, void 0, function () {
        var userId, data, updateUser, imageDB;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log(picture);
                    userId = getUserId();
                    return [4 /*yield*/, axios.patch('/users/update-user-image', {
                            picture: picture,
                            userId: userId
                        })];
                case 1:
                    data = (_a.sent()).data;
                    updateUser = data.updateUser;
                    imageDB = updateUser.image.url;
                    if (imageDB) {
                        document.querySelector('.imageCont').innerHTML =
                            "\n                    <img src=\"" + imageDB + "\" alt=\"\" id=\"imageUserCard\" >\n\n                    ";
                    }
                    return [2 /*return*/];
            }
        });
    });
}
// render User Image
var renderUserImage = function () { return __awaiter(_this, void 0, void 0, function () {
    var userID, data, user, userImageWrapper, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                userID = getUserId();
                return [4 /*yield*/, axios.get("/users/get-user-card/" + userID)];
            case 1:
                data = (_a.sent()).data;
                user = data.user;
                userImageWrapper = document.querySelector('.userImageWrapper');
                if (!user.image) {
                    userImageWrapper.innerHTML = "\n                         <div class=\"imageCont\">\n                              <label for=\"uploadImageProfile\">\n                                   <div class=\"uploadFolder\">\n                                        <p>Upload Image</p>\n                                        <lottie-interactive accessKey=\"lottie\" lang=\"animation\" style=\"width: 30px; height: 40px; \" path=\"./lottieAnimations/upload-icon.json\" interaction=\"morph\"></lottie-interactive>\n                                        <input onchange=\"handleProfileCard(event)\" type=\"file\" name=\"uploadImageProfile\" id=\"uploadImageProfile\">\n                                   </div>\n                              </label>\n                         </div>\n                         ";
                }
                else {
                    document.querySelector('.userImageWrapper').innerHTML = " \n                    <div class=\"imageCont\">                                                  \n                         <img src=\"" + user.image.url + "\" alt=\"\" id=\"imageUserCard\" >                  \n                    </div>\n                    ";
                }
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                console.error(error_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
// render User on User card page
var renderUserCard = function () { return __awaiter(_this, void 0, void 0, function () {
    var userID, data, user, root2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userID = getUserId();
                return [4 /*yield*/, axios.get("/users/get-user-card/" + userID)];
            case 1:
                data = (_a.sent()).data;
                user = data.user;
                root2 = document.querySelector('#root2');
                root2.innerHTML = "\n          <div class=\"userCardWrapper\">\n\n               <div class=\"userParamCont\">\n                    <p>First name: " + user.firstName + "</p>\n\n                    <button id=\"buttonEdit\" style= \"margin-right: 0.7rem; \"margin-bottom: 0.7rem;\" onclick = \"handleLoadUserCard(event)\" name=\"firstName\" >\n                         <lottie-interactive accessKey=\"firstName\" lang=\"text\" style=\"width: 30px; height: 40px; \" path=\"./lottieAnimations/edit-icon-vector.json\" interaction=\"morph\"></lottie-interactive>\n                    </button>\n               </div>\n               \n               <div class=\"userParamCont \">\n                    <p>Last name: " + user.lastName + "</p>\n\n                    <button id=\"buttonEdit\" style= \"margin-right: 0.7rem; \"margin-bottom: 0.7rem;\" onclick = \"handleLoadUserCard(event)\" name=\"lastName\" >\n                         <lottie-interactive accessKey=\"lastName\" lang=\"text\" style=\"width: 30px; height: 40px; \" path=\"./lottieAnimations/edit-icon-vector.json\" interaction=\"morph\"></lottie-interactive>\n                    </button>\n               </div>\n\n               <div class=\"userParamCont \">\n                    <p>Phone number: " + user.phoneNum + "</p>\n\n                    <button id=\"buttonEdit\" style= \"margin-right: 0.7rem; \"margin-bottom: 0.7rem;\" onclick = \"handleLoadUserCard(event)\" name=\"phoneNum\" >\n                         <lottie-interactive accessKey=\"phoneNum\" lang=\"number\" style=\"width: 30px; height: 40px; \" path=\"./lottieAnimations/edit-icon-vector.json\" interaction=\"morph\"></lottie-interactive>\n                    </button>\n               </div>\n\n               <div class=\"userParamCont \">\n                    <p>Birth date: " + user.birthDate + "</p>\n\n                    <button id=\"buttonEdit\" style= \"margin-right: 0.7rem; \"margin-bottom: 0.7rem;\" onclick = \"handleLoadUserCard(event)\" name=\"birthDate\" >\n                         <lottie-interactive accessKey=\"birthDate\" lang=\"date\" style=\"width: 30px; height: 40px; \" path=\"./lottieAnimations/edit-icon-vector.json\" interaction=\"morph\"></lottie-interactive>\n                    </button>\n               </div>\n     \n               <div class=\"userParamCont \">\n                    <p>Email: " + user.email + "</p>\n\n                    <button id=\"buttonEdit\" style= \"margin-right: 0.7rem; \"margin-bottom: 0.7rem;\" onclick = \"handleLoadUserCard(event)\" name=\"email\" >\n                         <lottie-interactive accessKey=\"email\" lang=\"email\" style=\"width: 30px; height: 40px; \" path=\"./lottieAnimations/edit-icon-vector.json\" interaction=\"morph\"></lottie-interactive>\n                    </button>\n               </div>\n          </div>\n                    ";
                return [2 /*return*/];
        }
    });
}); };
// get the User for an update
var handleLoadUserCard = function (ev) {
    try {
        console.log(ev);
        ev.stopPropagation();
        ev.preventDefault();
        var name = ev.target.accessKey;
        var type = ev.target.lang;
        var userId = getUserId();
        renderInput(name, type);
    }
    catch (error) {
        console.error(error);
    }
};
// render new input of User
var renderInput = function (userName, type) {
    // const inputClass = document.querySelector(`img[name="${userName}"]`);
    var inputClass = document.querySelector("button[name=\"" + userName + "\"]");
    inputClass.parentElement.innerHTML =
        "                  \n                    <form name=\"editFrom\" id=\"editUserForm\" onsubmit = \"handleUpdateUser(event)\">\n                         <input type='" + type + "' name='" + [userName] + "'>   \n                         </form>\n                         \n                         <button id=\"editIcon\" style= \"margin-top: 0.2rem;\" form=\"editUserForm\" type=\"submit\" class=\"lottieSaveContainer\">\n                              <lottie-interactive path=\"./lottieAnimations/lottieAnimSave.json\" interaction=\"click\"></lottie-interactive>\n                         </button>\n                         ";
};
// submit edited User form
var handleUpdateUser = function (ev) { return __awaiter(_this, void 0, void 0, function () {
    var arrProp, userId, userProp, i, j, userValue, data, updateUser, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                ev.preventDefault();
                arrProp = ['firstName', 'lastName', 'phoneNum', 'birthDate', 'email'];
                userId = getUserId();
                userProp = void 0;
                for (i = 0; i < ev.target.elements.length; i++) {
                    for (j = 0; j < arrProp.length; j++) {
                        if (ev.target.elements[i].name === arrProp[j]) {
                            userProp = ev.target.elements[i].name;
                        }
                    }
                }
                userValue = ev.target[userProp].value;
                ev.target.reset();
                return [4 /*yield*/, axios.patch('/users/update-user', {
                        userId: userId,
                        userValue: userValue,
                        userProp: userProp
                    })];
            case 1:
                data = (_a.sent()).data;
                updateUser = data.updateUser;
                if (updateUser) {
                    renderUserCard();
                }
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                console.log(error_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
