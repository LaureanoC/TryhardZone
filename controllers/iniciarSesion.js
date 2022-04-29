import { userServices } from "../service/user-service.js";
import { productoServices } from "../service/product-service.js";

var agregado = false;


const borrarError = (tipoinput) => {

    const p = document.querySelector(`#${tipoinput}`);
    console.log(p);
    p.remove();

}


const validarRegistro = (fileDom,nombreDom, precioDom, descripcionDom) => {


    let urlfile = fileDom.value;
    let nombre = [nombreDom.value , "Nombre del producto"];
    let precio = [precioDom.value, "Precio del producto"];
    let descripcion = [descripcionDom.value, "Descripción del producto"];

    let numeros = new RegExp ();
    numeros = /^\d+$/; 
    


}

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

const crearModal = (link,tipoSeccion) => {

    const modal = document.createElement("div");
    modal.className = "modal"
    modal.id = "modal";

    const contenedor = document.createElement("div");
    contenedor.className = "modal__tituloconjunto";

    const h2 = document.createElement("h2");
    h2.className = "modal__titulo"
    h2.innerHTML = `Agregar producto ${devolverTipo(tipoSeccion)}`

    const icono = document.createElement("i");
    icono.className = " fa-solid fa-xmark";
    icono.addEventListener("click", (evento)=> {

        evento.target.parentNode.parentNode.remove();
        agregado = false;
        console.log("Haz hecho click en agregar producto ", devolverTipo(tipoSeccion));

    })
    

    const div = document.createElement("div");
    div.className = "modal__formConjunto"

    const label = document.createElement("label");
    label.className = "modal__label"
    label.setAttribute("for","image");

    const input = document.createElement("input");
    input.className = "modal__file"
    input.setAttribute("type","file");
    input.setAttribute("name","image");

    const div1 = document.createElement("div");
    div1.className = "modal__formConjunto"

    const label1 = document.createElement("label");
    label1.className = "modal__label"
    label1.setAttribute("for","nombrep");

    const input1 = document.createElement("input");
    input1.className = "modal__input"
    input1.setAttribute("name","nombrep");
    input1.setAttribute("placeholder", "Nombre del producto");

    const div2 = document.createElement("div");
    div2.className = "modal__formConjunto"

    const label2 = document.createElement("label");
    label2.className = "modal__label"
    label2.setAttribute("for","preciop");

    const input2 = document.createElement("input");
    input2.className = "modal__input"
    input2.setAttribute("name","preciop");
    input2.setAttribute("placeholder", "Ingrese precio del producto");

    const div3 = document.createElement("div");
    div3.className = "modal__formConjunto"

    const label3 = document.createElement("label");
    label3.className = "modal__label"
    label3.setAttribute("for","descripcionp");

    const input3 = document.createElement("input");
    input3.className = "modal__input"
    input3.setAttribute("name","descripcionp");
    input3.setAttribute("placeholder", "Descripción del producto");


    const agregarb = document.createElement("div");
    agregarb.className = "modal__agregarP"
    agregarb.innerHTML = "Agregar producto"

    agregarb.addEventListener("click", (evento)=> {

        if(validarRegistro(input,input1,input2,input3)){

        evento.target.parentNode.remove();
        agregado = false;
        console.log("PRODUCTO Agregado ", devolverTipo(tipoSeccion));
        } else {

            console.log("PRODUCTO Rechazado");
        }

        

    })

    div3.appendChild(label3);
    div3.appendChild(input3);

    div2.appendChild(label2);
    div2.appendChild(input2);

    div1.appendChild(label1);
    div1.appendChild(input1);

    div.appendChild(label);
    div.appendChild(input);

    contenedor.appendChild(h2);
    contenedor.appendChild(icono);

    modal.appendChild(contenedor);
    modal.appendChild(div);
    modal.appendChild(div1);
    modal.appendChild(div2);
    modal.appendChild(div3);
    modal.appendChild(agregarb);

    link.appendChild(modal);

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

            if(agregado == false){
                agregado = true;
                crearModal(section,tipoSeccion);
                
                console.log("Haz hecho click en la categoria ", titulo);
            }
            
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



