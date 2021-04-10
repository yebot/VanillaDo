const express = require('express');
const todoController = require('./todoController.js');
const router = express.Router();

// This route will handle HTTP POST at /api and insert the appropriate middleware
router.post('/',
  todoController.create,
  (req, res) => res.status(200).json(res.locals)
);

// This route will handle HTTP GET at /api and insert the appropriate middleware
router.get('/',
  todoController.read,
  (req, res) => res.status(200).json(res.locals)
);

// This route will handle HTTP PATCH at /api and insert the appropriate middleware
router.patch('/:id',
  todoController.update,
  (req, res) => res.status(200).json(res.locals)
);

// This route will handle HTTP DELETE at /api and insert the appropriate middleware
router.delete('/:id',
  todoController.delete,
  (req, res) => res.status(200).json(res.locals)
);

module.exports = router;