import { userServices } from "../service/user-service.js";

const logout = () => { 
    userServices.perfilUsuario().then((data) => {    
        data.forEach(() => {
                    userServices.actualizarEstado(1,false);                   
    })
})
}

const cambiarLogOutALogin = () => {
    const headerLogout = document.querySelector(".header__login");
    headerLogout.innerHTML = "Cerrar sesión";
    headerLogout.style.color = "red";
    headerLogout.style.border = "solid red 1px";
    headerLogout.removeAttribute("href");
    headerLogout.addEventListener("click", ()=> {
        logout();
    })
}



const verificarEstado = () => {
    userServices.perfilUsuario().then((data) => {
        let estado = data[0].estado;
        console.log("el estado es ",estado);
        if (estado == "false"){
            const btnLogin = document.querySelector(".header__login");
            btnLogin.addEventListener("click", ()=> {
                window.location.href = "../screens/crud.html"
            })
            
        } else {
            cambiarLogOutALogin();
        }
    });
}



verificarEstado();

