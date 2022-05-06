import { productoServices } from "../service/product-service.js";
import { ProductoIdNombre } from "../Class/ProductoIDNombre.js";

var url = validarLocation();
console.log("La url dentro de similar es", url);
var buscando = false;

const buscarCoincidencia  = (palabra,palabraIngresada) => {
    let p1 = palabra.toLowerCase();
    let p2 = palabraIngresada.toLowerCase();

    p1 = p1.substring(0,palabraIngresada.length);
    console.log(p1);
    console.log("Letra: ",p2);
    if (p1 == p2){
        return true
    } else {
        false
    }
}


const crearBloque = (id,nombre) => {
    const div = document.querySelector(".busqueda");
    const productoNombre = document.createElement("p");
    productoNombre.innerHTML = `${nombre}`;
    productoNombre.className = "busqueda__pencontrada";
    const a = document.createElement("a");
    a.setAttribute("href",`${url}similar.html#${id}`);
    a.className = "busqueda__aencontrada";
    a.appendChild(productoNombre);

    if (""==url){
        a.addEventListener("click", ()=> {
            setTimeout(()=> {
                window.location.reload();
            }, 500);
        })
    }

    div.appendChild(a);
   
}


const eliminarBloque = () => {

const a = document.querySelectorAll(".busqueda__aencontrada");

    for (let i=0; i<a.length; i++) {
        a[i].remove();
    } 

}

const escucharBusqueda  = (palabra,productos) => {

    productoServices.listaProducto().then((data) => {
    
        eliminarBloque();
        productos = [];
        data.forEach( ({id,nombre}) => {
            if(buscarCoincidencia(nombre,palabra)){
                const productoBuscado = new ProductoIdNombre(id,nombre);
                productos.push(productoBuscado);
                
            }  
        })


        for (let i=0; i < productos.length; i++){

        crearBloque(productos[i].devolverId(),productos[i].devolverNombre());

        }   

    }).catch(()=>console.log("No se encuentra"));
}

const input = document.querySelector(".header__buscador");
input.addEventListener("keyup", (evento)=>{

const contenidoEscrito = input.value;

if(contenidoEscrito != "") {

   

    buscando = true;
    var productos = [];
    console.log("AL SALIR me quedo con", productos);
    escucharBusqueda(contenidoEscrito,productos);
    console.log("AL SALIR me quedo cssssssssson", productos);

    
} else {
    if(buscando){
        eliminarBloque()
    }
}


})

