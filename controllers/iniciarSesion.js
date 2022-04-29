import { userServices } from "../service/user-service.js";

const logout = () => { 
    userServices.perfilUsuario().then((data) => {    
        data.forEach(() => {
                    userServices.actualizarEstado(1,false);
                    window.location.reload();                   
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
            /*console.log(data);
            console.log(data[0]);
            console.log(data[0].estado);*/
            let estado = data[0].estado;
            console.log("el estado es ",estado);

            if (estado == "false"){
                /*Mostrar formulario*/
                console.log("xD")
                const main = document.querySelector("main");
                main.innerHTML = `   
                <section class="login">
                <h1 class="login__titulo">Iniciar Sesión</h1>
                <form class="login__form">
                    <input name="usuario" type="text" class="form__usuario" id="usuario" placeholder="Escriba su usuario" data-usuario>
                    <input name="password" type="password" class="form__password" id="password" placeholder="Escriba su contraseña" data-password>
                    <button class="form__login">Ingresar</button>
                </form>
            </section>`
                const btnInicioSesion = document.querySelector(".form__login");
                console.log(btnInicioSesion);
                btnInicioSesion.addEventListener("click", (evento)=> {
                    evento.preventDefault();
                    const user = document.querySelector("[data-usuario]").value;
                    const pass = document.querySelector("[data-password]").value;
                    console.log(user, pass);
                    login(user,pass);
                    console.log(user, pass);
                })
            } else {
                cambiarLogOutALogin();
            }
        });
}



verificarEstado();

const login = (u, p) => {
    userServices.perfilUsuario().then((data) => {
        console.log(data);
        data.forEach(({usuario, password}) => {
            console.log(usuario);
            console.log(password);
            if(usuario == u){
                if(password == p){                   
                    userServices.actualizarEstado(1,true);
                    window.location.reload();
                    console.log("true"); //Aquí debo hacer una petición para modificar el estado del usuario tamb
                                        // debo agregar cerrar sesión para que tenga sentido
                } 
            }     
        })
        
    })
    
}



