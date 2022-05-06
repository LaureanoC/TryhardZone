import { productoServices } from "../service/product-service.js";
const crearNuevaCard = (nombre, precio, imagen,id) => {
    const card = document.createElement("div");
    card.className = "categorias__card";
    card.id = "producto";
  
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
            setTimeout(()=> {
                window.location.reload();
            }, 500);
        })

    aimg.appendChild(img);
    card.appendChild(aimg);
    card.appendChild(p1);
    card.appendChild(p2);
    card.appendChild(a);

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
    

    const main = document.querySelector("[data-main]");
    div2.appendChild(h2);
   
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

const mostrarTodo = () => {

    crearSection("v");
    crearSection("c");
    crearSection("p");

    productoServices.listaProducto().then((data) => {
      
        data.forEach( ({nombre,precio,imagen,tipo,id}) => {
                
                    const div = document.querySelector(`[data-section${tipo}]`);
                    const nuevoProducto = crearNuevaCard(nombre,precio,imagen,id);
                    div.appendChild(nuevoProducto);
                    
                   
        })
    }).catch((error) => console.log(error));
}


mostrarTodo();