import { productoServices } from "../service/product-service.js";

console.log(productoServices.listaProducto());

const crearNuevaCard = (nombre, precio, imagen, tipo,id) => {

    const card = document.createElement("div");
    card.style = "categorias__card"
    const contenido = `
        <img class="card__img"src="${imagen}">
        <p class="card__nombre">${nombre}</p>
        <p class="card__precio">${precio}</p>
        <a class="card__link" href="#">Ver producto</a>    
    `;
    card.innerHTML = contenido;
    return card


}


productoServices.listaProducto().then((data) => {

    console.log(data);
    data.forEach( ({nombre,precio,imagen,tipo}) => {
        const div = document.querySelector("[data-section]");
        const nuevoProducto = crearNuevaCard(nombre,precio,imagen,tipo);
        div.appendChild(nuevoProducto);
    })

    })
    .catch((error) => {alert(error)});