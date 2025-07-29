
const loginForm = document.getElementById("loginForm")
console.log(loginForm);


loginForm.addEventListener("submit",(e) => {
    e.preventDefault()

    const username = document.getElementById("username").value
    const password = document.getElementById("password").value
    const message = document.getElementById("message")

    const formData = new FormData()

    formData.append("username",username)
    formData.append("password",password)

    api.post(`/user/login`,formData)
    .then((res) => {
        localStorage.setItem("accesToken",res.data.accessToken)
        localStorage.setItem("refreshToken",res.data.refreshToken)
        message.classList = 'text-success'
        message.innerHTML = `${res.data.message}`
        setTimeout(() => {
            window.location.href = `../../index.html`
        }, 2000);
        
    })
    .catch((error) => {
        message.classList = "text-danger"
        message.innerHTML = `${error.response.data.message}`
        console.log(error.response.data.message);
        
    })
})