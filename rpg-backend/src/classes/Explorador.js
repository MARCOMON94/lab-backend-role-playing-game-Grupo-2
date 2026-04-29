const { Personaje } = require('./Personaje')

/** Explorador: especialista en evasión. */
class Explorador extends Personaje {
  /**
   * Esquivar: ataca normal y anula el contraataque del rival este turno.
   * @returns {{ danio: number, esquiva: boolean, descripcion: string }}
   */
  habilidadEspecial() {
    return { danio: this.stats.ataque, esquiva: true, descripcion: `${this.nombre} usa ESQUIVAR` }
  }
}

module.exports = Explorador