const express = require('express');
const authMiddleware = require('../middlewares/auth-middleware');
const router = express.Router();

const BoardsController = require('../controller/boardController');
const boardsController = new BoardsController();

router.post('/board', authMiddleware, boardsController.createBoard); // 보드 생성
router.put('/board/:boardId', authMiddleware, boardsController.putBoard); // 보드 수정
router.delete('/board/:boardId', authMiddleware, boardsController.deleteBoard); // 보드 삭제
router.get('/board/:boardId', boardsController.getBoard); // 보드 조회
// router.post('/board/:userId/:boardId', authMiddleware, boardsController.grantBoardPermission); // 보드 권한 부여
router.post('/boardboard/:userId/:boardId', authMiddleware, boardsController.grantPermissionAndUpdate);

module.exports = router;
