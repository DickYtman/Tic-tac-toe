const signInBtn = document.querySelector("#signInBtn");
const signUpBtn = document.querySelector("#signUpBtn");

signUpBtn.addEventListener('click', () =>{
    const signUp = document.getElementById("wrapper").classList;
    signUp.add("signUpMode");
})

signInBtn.addEventListener('click', () =>{
    const signIn = document.getElementById("wrapper").classList;
    signIn.remove("signUpMode");
})



