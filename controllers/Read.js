import { productoServices } from "../service/product-service.js";

const crearNuevaCard = (nombre, precio, imagen,tipo,id) => {
    const card = document.createElement("div");
    card.className = "categorias__card"
    const contenido = `
        <a class = "card__redireccion" href="#">
        <img class="card__img"src="${imagen}">
        </a>
        <p class="card__nombre">${nombre}</p>
        <p class="card__precio">${precio}</p>
        <a class="card__link" href="#">Ver producto</a>    
    `;
    card.innerHTML = contenido;
    return card
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
        link.innerHTML = `Ver Todo <i class="fa-solid fa-arrow-right"></i>`;
        link.addEventListener("click", () => {

        console.log("Redireccioname a similar.html");
            
        })

    const main = document.querySelector("[data-main]");
    div2.appendChild(h2);
    div2.appendChild(link);
    div.appendChild(div2);
    section.appendChild(div);
    main.appendChild(referencia);
    main.appendChild(section);

    
    
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

const mostrarProductos = () => {

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
    }).catch(alert("algo ha salido mal"));
console.log("xd");
}

mostrarProductos();