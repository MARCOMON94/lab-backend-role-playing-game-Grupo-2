const BasePersonaje = require("./BasePersonaje")

const BONUS_ESPECIE = {
  humano:  { vida: 0,   ataque: 0,  defensa: 0,  iniciativa: 5  },
  enano:   { vida: 10,  ataque: 5,  defensa: 10, iniciativa: -5 },
  elfo:    { vida: -10, ataque: 10, defensa: -5, iniciativa: 10 }
}

const BONUS_CATEGORIA = {
  guerrero:   { vida: 25,  ataque: 15, defensa: 10,  iniciativa: 0  },
  explorador: { vida: 10,  ataque: 10, defensa: 5,  iniciativa: 15 },
  mago:       { vida: -5, ataque: 25, defensa: -5, iniciativa: 5  }
}

/**
 * Representa un personaje del juego.
 * Extiende BasePersonaje e implementa el cálculo de stats.
 */
class Personaje extends BasePersonaje {
  /**
   * @param {Object} datos
   * @param {number} datos.id
   * @param {string} datos.nombre
   * @param {'humano'|'enano'|'elfo'} datos.especie
   * @param {'guerrero'|'explorador'|'mago'} datos.categoria
   */
  constructor({ id, nombre, especie, categoria }) {
    super()
    this.id        = id
    this.nombre    = nombre
    this.especie   = especie
    this.categoria = categoria
    this.stats     = this._calcularStats()
    this.victorias = 0
    this.derrotas  = 0
  }

  /**
   * Calcula los stats finales: base + bonus de especie + bonus de categoría.
   * @returns {{ vida: number, ataque: number, defensa: number, iniciativa: number }}
   */
  _calcularStats() {
    const base = { vida: 100, ataque: 10, defensa: 5, iniciativa: 5 }
    const be   = BONUS_ESPECIE[this.especie]   || {}
    const bc   = BONUS_CATEGORIA[this.categoria] || {}

    return {
      vida:       base.vida       + (be.vida       || 0) + (bc.vida       || 0),
      ataque:     base.ataque     + (be.ataque      || 0) + (bc.ataque     || 0),
      defensa:    base.defensa    + (be.defensa     || 0) + (bc.defensa    || 0),
      iniciativa: base.iniciativa + (be.iniciativa  || 0) + (bc.iniciativa || 0)
    }
  }

  /**
   * Devuelve la ficha pública del personaje (objeto plano sin métodos).
   * @returns {{ id: number, nombre: string, especie: string, categoria: string, stats: Object, victorias: number, derrotas: number }}
   */
  get ficha() {
    return {
      id:        this.id,
      nombre:    this.nombre,
      especie:   this.especie,
      categoria: this.categoria,
      stats:     this.stats,
      victorias: this.victorias,
      derrotas:  this.derrotas
    }
  }
}

module.exports = { Personaje, BONUS_ESPECIE, BONUS_CATEGORIA }