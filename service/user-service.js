const perfilUsuario = () => fetch("http://localhost:3000/usuario").then((respuesta) => respuesta.json());
console.log(perfilUsuario);

export const userServices = {
    perfilUsuario
}