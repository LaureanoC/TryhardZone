const footer = document.querySelector (".footer");
footer.innerHTML = ` 
<div class="footer__contenido">
    <p class="header__logo"></p>
    <div class="footer__link">
        <a href="#">Quienes somos</a>
        <a href="#">Política de privacidad</a>
        <a href="#">Programa de fidelidad</a>
        <a href="#">Nuestras Tiendas</a>
        <a href="#">Quiero ser franquiciado</a>
        <a href="#">Anuncie aquí</a>
    </div>
    <div class="footer__formulario">
        <p class="formulario__titulo">Hable con nosotros</p>
        <div class="formulario__conjunto">
            <label class="formulario__label"for="name">Nombre</label>
            <input name="name" type="text" class="formulario__nombre" id="nombre" placeholder="Laureano Neyén Chaves">
        </div>
        <textarea name="mensaje" id="mensaje" class="formulario__mensaje" placeholder="Escribe tu mensaje"></textarea>
        <div class="formulario__boton">Enviar</div>
    </div>
    
</div>

<div class="rodapie">Diseñado por Laureano Neyén Chaves 2022 &copy;</div>`