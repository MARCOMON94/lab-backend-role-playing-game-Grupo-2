const express = require("express");
require("dotenv").config();

// Importar middleware
const logger = require("./src/middleware/logger");
const errorHandler = require("./src/middleware/errorHandler");

// Importar routers
const personajeRouter = require("./src/routes/personaje");
const combateRouter = require("./src/routes/combate");

const app = express();
const PORT = process.env.PORT || 3000;

// ==================== MIDDLEWARE ====================
// Parser JSON
app.use(express.json());

// Logger (registra todas las requests)
app.use(logger);

// ==================== ROUTERS ====================
app.use("/personajes", personajeRouter);
app.use("/combates", combateRouter);

// Ruta de bienvenida
app.get("/", (req, res) => {
  res.json({
    mensaje: "🎮 Chronicles of Iron — RPG Backend API",
    version: "1.0.0",
    endpoints: {
      personajes: "/personajes",
      combates: "/combates"
    }
  });
});

// ==================== ERROR HANDLER ====================
// Debe ir al final, después de todas las rutas
app.use(errorHandler);

// ==================== INICIAR SERVIDOR ====================
app.listen(PORT, () => {
  console.log(`🎮 Servidor RPG Backend corriendo en http://localhost:${PORT}`);
  console.log(`📚 API disponible en http://localhost:${PORT}/personajes y http://localhost:${PORT}/combates`);
});
