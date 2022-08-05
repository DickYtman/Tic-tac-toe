var signInBtn = document.querySelector("#signInBtn");
var signUpBtn = document.querySelector("#signUpBtn");
signUpBtn.addEventListener('click', function () {
    var signUp = document.getElementById("wrapper").classList;
    signUp.add("signUpMode");
});
signInBtn.addEventListener('click', function () {
    var signIn = document.getElementById("wrapper").classList;
    signIn.remove("signUpMode");
});
