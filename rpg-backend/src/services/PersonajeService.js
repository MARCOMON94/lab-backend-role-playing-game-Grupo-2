const StorageService = require('./StorageService')
const { Personaje, BONUS_ESPECIE, BONUS_CATEGORIA } = require('../classes/Personaje')
const Guerrero = require('../classes/Guerrero')
const Explorador = require('../classes/Explorador')
const Mago = require('../classes/Mago')
const { generarNombre, generarEspecie, generarCategoria } = require('../utils/nombresAleatorios')
const AppError = require('../utils/AppError')

const CLASES = {
  guerrero: Guerrero,
  explorador: Explorador,
  mago: Mago
}

let personajes = []
let siguienteId = 1

const cargarPersonajes = () => {
  personajes = StorageService.leerPersonajes()
  if (personajes.length > 0) {
    siguienteId = Math.max(...personajes.map(p => p.id)) + 1
  }
}

cargarPersonajes()

const PersonajeService = {
  crearManual({ nombre, especie, categoria }) {
    if (!nombre || !especie || !categoria) {
      throw new AppError('Faltan campos requeridos: nombre, especie, categoria', 400)
    }
    
    if (!BONUS_ESPECIE[especie]) {
      throw new AppError(`Especie inválida: ${especie}. Debe ser: ${Object.keys(BONUS_ESPECIE).join(', ')}`, 400)
    }
    
    if (!BONUS_CATEGORIA[categoria]) {
      throw new AppError(`Categoría inválida: ${categoria}. Debe ser: ${Object.keys(BONUS_CATEGORIA).join(', ')}`, 400)
    }

    const Clase = CLASES[categoria]
    const personaje = new Clase({ id: siguienteId++, nombre, especie, categoria })
    personajes.push(personaje.ficha)
    StorageService.guardarPersonajes(personajes)
    
    return personaje.ficha
  },

  crearAleatorio() {
    const especie = generarEspecie()
    const categoria = generarCategoria()
    const nombre = generarNombre(especie)
    
    return this.crearManual({ nombre, especie, categoria })
  },

  obtenerTodos(filtros = {}) {
    let resultado = [...personajes]
    
    if (filtros.especie) {
      resultado = resultado.filter(p => p.especie === filtros.especie)
    }
    
    if (filtros.categoria) {
      resultado = resultado.filter(p => p.categoria === filtros.categoria)
    }
    
    return resultado
  },

  obtenerPorId(id) {
    const personaje = personajes.find(p => p.id === id)
    if (!personaje) {
      throw new AppError(`Personaje con id ${id} no encontrado`, 404)
    }
    return personaje
  },

  actualizarNombre(id, nuevoNombre) {
    const personaje = this.obtenerPorId(id)
    personaje.nombre = nuevoNombre
    
    const index = personajes.findIndex(p => p.id === id)
    personajes[index] = personaje
    StorageService.guardarPersonajes(personajes)
    
    return personaje
  },

  eliminar(id) {
    const personaje = this.obtenerPorId(id)
    personajes = personajes.filter(p => p.id !== id)
    StorageService.guardarPersonajes(personajes)
    return personaje
  },

  registrarResultado(idGanador, idPerdedor) {
    const ganador = personajes.find(p => p.id === idGanador)
    const perdedor = personajes.find(p => p.id === idPerdedor)
    
    if (ganador) ganador.victorias++
    if (perdedor) perdedor.derrotas++
    
    StorageService.guardarPersonajes(personajes)
  }
}

module.exports = PersonajeService
