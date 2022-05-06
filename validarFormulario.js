const nombre = document.querySelector(".formulario__nombre");
const mensaje = document.querySelector("#mensaje");
const boton = document.querySelector(".formulario__boton");

var estadoNombre = false;
var estadoMensaje = false;

const mostrarMensajeError = (tipo,idP,id) => {

    const p = document.createElement("p");
    p.innerHTML = `Completa el campo ${tipo}`;
    p.id = `${idP}`;

    const div = document.querySelector(`#${id}`);
    div.insertAdjacentElement("afterend",p);

}

const eliminarMensajeError = (tipo) => {

    const p = document.querySelector(`#${tipo}`);
    p.remove()

}

nombre.addEventListener("change", ()=> {

    const valor = nombre.value;
    if(valor == "" && estadoNombre==false){
        mostrarMensajeError("nombre","errorN","cajan");
        estadoNombre = true;
    } else {
        if(estadoNombre == true){
            estadoNombre=false;
        eliminarMensajeError("errorN");
        }
        
    }

})

mensaje.addEventListener("change", ()=> {

   
    const valor = mensaje.value;
   
    if(valor == "" && estadoMensaje == false){
        mostrarMensajeError("mensaje","errorM","caja");
        estadoMensaje = true;
    } else {
        if(estadoMensaje == true){
            estadoMensaje = false;
        eliminarMensajeError("errorM");
        }
        
    }

})

