var signInBtn = document.querySelector("#signInBtn");
var signUpBtn = document.querySelector("#signUpBtn");
var wrapper = document.querySelector(".wrapper").classList;
signUpBtn.addEventListener('click', function () {
    wrapper.add("signUpMode");
});
signInBtn.addEventListener('click', function () {
    wrapper.remove("signUpMode");
});
