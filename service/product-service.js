const listaProducto = () => fetch("http://localhost:3000/producto").then((respuesta) => respuesta.json());

const crearProducto = (nombre) => {

}

export const productoServices = {

    listaProducto, crearProducto
}