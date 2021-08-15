const { Router } = require('express')
const tarefaController = require('../controllers/tarefaController')

const router = new Router();

router.get('/', tarefaController.index)
router.post('/', tarefaController.create)
router.put('/:id', tarefaController.update)

module.exports = router;