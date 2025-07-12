// index.js

// 1. Importaciones
const express = require('express');
const cursosRouter = require('./routes/cursos'); // Importamos el router

// 2. Inicialización
const app = express();
const PORT = process.env.PORT || 3000;

// 3. Middlewares
// Middleware para poder parsear y entender JSON que nos envíen en las peticiones.
app.use(express.json());

// 4. Rutas
// Ruta principal de bienvenida
app.get('/', (req, res) => {
  res.send('¡Bienvenido a mi API de Cursos!');
});

// Le decimos a nuestra app que use el router de cursos para todas las rutas
// que empiecen con /api/cursos
app.use('/api/cursos', cursosRouter);

// 5. Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
