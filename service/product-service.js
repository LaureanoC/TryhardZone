/* https://tryhardzone.herokuapp.com/producto */

const listaProducto = () => fetch("http://localhost:3000/producto").then((respuesta) => respuesta.json());

const registrarProducto = (imagen, nombre, precio, descripcion, tipo) => {
    return fetch("http://localhost:3000/producto", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({nombre,precio,imagen,descripcion,tipo, id:uuid.v4()}) // Lo transformo en texto
    });
}

const eliminarProducto = (id) =>{
    return fetch(`http://localhost:3000/producto/${id}`, {
        method: "DELETE",
    })


}

const actualizarProducto = (nombre,precio,imagen,descripcion,tipo,id) => {
    
    return fetch(`http://localhost:3000/producto/${id}`,{
        method:'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({nombre: `${nombre}`,
        precio:`${precio}`,
        imagen:`${imagen}`,
        tipo: `${tipo}`,
        descripcion: `${descripcion}`,
        id: `${id}`
    })

    })
    .then((respuesta) => console.log(respuesta.json()))
    .catch((error) => console.log(error));
}

export const productoServices = {

    listaProducto, registrarProducto, eliminarProducto, actualizarProducto
}