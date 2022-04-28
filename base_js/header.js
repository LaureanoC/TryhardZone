const body = document.querySelector(".sticky");
body.innerHTML = `
        <div class="sticky__header">
            <a href="index.html"><p class="header__logo"></p></a>
            <div class="header__conjuntobusqueda">
                <input class="header__buscador" type="text" placeholder="¿Que deseas buscar?">  
                <i class="fa-solid fa-magnifying-glass"></i>
            </div>
            <div class="header__login">Login</div>
        </div>`