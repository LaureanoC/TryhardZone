import { userServices } from "../service/user-service.js";
import { productoServices } from "../service/product-service.js";

const devolverTipo = (tipoSeccion) => {

    if (tipoSeccion == "v"){
        return "Videojuegos"
    }
    if (tipoSeccion == "p"){
        return "Peluches"
    }
    if (tipoSeccion == "c"){
        return "Camisetas Esports"
    }

}

const crearBotonReferencia = (ref) =>{

    /* <a href="#videojuegos"><div class="banner__boton">Ver videojuegos</div></a>*/
    const d = document.createElement("div");
    d.className = "botonRedireccion";
    d.innerHTML = `Ir a ${devolverTipo(ref)}`
    const a = document.createElement("a");
    a.setAttribute("href",`#${ref}`);
    const main = document.querySelector(".redireccion");
    a.appendChild(d);
    main.appendChild(a);


}

const crearSection = (tipoSeccion) => {

    let titulo = devolverTipo(tipoSeccion);
   
    const referencia = document.createElement("a");
    referencia.setAttribute("name",`${tipoSeccion}`);
    const section = document.createElement("section");
        section.className = "categorias";
        const div = document.createElement("div");
        div.className = "categorias__contenido";
        div.setAttribute(`data-section${tipoSeccion}`,``);
    const div2 = document.createElement("div");
            div2.className = "categorias__header";
    const h2 = document.createElement("h2");
        h2.className = "categorias__titulo";
        h2.innerHTML = `${titulo}`;
    const link = document.createElement("a");
        link.className = "categorias__link";
        link.innerHTML = `Agregar producto <i class="fa-solid fa-plus"></i>`;

        link.addEventListener("click", () => {

            console.log("Haz hecho click en la categoria ", titulo);
        })


    const main = document.querySelector(".espaciado");
    div2.appendChild(h2);
    div2.appendChild(link);
    div.appendChild(div2);
    section.appendChild(div);
    main.appendChild(referencia);
    main.appendChild(section);
    
} 

const crearNuevaCard = (nombre, precio, imagen) => {
    const card = document.createElement("div");
    card.className = "categorias__card"
    const contenido = `
        <img class="card__img"src="${imagen}">
        <p class="card__nombre">${nombre}</p>
        <p class="card__precio">${precio}</p>
        <a class="card__link" href="#">Ver producto</a>    
    `;
    card.innerHTML = contenido;
    return card
}

const mostrarProductos = () => {

    const flex = document.createElement("div");
    flex.className="redireccion"
    const m = document.querySelector(".espaciado");
    m.appendChild(flex);
    
    crearBotonReferencia("v");
    crearBotonReferencia("c");
    crearBotonReferencia("p");

    crearSection("v");
    crearSection("c");
    crearSection("p");

    
    
    productoServices.listaProducto().then((data) => {
        console.log(data);
        data.forEach( ({nombre,precio,imagen,tipo}) => {
            const div = document.querySelector(`[data-section${tipo}]`);
            const nuevoProducto = crearNuevaCard(nombre,precio,imagen);
            div.appendChild(nuevoProducto);
        })
    })
console.log("xd");
}

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
                mostrarProductos();
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



