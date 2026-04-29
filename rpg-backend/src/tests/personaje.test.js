const { Personaje } = require('../classes/Personaje')
const BasePersonaje = require('../classes/BasePersonaje')
const Guerrero      = require('../classes/Guerrero')
const Explorador    = require('../classes/Explorador')
const Mago          = require('../classes/Mago')

describe('BasePersonaje', () => {
  test('lanza error si habilidadEspecial no está implementada', () => {
    const base = new BasePersonaje()
    expect(() => base.habilidadEspecial()).toThrow('BasePersonaje debe implementar habilidadEspecial()')
  })
})

describe('Personaje - cálculo de stats', () => {
  test('Grindal (enano, guerrero) tiene los stats correctos', () => {
    const grindal = new Personaje({ id: 1, nombre: 'Grindal', especie: 'enano', categoria: 'guerrero' })
    expect(grindal.stats).toEqual({ vida: 150, ataque: 30, defensa: 25, iniciativa: 0 })
  })

  test('aplica bonus de especie elfo correctamente', () => {
    const personaje = new Personaje({ id: 2, nombre: 'Lyra', especie: 'elfo', categoria: 'explorador' })
    expect(personaje.stats.vida).toBe(100)       // 100 - 10 + 10
    expect(personaje.stats.iniciativa).toBe(30)  // 5 + 10 + 15
  })
})

describe('Subclases - habilidadEspecial', () => {
  test('Guerrero implementa habilidadEspecial sin lanzar error', () => {
    const g = new Guerrero({ id: 1, nombre: 'Thor', especie: 'humano', categoria: 'guerrero' })
    expect(() => g.habilidadEspecial()).not.toThrow()
  })

  test('Explorador implementa habilidadEspecial sin lanzar error', () => {
    const e = new Explorador({ id: 2, nombre: 'Ara', especie: 'elfo', categoria: 'explorador' })
    expect(() => e.habilidadEspecial()).not.toThrow()
  })

  test('Mago implementa habilidadEspecial sin lanzar error', () => {
    const m = new Mago({ id: 3, nombre: 'Zeth', especie: 'humano', categoria: 'mago' })
    expect(() => m.habilidadEspecial()).not.toThrow()
  })
})
