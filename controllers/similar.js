import { productoServices } from "../service/product-service.js"

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

const crearNuevaCard = (nombre, precio, imagen,id) => {
    const card = document.createElement("div");
    card.className = "categorias__card";
    card.id = "producto";
    /*const contenido = `
        <a class = "card__redireccion" href="similar.html#${id}">
        <img class="card__img"src="${imagen}">
        </a>
        <p class="card__nombre">${nombre}</p>
        <p class="card__precio">${precio}</p>
        <a class="card__link" href="similar.html#${id}">Ver producto</a>    
    `;*/

    const aimg = document.createElement("a");
        aimg.className = "card__redireccion";
        aimg.setAttribute("href",`similar.html#${id}`);
        aimg.addEventListener("click", ()=> {
            setTimeout(()=> {
                window.location.reload();
            }, 500);
           

        })

    const img = document.createElement("img");
    img.className = "card__img";
    img.setAttribute("src",imagen);

    const p1 = document.createElement("p");
        p1.className = "card__nombre";
        p1.innerHTML = nombre;

    const p2 = document.createElement("p");
        p2.className = "card__precio";
        p2.innerHTML = precio;

    const a = document.createElement("a");
        a.className = "card__link";
        a.innerHTML = "Ver producto"
        a.setAttribute("href",`similar.html#${id}`);
        a.addEventListener("click", ()=> {
            window.location.reload();
        })

    aimg.appendChild(img);
    card.appendChild(aimg);
    card.appendChild(p1);
    card.appendChild(p2);
    card.appendChild(a);

    return card
}


const crearSectionSeleccionado = (nombre,precio,imagen,descripcion,tipo) => {
    
    const section = document.createElement("section");
    section.className = "producto";
    section.innerHTML = `<img class="producto__imagen" src="${imagen}">
    <div class="producto__conjunto">
        <h1 class="producto__titulo">${nombre}</h1>
        <p class="producto__precio">${precio}</p>
        <p class="producto__descripcion">${descripcion}<p>
    </div>`

    const main = document.querySelector("[data-main]");
    main.appendChild(section);
    return tipo

}

const mostrarSimilares = () => {

    const idparametro = validarBusqueda();
    var tipoProducto;
    productoServices.listaProducto().then((respuesta)=> {

        respuesta.forEach(({id,nombre,precio,imagen,descripcion,tipo})=> {

            if(id == idparametro){
                
            tipoProducto = crearSectionSeleccionado(nombre,precio,imagen,descripcion,tipo);
                
            }
        })
        
        
        const section = document.createElement("section");
        section.className = "categorias__contenido";

        const h2 = document.createElement("h2");
        h2.className = "productoSimilares__titulo";
        h2.innerHTML = `Ver más ${devolverTipo (tipoProducto)}`;

        const main = document.querySelector("[data-main]");
        section.appendChild(h2);
        

        respuesta.forEach(({id,nombre,precio,imagen,descripcion,tipo}) => {

            if ((tipo == tipoProducto) && (id !=idparametro)){

                let card = crearNuevaCard(nombre, precio, imagen,id);
                section.appendChild(card);
                
            }

        })
        main.appendChild(section);

    })

}

const validarBusqueda  = () => {

    const idR = /[a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12}/;
   
    let url = window.location.href;
    //console.log(url);
    //let aux = "#";
    //console.log(url.indexOf(aux));
    let parametros = url.slice(43);
    if (idR.test(parametros)){
        return parametros
    } else {
        alert("No se encontró");
    }
    //console.log(parametros);
    
    
}

mostrarSimilares();


