/** Clase base abstracta. Todas las clases de personaje deben extenderla. */
class BasePersonaje {
  /**
   * Ejecuta la habilidad especial del personaje.
   * Las subclases deben sobreescribir este método.
   * @throws {Error} Si la subclase no implementa el método
   * @returns {{ danio: number, descripcion: string, esquiva?: boolean, ignoraDefensa?: boolean, costePropio?: number }}
   */
  habilidadEspecial() {
    throw new Error(`${this.constructor.name} debe implementar habilidadEspecial()`)
  }
}

module.exports = BasePersonaje