const Guerrero   = require('./Guerrero')
const Explorador = require('./Explorador')
const Mago       = require('./Mago')

const CLASES = { guerrero: Guerrero, explorador: Explorador, mago: Mago }

class Combate {
  static simular(fichaA, fichaB) {
    // Convertir fichas planas a instancias con habilidadEspecial()
    const instA = Combate._instanciar(fichaA)
    const instB = Combate._instanciar(fichaB)

    let vidaA = instA.stats.vida
    let vidaB = instB.stats.vida
    const log = []
    let ronda  = 0

    const [primero, segundo] =
      instA.stats.iniciativa >= instB.stats.iniciativa
        ? [instA, instB]
        : [instB, instA]

    let vidaPrimero = primero === instA ? vidaA : vidaB
    let vidaSegundo = primero === instA ? vidaB : vidaA

    log.push(`⚔️  ${primero.nombre} (iniciativa ${primero.stats.iniciativa}) ataca primero`)

    while (vidaPrimero > 0 && vidaSegundo > 0) {
      ronda++
      const usarHabilidad = ronda % 3 === 0

      // — Turno del primero —
      if (usarHabilidad) {
        const hab = primero.habilidadEspecial(vidaSegundo)
        log.push(`✨ ${hab.descripcion}`)

        if (hab.esquiva) {
          // Explorador: ataca normal pero el siguiente golpe del rival falla
          vidaSegundo -= hab.danio
          log.push(`Ronda ${ronda}a: ${primero.nombre} → ${segundo.nombre} [-${hab.danio} vida] (${Math.max(0, vidaSegundo)} restante)`)
        } else if (hab.ignoraDefensa) {
          // Mago: ignora defensa
          vidaSegundo -= hab.danio
          log.push(`Ronda ${ronda}a: ${primero.nombre} → ${segundo.nombre} [-${hab.danio} vida, sin defensa] (${Math.max(0, vidaSegundo)} restante)`)
        } else {
          // Guerrero: daño doble, pierde vida propia
          vidaSegundo -= hab.danio
          vidaPrimero -= hab.costePropio
          log.push(`Ronda ${ronda}a: ${primero.nombre} → ${segundo.nombre} [-${hab.danio} vida] (${Math.max(0, vidaSegundo)} restante) — coste propio: -${hab.costePropio}`)
        }
      } else {
        const danio = Math.max(1, primero.stats.ataque - segundo.stats.defensa)
        vidaSegundo -= danio
        log.push(`Ronda ${ronda}a: ${primero.nombre} → ${segundo.nombre} [-${danio} vida] (${Math.max(0, vidaSegundo)} restante)`)
      }

      if (vidaSegundo <= 0) break

      // — Turno del segundo —
      // Si el primero usó esquiva esta ronda, el segundo falla
      if (usarHabilidad && primero.categoria === 'explorador') {
        log.push(`Ronda ${ronda}b: ${segundo.nombre} falla — ${primero.nombre} esquivó`)
      } else {
        const danio = Math.max(1, segundo.stats.ataque - primero.stats.defensa)
        vidaPrimero -= danio
        log.push(`Ronda ${ronda}b: ${segundo.nombre} → ${primero.nombre} [-${danio} vida] (${Math.max(0, vidaPrimero)} restante)`)
      }
    }

    const ganador  = vidaPrimero > 0 ? primero : segundo
    const perdedor = ganador === primero ? segundo : primero

    log.push(`🏆 Ganador: ${ganador.nombre} en ${ronda} ronda(s)`)

    return {
      ganador:  ganador.nombre,
      perdedor: perdedor.nombre,
      rondas:   ronda,
      log
    }
  }

  static _instanciar(ficha) {
    const Clase = CLASES[ficha.categoria] || Guerrero
    const inst  = new Clase(ficha)
    // Preservar victorias/derrotas si las tiene
    inst.victorias = ficha.victorias || 0
    inst.derrotas  = ficha.derrotas  || 0
    return inst
  }
}

module.exports = Combate