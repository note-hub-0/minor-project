const Url = `/user/get/currect-user`
const accessToken = localStorage.getItem("accessToken")
const refreshToken = localStorage.getItem("refreshToken")
const profile_pic = document.getElementById("profile-pic")
const loging = document.getElementById("login")

// if (accessToken || refreshToken) {
//   loging.style.display = "none"
//   profile_pic.style.display = "block"
//   // api.get(`${Url}`,{
//   //     headers: {
//   //   Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
//   // },
//   // })
//   // .then((res) => {
//   //   console.log(res);
    
//   // })
//   // .catch((error) => {
//   //   console.log(error);
    
//   // })
// }else{
//   loging.style.display = "block" 
//   profile_pic.style.display = "none"
// }