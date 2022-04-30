import { userServices } from "../service/user-service.js";
import { productoServices } from "../service/product-service.js";

var agregado = false;
var editando = false;

const validarTexto = (texto) => {
    if(texto != "") {
        return true
    }
    else {
        return false
    }
}

const validarPrecio = (precio) => {
    let numeros = new RegExp ();
    numeros = /^\d+$/;

    if(numeros.test(precio)){
        return true
    } else {
        return false
    }
}

const validarImagen = (urlimg) => {

    let url = new RegExp;
    url = /.png|.jpg|.svg/;

    if(url.test(urlimg)){
        return true
    }else {
        return false
    }

}

const crearError = (error) => {
    const p = document.createElement("p");
    p.className = "modal__error";
    p.innerHTML = `${error}`
    const div = document.querySelector(".modal__contenedorError");
    div.appendChild(p);
}

const actualizarPantalla = (estados) => {

    const contenedor = document.querySelector(".modal__contenedorError");
    contenedor.remove();
    const contenedor2 = document.createElement("div");
    contenedor2.className = "modal__contenedorError"
  
    const btn = document.querySelector(".modal__agregarP");
    btn.insertAdjacentElement("beforebegin",contenedor2);

    if(estados[0] == false){

        crearError("Se debe seleccionar un archivo con formato .png .svg ó .jpg");
    }

    if(estados[1] == false){

        crearError("El campo Nombre del producto no puede estar vacío");
    }

    if(estados[2] == false){

        crearError("El campo Precio no puede estar vacío y debe contener solo digitos");
    }

    if(estados[3] == false){

        crearError("El campo Descripción del producto no puede estar vacío");
    }

}


const validarRegistro = (fileDom,nombreDom, precioDom, descripcionDom) => {

    let urlfile = fileDom.value;
    let nombre = nombreDom.value
    let precio = precioDom.value
    let descripcion = descripcionDom.value
     
    let estadoRegistro = [];
    estadoRegistro.push(validarImagen(urlfile));
    estadoRegistro.push(validarTexto(nombre));
    estadoRegistro.push(validarPrecio(precio));
    estadoRegistro.push(validarTexto(descripcion));
    
    actualizarPantalla(estadoRegistro);

    //console.log(estadoRegistro);

    if(estadoRegistro[0] && estadoRegistro[1] && estadoRegistro[2] && estadoRegistro[3]){
        return true
    } else {
        return false
    }

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

    const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/laureano/upload";
    const CLOUDINARY_UPLOAD_PRESET = "eiijfx6t";
    var urlimagen = "";
    input.addEventListener("change", (e)=> {

        const file = e.target.files[0];  //Imagen seleccionada

        const formData = new FormData();    
        formData.append("file",file);
        formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
        axios.post(CLOUDINARY_URL, formData, {
            headers:{
                "Content-Type": "multipart/form-data"
            }
        }).then((res)=>{
            urlimagen = res.data.secure_url;
            console.log(urlimagen);
        }).catch(error => console.log(error));
    });

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

    const div4 = document.createElement("div");
    div4.className = "modal__contenedorError";

    const agregarb = document.createElement("div");
    agregarb.className = "modal__agregarP"
    agregarb.innerHTML = "Agregar producto"
    agregarb.addEventListener("click", (evento)=> {

        if(validarRegistro(input,input1,input2,input3)){

        productoServices.registrarProducto(urlimagen,input1.value,input2.value,input3.value,tipoSeccion)
        .then((respuesta) => console.log(respuesta.json()))
        .catch((error) => console.log(error));

        console.log("PRODUCTO Agregado ", devolverTipo(tipoSeccion));
        evento.target.parentNode.remove();
        agregado = false;

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
    modal.appendChild(div4);
    modal.appendChild(agregarb);

    link.appendChild(modal);

}

const editarModal = (link,tipoSeccion,id,nombre) => {

    const modal = document.createElement("div");
    modal.className = "modal"
    modal.id = "modal";

    const contenedor = document.createElement("div");
    contenedor.className = "modal__tituloconjunto";

    const h2 = document.createElement("h2");
    h2.className = "modal__titulo"
    h2.innerHTML = `Editar el producto ${nombre}`

    const icono = document.createElement("i");
    icono.className = " fa-solid fa-xmark";
    icono.addEventListener("click", (evento)=> {

        evento.target.parentNode.parentNode.remove();
        editando = false;
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

    const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/laureano/upload";
    const CLOUDINARY_UPLOAD_PRESET = "eiijfx6t";
    var urlimagen = "";
    input.addEventListener("change", (e)=> {

        const file = e.target.files[0];  //Imagen seleccionada

        const formData = new FormData();    
        formData.append("file",file);
        formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
        axios.post(CLOUDINARY_URL, formData, {
            headers:{
                "Content-Type": "multipart/form-data"
            }
        }).then((res)=>{
            urlimagen = res.data.secure_url;
            console.log(urlimagen);
        }).catch(error => console.log(error));
    });

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

    const div4 = document.createElement("div");
    div4.className = "modal__contenedorError";

    const agregarb = document.createElement("div");
    agregarb.className = "modal__agregarP"
    agregarb.innerHTML = "Editar producto"
    agregarb.addEventListener("click", (evento)=> {

        if(validarRegistro(input,input1,input2,input3)){
        console.log(id)
        productoServices.actualizarProducto(input1.value,input2.value,urlimagen,input3.value,tipoSeccion,id)
        .then((respuesta) => console.log(respuesta.json()))
        .catch((error) => console.log(error));

        console.log("PRODUCTO editado ", devolverTipo(tipoSeccion));
        evento.target.parentNode.remove();
        editando = false;

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
    modal.appendChild(div4);
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

const crearNuevaCard = (nombre, precio, imagen,tipo,id) => {
    const card = document.createElement("div");
    card.className = "categorias__card"
    const contenido = `
        <img class="card__img"src="${imagen}">
        <p class="card__nombre">${nombre}</p>
        <p class="card__precio">${precio}</p>
        <a class="card__link" href="#">Ver producto</a>    
    `;
    const iconoPencil = document.createElement("i");
    iconoPencil.className = "fa-solid fa-pencil";

    iconoPencil.addEventListener("click", (e)=> {

        const section = document.querySelector(`[data-section${tipo}]`);
        
        if(editando == false){
            editando = true;
            editarModal(section,tipo,id,nombre);
        }
        

    })

    const iconoBorrar = document.createElement("i");
    iconoBorrar.className = "fa-solid fa-xmark";
    iconoBorrar.id="borrar";
    iconoBorrar.addEventListener("click", (e)=> {

        e.target.parentNode.remove();
        productoServices.eliminarProducto(id);
        console.log("Haz hecho click en ", id);

    })

    card.innerHTML = contenido;
    card.insertAdjacentElement("afterbegin",iconoPencil);
    card.insertAdjacentElement("afterbegin",iconoBorrar);
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
        data.forEach( ({nombre,precio,imagen,tipo,id}) => {
            const div = document.querySelector(`[data-section${tipo}]`);
            const nuevoProducto = crearNuevaCard(nombre,precio,imagen,tipo,id);
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


verificarEstado();


