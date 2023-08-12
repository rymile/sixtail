const express = require('express');
const authMiddleware = require('../middlewares/auth-middleware');
const router = express.Router();

const CardManagesController = require('../controller/cardManageController');
const cardManagesController = new CardManagesController();

router.post('/:columnId', cardManagesController.createCard);
// router.get('/cardManage/:cardId', authMiddleware, cardManagesController.getCardManage);
router.put('/:cardId', authMiddleware, cardManagesController.putCardManage);
router.delete('/:cardId', authMiddleware, cardManagesController.deleteCard);

module.exports = router;
