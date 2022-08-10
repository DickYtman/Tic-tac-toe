const submitRegistration = document.querySelector('#submitRegistration')
const submitLogin = document.querySelector('#submitLogin')

const handleLoadCookie = (ev) => {
    getUserByCookie()
}

interface userRegister {
    _id,
    firstName: {
        value: string,
        type: string,
        name: string
    },
    email: {
        value: string,
        type: string,
        name: string
    },
    password: {
        value: number,
        type: string,
        name: string
    }
}

const handleRegistration = async (ev) => {
    try {
        const {
            firstName: { value: firstName },
            email: { value: email },
            password: { value: password },
        } = inputScraper(ev)

        const { data } = await axios.post('/users/user-register', {
            firstName,
            email,
            password
        })

        const { error, user, userError } = data
        console.log(error);
        if (error) {
            // document.querySelector('#errorUser').innerHTML = error.message
            alert(error)
        }
        
        if(userError) {
            alert(userError)
        }
        if (user) {
            window.location.href = `./tictactoe.html?userId=${user._id}`
        }

    } catch (error) {
        // alert(`Please fill all the fields`);  
        console.error(error)
    }
}

const handleLogin = async (ev) => {
    try {
        const {
            email: { value: email },
            password: { value: password }
        } = inputScraper(ev)
        const { data } = await axios.post('/users/user-login', {
            email,
            password
        })
        
        const { user } = data
      
        if (user) {
            window.location.href = `./tictactoe.html?userId=${user._id}`
        }
    } catch (error) {
 
        console.log(error);
    }
}


const getUserByCookie = async () => {
    try {
        const { data } = await axios.get('/users/get-user')

        const { userDB } = data
        if (userDB) {
            window.location.href = `./tictactoe.html?userId=${userDB._id}`
        }
    } catch (error) {
        console.log(error);
    }
}




const inputScraper = (event) => {
    event.preventDefault()
    let inputObject = {}
    const element = event.target

    for (let i = 0; i < element.length; i++) {
        if (element[i].name && element[i].value) {
            inputObject[element[i].name] = {
                value: element[i].value,
                name: element[i].name,
                type: element[i].type
            }
        } else {
            inputObject[element[i].name] = {
                value: '',
                name: element[i].name,
                type: element[i].type
            }
        }
    }
    event.target.reset();
    return inputObject

}



submitRegistration.addEventListener('submit', handleRegistration)
submitLogin.addEventListener('submit', handleLogin)