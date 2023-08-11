const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth-middleware');

const ColumnController = require('../controller/columnController.js');
const columnController = new ColumnController();

router.post('/column/:boardId', authMiddleware, columnController.post);

router.put('/column/:columnId', authMiddleware, columnController.put);

router.delete('/column/:columnId', authMiddleware, columnController.delete);

router.patch('/column/:boardId/move/:columnId', authMiddleware, columnController.patch);

module.exports = router;
