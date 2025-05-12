const btnSendInfo = document.getElementById("btnSendInfo")
function getInfo() {
    let name = document.getElementById("name").value
    let email = document.getElementById("email").value
    let userName = document.getElementById("userName").value
    let imgSrc = document.getElementById("imgPreview").src
    console.log(name+email+userName+imgSrc)
}

btnSendInfo.addEventListener('click', getInfo)