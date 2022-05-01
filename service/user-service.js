const perfilUsuario = () => {
    return fetch("http://localhost:3000/usuario").then((respuesta) => respuesta.json());
}

const actualizarEstado = (id,status) => {
    
    return fetch(`http://localhost:3000/usuario/${id}`,{
        method:'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({estado: `${status}`,
        usuario: "valentina",
        password: "ponona pononita"})

    })
    .then((respuesta) => console.log(respuesta.json()))
    .catch((error) => console.log(error));
}

export const userServices = {
    perfilUsuario, actualizarEstado
}