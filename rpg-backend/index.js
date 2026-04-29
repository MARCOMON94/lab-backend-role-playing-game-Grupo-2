const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, "client")));

// Ruta de bienvenida
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "index.html"));
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🎮 Servidor RPG Backend corriendo en http://localhost:${PORT}`);
});
