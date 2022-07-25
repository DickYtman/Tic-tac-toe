const root = document.querySelector('#root')

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

const handleGetUser = async() => {
     try {
          const userId = getUserId()
          //@ts-ignore
          const { data } = await axios.post('/users/user-card', {
               userId
          })
          const { user } = data
          root.innerHTML = `Hello ${user.firstName}!`
     } catch (error) {
          console.log(error);
     } 
  }

  const handleLoad = () => {
     handleGetUser()
  }