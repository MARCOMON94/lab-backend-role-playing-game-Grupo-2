const { Personaje } = require('./Personaje')

/** Mago: especialista en daño mágico que ignora defensa. */
class Mago extends Personaje {
  /**
   * Hechizo: daño normal pero ignora completamente la defensa del rival.
   * @returns {{ danio: number, ignoraDefensa: boolean, descripcion: string }}
   */
  habilidadEspecial(_vidaRival, vidaPropia) {
    if (vidaPropia < this.stats.vida * 0.7) {
      const danio = Math.floor(this.stats.ataque * 0.6)
      const curacion = Math.floor(this.stats.ataque * 0.4)
      return { danio, curacion, ignoraDefensa: true, descripcion: `${this.nombre} lanza DRENAR VIDA (-${danio} rival, +${curacion} propio)` }
    }
    return { danio: this.stats.ataque, ignoraDefensa: true, descripcion: `${this.nombre} lanza HECHIZO` }
  }
}

module.exports = Mago