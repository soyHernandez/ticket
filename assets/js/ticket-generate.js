
const btnSendInfo = document.getElementById("btnSendInfo")
function getInfo() {
    const ticketInfo = document.getElementById('ticketInfo')
    const gitInfo = document.getElementById('gitInfo')
    const textPrincipal = document.getElementById('textPrincipal')
    const textSecundary = document.getElementById('finish-text')
    const ticketName = document.getElementById('ticketName')
    const ticketEmail = document.getElementById('ticketEmail')
    let name = document.getElementById("name").value
    let email = document.getElementById("email").value
    let userName = document.getElementById("userName").value
    let resultEmail = checkEmail(email)
    let resultUser = checkUser(userName)
    let resultUserName = checkUserName(name)
    
    if(resultEmail == 200 && resultUser == 200 && resultUserName == 200){
        const form = document.getElementById('formTicket').style.display="none"
        const prevImg = document.getElementById('imgPreview2').src = document.getElementById('imgPreview').src
        const ticket = document.getElementById('containerTicket').style.display = "flex"
        ticketInfo.children[0].textContent = name
        gitInfo.children[1].textContent = userName
        ticketName.textContent = name + "!"
        ticketEmail.textContent = email
        textPrincipal.style.display = "none"
        textSecundary.style.display = "block"
    }
}

btnSendInfo.addEventListener('click', getInfo)
function error(container, menssage, icon) {
    container.style.display="flex";
    menssage.style.color="red";
    menssage.style.fontWeight ="300";
    icon.style.filter = 'sepia(1) hue-rotate(302deg) saturate(50)';
}

function checkEmail(email) {
    let msgIco = document.getElementById("errorEmail")
    // Verificar que el campo no esté vacío
    if (!email) {
        error(msgIco,msgIco.children[1],msgIco.children[0]);
    }
    // Expresión regular para validar el formato del correo electrónico
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    // Comprobar si el correo electrónico cumple con el formato
    if (!regex.test(email)) {
        error(msgIco,msgIco.children[1],msgIco.children[0])
    }
    else{
        if (msgIco.style.display == "flex") {
            msgIco.style.display = "none"
        }
        return "200"
    }
}

function checkUser(user) {
    let msgIco = document.getElementById("errorUser")
    // Verificar que el campo no esté vacío
    if (!user) {
        error(msgIco,msgIco.children[1],msgIco.children[0]);
        return
    }

    // Expresión regular para validar que empiece con @ seguido de caracteres alfanuméricos
    const regex = /^@[a-zA-Z0-9]+$/;

    // Comprobar si cumple el formato
    if (!regex.test(user)) {
        error(msgIco,msgIco.children[1],msgIco.children[0]);
        return
    }else{
        if (msgIco.style.display == "flex") {
            msgIco.style.display = "none"
        }
        return "200"
    }

}

function checkUserName(userName) {
    let msgIco = document.getElementById("infoUserName")
    // Verificar que el campo no esté vacío
    if (!userName) {
        error(msgIco,msgIco.children[1],msgIco.children[0]);
        return
    }else{
        return "200"
    }

}

