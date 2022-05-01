const listaProducto = () => fetch("https://api.npoint.io/dd4ed067c3c12fc228cd/producto").then((respuesta) => respuesta.json());

const registrarProducto = (imagen, nombre, precio, descripcion, tipo) => {
    return fetch("https://api.npoint.io/dd4ed067c3c12fc228cd/producto", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({nombre,precio,imagen,descripcion,tipo, id:uuid.v4()}) // Lo transformo en texto
    });
}

const eliminarProducto = (id) =>{
    return fetch(`https://api.npoint.io/dd4ed067c3c12fc228cd/producto/${id}`, {
        method: "DELETE",
    })


}

const actualizarProducto = (nombre,precio,imagen,descripcion,tipo,id) => {
    
    return fetch(`https://api.npoint.io/dd4ed067c3c12fc228cd/producto/${id}`,{
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