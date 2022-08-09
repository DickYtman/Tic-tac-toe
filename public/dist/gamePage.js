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
var root = document.querySelector('#root');
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
var handleGetUser = function () { return __awaiter(void 0, void 0, void 0, function () {
    var userId, data, user, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                userId = getUserId();
                return [4 /*yield*/, axios.post('/users/user-card', {
                        userId: userId
                    })];
            case 1:
                data = (_a.sent()).data;
                user = data.user;
                root.innerHTML = "Hello " + user.firstName + "!";
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                console.log(error_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var handleLoad = function () {
    handleGetUser();
};
var cells = document.querySelectorAll("block");
var statusText = document.querySelector("statusText");
var restartBtn = document.querySelector("restartBtn");
var winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8,],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6,]
];
var options = ["", "", "", "", "", "", "", "", ""];
var currentPlayer = "X";
var running = false;
initializeGame();
//function that initialize the game
function initializeGame() {
    cells.forEach(function (block) { return block.addEventListener("click", cellClicked); });
    //  restartBtn.addEventListener("click", restartGame)
    statusText.textContent = currentPlayer + "'s turn";
}
function cellClicked() {
    var cellIndex = this.getAttribute("cellIndex");
    if (options[cellIndex] != "" || !running) {
        return;
    }
    updateCell(this, cellIndex);
    checkWinner();
    restartGame();
}
function updateCell(block, index) {
    options[index] = currentPlayer;
    block.textContent = currentPlayer;
}
function changePlayer() {
    currentPlayer = (currentPlayer == "X") ? "O" : "X";
    statusText.textContent = currentPlayer + "'s turn";
}
function checkWinner() {
    var roundWon = false;
    for (var i = 0; i < winConditions.length; i++) {
        var condition = winConditions[i];
        var cellA = options[condition[0]];
        var cellB = options[condition[1]];
        var cellC = options[condition[2]];
        if (cellA == "" || cellB == "" || cellC == "") {
            continue;
        }
        if (cellA == cellB && cellB == cellC) {
            roundWon = true;
            break;
        }
    }
    if (roundWon) {
        statusText.textContent = currentPlayer + " wins!";
        running = false;
    }
    else if (options.includes("")) {
        statusText.textContent = "Draw!";
        running = false;
    }
    else {
        changePlayer();
    }
}
function restartGame() {
    currentPlayer = "X";
    options = ["", "", "", "", "", "", "", "", ""];
    statusText.textContent = currentPlayer + "'s turn";
    cells.forEach(function (block) { return block.textContent = ""; });
    running = true;
}
