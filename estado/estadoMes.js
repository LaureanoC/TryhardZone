var meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

const devolverMes = () => {

var fecha = new Date();
var mes = fecha.getMonth();
return mes;

}

const mostrarMes = () => {

    const mesActual = meses[devolverMes()];
    const titulo = document.querySelector(".banner__titulo");
    titulo.textContent = `${mesActual} Promocional`;

}

mostrarMes();


