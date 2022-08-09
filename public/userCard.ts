const getUserId = () => {
     try {
     const queryString = window.location.search  
     const urlParams = new URLSearchParams(queryString)
     const userId = urlParams.get('userId')
     return userId
     } catch (error) {
          console.error(error)
          return false
     }
}


// get User name on "start game" page
const handleLoad = () => {
     renderGamePageUser()
}

// render User for game page
const renderGamePageUser = async() => {
     const userID = getUserId() 
     //@ts-ignore
     const { data } = await axios.get(`/users/get-user-card/${userID}`)
     const { user } = data
     
     const userCardId = document.querySelector('#userCardId')
     userCardId.innerHTML = 
          `
               <a href='userCard.html?userId=${userID}'>
                    <h1>Hello ${user.firstName}</h1>
               </a>
          `
}

// render User on User Page
const handleLoadUser = () => {
     renderUserImage()
     renderUserCard()
}




let picture
// upload User image on User page
 function handleProfileCard(ev) {
     ev.preventDefault()
     const file = ev.target.files[0]
     const reader = new FileReader()
     reader.readAsDataURL(file)
     reader.onload = () => {
        picture = reader.result
        handleProfileCardSend() 
        document.querySelector('.imageCont').innerHTML = 
                                                       `  
                                                       <p>Loading</p>      
                                                       <lottie-interactive style="width: 50px; height: 50px;" id="preloader" path="./lottieAnimations/preloader.json" speed="1.3" loop controls autoplay></lottie-interactive>
                                                       `            
     }          
}

// upload image file to "onchange" input
async function handleProfileCardSend() {
     console.log(picture);
     const userId = getUserId()         
     //@ts-ignore
     const { data } = await axios.patch('/users/update-user-image', {
          picture,
          userId
     })
     const { updateUser } = data
     const imageDB = updateUser.image.url
          if(imageDB) {
               document.querySelector('.imageCont').innerHTML = 
               `
               <img src="${imageDB}" alt="" id="imageUserCard" >

               `
          }
}

// render User Image
const renderUserImage = async() => {
     try {
          const userID = getUserId() 
          //@ts-ignore
          const { data } = await axios.get(`/users/get-user-card/${userID}`)
          const { user } = data
          const userImageWrapper = document.querySelector('.userImageWrapper') 
    
          if( !user.image ) {
               userImageWrapper.innerHTML = `
                    <div class="imageCont">
                         <label for="uploadImageProfile">
                              <div class="uploadFolder">
                                   <p>Upload Image</p>
                                   <lottie-interactive accessKey="lottie" lang="animation" style="width: 35px; height: 35px; " path="./lottieAnimations/upload-icon.json" interaction="morph"></lottie-interactive>
                                   <input onchange="handleProfileCard(event)" type="file" name="uploadImageProfile" id="uploadImageProfile">
                              </div>
                         </label>
                    </div>
                    `
          } else {
               document.querySelector('.userImageWrapper').innerHTML = ` 
               <div class="imageCont">                                                  
                    <img src="${user.image.url}" alt="" id="imageUserCard" >                  
               </div>
               ` 
          }

     } catch (error) {
          console.error(error)
     }
}

// render User on User card page
const renderUserCard = async() => {
     const userID = getUserId() 
     //@ts-ignore
     const { data } = await axios.get(`/users/get-user-card/${userID}`)
     const { user } = data
     const root2 = document.querySelector('#root2')
     root2.innerHTML = `
     <div class="userCardWrapper">

          <div class="userParamCont">
               <p>First name: ${user.firstName}</p>

               <button id="buttonEdit" style=  "margin-bottom: 0.7rem;" onclick = "handleLoadUserCard(event)" name="firstName" >
                    <lottie-interactive accessKey="firstName" lang="text" style="width: 25px; height: 30px; " path="./lottieAnimations/edit-icon-vector.json" interaction="morph"></lottie-interactive>
               </button>
          </div>
          
          <div class="userParamCont ">
               <p>Last name: ${user.lastName}</p>

               <button id="buttonEdit" style=  "margin-bottom: 0.7rem;" onclick = "handleLoadUserCard(event)" name="lastName" >
                    <lottie-interactive accessKey="lastName" lang="text" style="width: 25px; height: 30px; " path="./lottieAnimations/edit-icon-vector.json" interaction="morph"></lottie-interactive>
               </button>
          </div>

          <div class="userParamCont ">
               <p>Phone number: ${user.phoneNum}</p>

               <button id="buttonEdit" style=  "margin-bottom: 0.7rem;" onclick = "handleLoadUserCard(event)" name="phoneNum" >
                    <lottie-interactive accessKey="phoneNum" lang="number" style="width: 25px; height: 30px; " path="./lottieAnimations/edit-icon-vector.json" interaction="morph"></lottie-interactive>
               </button>
          </div>

          <div class="userParamCont ">
               <p>Birth date: ${user.birthDate}</p>

               <button id="buttonEdit" style=  "margin-bottom: 0.7rem;" onclick = "handleLoadUserCard(event)" name="birthDate" >
                    <lottie-interactive accessKey="birthDate" lang="date" style="width: 25px; height: 30px; " path="./lottieAnimations/edit-icon-vector.json" interaction="morph"></lottie-interactive>
               </button>
          </div>

          <div class="userParamCont ">
               <p>Email: ${user.email}</p>

               <button id="buttonEdit" style=  "margin-bottom: 0.7rem;" onclick = "handleLoadUserCard(event)" name="email" >
                    <lottie-interactive accessKey="email" lang="email" style="width: 25px; height: 30px; " path="./lottieAnimations/edit-icon-vector.json" interaction="morph"></lottie-interactive>
               </button>
          </div>
     </div>
               `
}


// get the User for an update
const handleLoadUserCard = (ev) => {
     try {
          console.log(ev);
          ev.stopPropagation()
          ev.preventDefault()
          const name = ev.target.accessKey;
          const type = ev.target.lang
          const userId = getUserId()
          renderInput(name, type)
     } catch (error) {
          console.error(error)
     }
}


// render new input of User
const renderInput = (userName, type) => {
     // const inputClass = document.querySelector(`img[name="${userName}"]`);
     const inputClass = document.querySelector(`button[name="${userName}"]`);

          inputClass.parentElement.innerHTML = 
               `                  
               <form name="editFrom" id="editUserForm" onsubmit = "handleUpdateUser(event)">
                    <input type='${type}' name='${[userName]}'>   
               </form>
                    
               <button id="editIcon"  form="editUserForm" type="submit" class="lottieSaveContainer">
                    <lottie-interactive path="./lottieAnimations/lottieAnimSave.json" interaction="click"></lottie-interactive>
               </button>
                    `
               }



// submit edited User form
const handleUpdateUser= async(ev) => {
     try {
          ev.preventDefault();
          const arrProp = [ 'firstName', 'lastName', 'phoneNum', 'birthDate', 'email' ]
          const userId = getUserId()

          let userProp
          for (let i=0; i<ev.target.elements.length; i++) {
               for (let j=0; j<arrProp.length; j++) {
                    if (ev.target.elements[i].name === arrProp[j]) {
                         userProp = ev.target.elements[i].name
                    }
               }
          }

          let userValue = ev.target[userProp].value
          ev.target.reset();
          //@ts-ignore
          const { data } = await axios.patch('/users/update-user', {
               userId,
               userValue,
               userProp  
          })

          const { updateUser } = data
          if (updateUser) {
               renderUserCard()
          }
     } catch (error) {
          console.log(error); 
     }
}












