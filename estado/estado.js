import { userServices } from "../service/user-service.js";


const logout = () => { 
    userServices.perfilUsuario().then((data) => {    
        data.forEach(() => {
                    userServices.actualizarEstado(1,false).then(()=> {
                        window.location.reload();
                    });
                                      
    })
})
}

const crearLogin = () => {

    //<a href="screens/crud.html" class="header__login">Login</a>
    const a = document.createElement("a");
    a.className = "header__login";
    a.innerHTML = "Iniciar sesión";
    a.setAttribute("href","screens/crud.html");
    const sticky = document.querySelector(".sticky__header");
    sticky.appendChild(a);

}

const crearLogout = () => {

    //<a href="screens/crud.html" class="header__login">Login</a>
    const a = document.createElement("a");
    a.className = "header__logout";
    a.innerHTML = "Cerrar sesión";
    a.addEventListener("click", () => {
        logout();
    })
    const sticky = document.querySelector(".sticky__header");
    sticky.appendChild(a);

}

const crearAdm = () => {

    //<a href="screens/crud.html" class="header__login">Login</a>
    const a = document.createElement("a");
    a.className = "header__adm";
    a.innerHTML = "Administrar Productos";
    a.setAttribute("href","screens/crud.html");
    const sticky = document.querySelector(".sticky__header");
    sticky.appendChild(a);

}

const verificarEstado = () => {

    userServices.perfilUsuario().then((data) => {
        let estado = data[0].estado;
        console.log("el estado es ",estado);
        if (estado == "false"){
            crearLogin();
        }
        else{
            crearLogout();
            crearAdm();

        }
    });
}



verificarEstado();

