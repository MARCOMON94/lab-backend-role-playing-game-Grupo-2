const { Personaje } = require('./Personaje')

/** Guerrero: especialista en daño físico. */
class Guerrero extends Personaje {
  /**
   * Golpe fuerte: daño doble a cambio de 10 de vida propia.
   * @returns {{ danio: number, costePropio: number, descripcion: string }}
   */
  habilidadEspecial() {
    const danio = this.stats.ataque * 2
    return { danio, costePropio: 10, descripcion: `${this.nombre} usa GOLPE FUERTE (${danio} daño)` }
  }
}

module.exports = Guerrero