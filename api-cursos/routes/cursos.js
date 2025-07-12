// routes/cursos.js

const express = require('express');
const router = express.Router();

// "Base de datos" en memoria. Es un array de objetos.
let cursos = [
  { id: 1, nombre: 'Node.js Básico', descripcion: 'Fundamentos de Node.js' },
  { id: 2, nombre: 'React.js Avanzado', descripcion: 'Hooks, Context y Redux' },
  { id: 3, nombre: 'Bases de Datos SQL', descripcion: 'Modelado y consultas con SQL' }
];

// --- DEFINICIÓN DE LAS RUTAS PARA /api/cursos ---

// GET /api/cursos - Obtener todos los cursos
router.get('/', (req, res) => {
  res.json(cursos);
});

// GET /api/cursos/:id - Obtener un curso por su ID
router.get('/:id', (req, res) => {
  const curso = cursos.find(c => c.id === parseInt(req.params.id));
  if (!curso) {
    return res.status(404).send('El curso con el ID especificado no fue encontrado.');
  }
  res.json(curso);
});

// POST /api/cursos - Crear un nuevo curso
router.post('/', (req, res) => {
  // Validación simple del body
  if (!req.body.nombre || req.body.nombre.length < 3) {
    return res.status(400).send('El nombre es requerido y debe tener al menos 3 caracteres.');
  }

  const nuevoCurso = {
    id: cursos.length > 0 ? Math.max(...cursos.map(c => c.id)) + 1 : 1, // Genera un ID único
    nombre: req.body.nombre,
    descripcion: req.body.descripcion || '' // Descripción opcional
  };

  cursos.push(nuevoCurso);
  res.status(201).json(nuevoCurso); // 201 Created
});

// PUT /api/cursos/:id - Actualizar un curso existente
router.put('/:id', (req, res) => {
  const curso = cursos.find(c => c.id === parseInt(req.params.id));
  if (!curso) {
    return res.status(404).send('El curso con el ID especificado no fue encontrado.');
  }

  // Validación
  if (!req.body.nombre || req.body.nombre.length < 3) {
    return res.status(400).send('El nombre es requerido y debe tener al menos 3 caracteres.');
  }

  // Actualizamos los campos
  curso.nombre = req.body.nombre;
  curso.descripcion = req.body.descripcion || curso.descripcion;

  res.json(curso);
});

// DELETE /api/cursos/:id - Eliminar un curso
router.delete('/:id', (req, res) => {
  const cursoIndex = cursos.findIndex(c => c.id === parseInt(req.params.id));
  if (cursoIndex === -1) {
    return res.status(404).send('El curso con el ID especificado no fue encontrado.');
  }

  const cursoEliminado = cursos.splice(cursoIndex, 1);
  res.json(cursoEliminado[0]);
});

// Exportamos el router para que pueda ser usado en index.js
module.exports = router;
