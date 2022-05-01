const perfilUsuario = () => {
    return fetch("https://api.npoint.io/c3e1f94a1bdcac97f5d9/usuario").then((respuesta) => respuesta.json());
}

const actualizarEstado = (id,status) => {
    
    return fetch(`https://api.npoint.io/c3e1f94a1bdcac97f5d9/usuario/${id}`,{
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