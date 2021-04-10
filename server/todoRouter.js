const express = require('express');
const todoController = require('./todoController.js');
const router = express.Router();

router.post('/',
  todoController.create,
  (req, res) => res.status(200).json({})
);

router.get('/',
  todoController.read,
  (req, res) => res.status(200).json({})
);

router.patch('/',
  todoController.update,
  (req, res) => res.status(200).json({})
);

router.delete('/',
  todoController.delete,
  (req, res) => res.status(200).json({})
);

module.exports = router;