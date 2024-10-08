const perfilUsuario = () => {
    return fetch("https://tryhardzone.herokuapp.com/usuario").then((respuesta) => respuesta.json());
}

const actualizarEstado = (id,status) => {
    
    return fetch(`https://tryhardzone.herokuapp.com/usuario/${id}`,{
        method:'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({estado: `${status}`,
        usuario: "laureano",
        password: "qwerty"})

    })
    .then((respuesta) => console.log(respuesta.json()))
    .catch((error) => console.log(error));
}

export const userServices = {
    perfilUsuario, actualizarEstado
}