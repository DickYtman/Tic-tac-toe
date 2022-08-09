const signInBtn = document.querySelector("#signInBtn");
const signUpBtn = document.querySelector("#signUpBtn");
const wrapper = document.querySelector(".wrapper").classList;


signUpBtn.addEventListener('click', () =>{
    wrapper.add("signUpMode");
})

signInBtn.addEventListener('click', () =>{
    wrapper.remove("signUpMode");
})



