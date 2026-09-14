const express = require('express');
const router = express.Router();
const alunoController = require('../controllers/alunoController');

router.get('/', alunoController.getAlunos);
router.get('/:id', alunoController.getAlunosById);
router.post('/', alunoController.save);

module.exports = router;