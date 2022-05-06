
export class ProductoIdNombre {

    id;
    nombre;
    
    constructor(id,nombre) {
            this.id = id;
            this.nombre = nombre;
    }

    devolverId = () => {
        return this.id
    }

    devolverNombre = () => {
        return this.nombre
    }

}
