const express = require('express');
const authMiddleware = require('../middlewares/auth-middleware');
const router = express.Router();

const CardCmtsController = require('../controller/cardCmtController');
const cardCmtsController = new CardCmtsController();

router.post('/:cardId', authMiddleware, cardCmtsController.postCmt);
router.get('/:cardId', cardCmtsController.getCmt);
router.put('/:cmtId', authMiddleware, cardCmtsController.updateCmt);
router.delete('/:cmtId', cardCmtsController.deleteCmt);

module.exports = router;
