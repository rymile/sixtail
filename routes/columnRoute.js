const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth-middleware');

const ColumnController = require('../controller/columnController.js');
const columnController = new ColumnController();

router.post('/:boardId', authMiddleware, columnController.post);

router.put('/:columnId', authMiddleware, columnController.put);

router.delete('/:columnId', authMiddleware, columnController.delete);

router.patch('/:boardId/move/:columnId', authMiddleware, columnController.patch);

module.exports = router;
