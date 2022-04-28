import { userServices } from "../service/user-service.js";

const crearTemplate = () => {



}

const login = (u, p) => {

    userServices.perfilUsuario().then((data) => {
        console.log(data);

        data.forEach(({usuario, password}) => {
            if(usuario == u){
                if(password == p){
                    console.log("true"); //Aquí debo hacer una petición para modificar el estado del usuario tamb
                                        // debo agregar cerrar sesión para que tenga sentido
                } 
            }
        })
        
    })
    
}

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

