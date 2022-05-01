const perfilUsuario = () => {
    return fetch("https://my-json-server.typicode.com/laureanoC/TryhardZone/usuario").then((respuesta) => respuesta.json());
}

const actualizarEstado = (id,status) => {
    
    return fetch(`https://my-json-server.typicode.com/laureanoC/TryhardZone/usuario/${id}`,{
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