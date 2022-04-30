const listaProducto = () => fetch("http://localhost:3000/producto").then((respuesta) => respuesta.json());

const registrarProducto = (imagen, nombre, precio, descripcion, tipo) => {
    return fetch("http://localhost:3000/producto", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({nombre,precio,imagen,tipo, id:uuid.v4()}) // Lo transformo en texto
    });
}

export const productoServices = {

    listaProducto, registrarProducto
}