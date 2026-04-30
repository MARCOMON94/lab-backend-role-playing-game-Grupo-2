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
        const hab = primero.habilidadEspecial(vidaSegundo, vidaPrimero)
        log.push(`✨ ${hab.descripcion}`)

        if (hab.curacion) {
          const critico = Math.random() < 0.40
          const danioFinal = critico ? hab.danio * 2 : hab.danio
          const curacionFinal = critico ? hab.curacion * 2 : hab.curacion
          vidaSegundo -= danioFinal
          vidaPrimero = Math.min(primero.stats.vida, vidaPrimero + curacionFinal)
          log.push(`Ronda ${ronda}a: ${primero.nombre} → ${segundo.nombre} [-${danioFinal} vida]${critico ? ' 💥 CRÍTICO' : ''} (${Math.max(0, vidaSegundo)} restante)`)
          log.push(`Ronda ${ronda}a: ${primero.nombre} recupera [+${curacionFinal} vida] (${vidaPrimero} restante)`)
        } else if (hab.esquiva) {
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
  const fallo = Math.random() < 0.1
  if (fallo) {
    log.push(`Ronda ${ronda}a: ${primero.nombre} falla el ataque`)
  } else {
    const critico = Math.random() < 0.15
    const base = Math.max(1, primero.stats.ataque - Math.max(0, segundo.stats.defensa))
    const danio = base + (critico ? Math.max(1, Math.floor(10 / Math.sqrt(base))) : 0)
    vidaSegundo -= danio
    log.push(`Ronda ${ronda}a: ${primero.nombre} → ${segundo.nombre} [-${danio} vida]${critico ? ' 💥 CRÍTICO' : ''} (${Math.max(0, vidaSegundo)} restante)`)
  }
}


      if (vidaSegundo <= 0) break

      // — Turno del segundo —
      // Si el primero usó esquiva esta ronda, el segundo falla
      if (usarHabilidad && primero.categoria === 'explorador') {
        log.push(`Ronda ${ronda}b: ${segundo.nombre} falla — ${primero.nombre} esquivó`)
      } else if (usarHabilidad) {
        const hab = segundo.habilidadEspecial(vidaPrimero, vidaSegundo)
        log.push(`✨ ${hab.descripcion}`)

        if (hab.curacion) {
          const critico = Math.random() < 0.40
          const danioFinal = critico ? hab.danio * 2 : hab.danio
          const curacionFinal = critico ? hab.curacion * 2 : hab.curacion
          vidaPrimero -= danioFinal
          vidaSegundo = Math.min(segundo.stats.vida, vidaSegundo + curacionFinal)
          log.push(`Ronda ${ronda}b: ${segundo.nombre} → ${primero.nombre} [-${danioFinal} vida]${critico ? ' 💥 CRÍTICO' : ''} (${Math.max(0, vidaPrimero)} restante)`)
          log.push(`Ronda ${ronda}b: ${segundo.nombre} recupera [+${curacionFinal} vida] (${vidaSegundo} restante)`)
        } else if (hab.esquiva) {
          vidaPrimero -= hab.danio
          log.push(`Ronda ${ronda}b: ${segundo.nombre} → ${primero.nombre} [-${hab.danio} vida] (${Math.max(0, vidaPrimero)} restante)`)
        } else if (hab.ignoraDefensa) {
          vidaPrimero -= hab.danio
          log.push(`Ronda ${ronda}b: ${segundo.nombre} → ${primero.nombre} [-${hab.danio} vida, sin defensa] (${Math.max(0, vidaPrimero)} restante)`)
        } else {
          vidaPrimero -= hab.danio
          vidaSegundo -= hab.costePropio
          log.push(`Ronda ${ronda}b: ${segundo.nombre} → ${primero.nombre} [-${hab.danio} vida] (${Math.max(0, vidaPrimero)} restante) — coste propio: -${hab.costePropio}`)
        }
        } else {
          const fallo = Math.random() < 0.1
          if (fallo) {
            log.push(`Ronda ${ronda}b: ${segundo.nombre} falla el ataque`)
          } else {
            const critico = Math.random() < 0.15
            const base = Math.max(1, segundo.stats.ataque - Math.max(0, primero.stats.defensa))
            const danio = base + (critico ? Math.max(1, Math.floor(10 / Math.sqrt(base))) : 0)
            vidaPrimero -= danio
            log.push(`Ronda ${ronda}b: ${segundo.nombre} → ${primero.nombre} [-${danio} vida]${critico ? ' 💥 CRÍTICO' : ''} (${Math.max(0, vidaPrimero)} restante)`)
          }
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