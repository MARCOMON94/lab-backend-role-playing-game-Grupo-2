class BasePersonaje {
    habilidadEspecial() {
        throw new Error(`${this.constructor.name} debe implementar habilidadEspecial()`)
    }
}

module.exports = BasePersonaje