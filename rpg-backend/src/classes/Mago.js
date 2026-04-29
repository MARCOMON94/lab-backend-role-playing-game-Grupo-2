const { Personaje } = require('./Personaje')

/** Mago: especialista en daño mágico que ignora defensa. */
class Mago extends Personaje {
  /**
   * Hechizo: daño normal pero ignora completamente la defensa del rival.
   * @returns {{ danio: number, ignoraDefensa: boolean, descripcion: string }}
   */
  habilidadEspecial() {
    return { danio: this.stats.ataque, ignoraDefensa: true, descripcion: `${this.nombre} lanza HECHIZO` }
  }
}

module.exports = Mago