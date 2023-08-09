const BoardsService = require('../service/boardService');

class BoardsController {
  boardsService = new BoardsService();

  //post기능
  createBoard = async (req, res, next) => {
    const { boardTitle, boardContent } = req.body;
    const createUserId = res.locals.user.userId;

    try {
      const createBoard = await this.boardsService.createBoard(boardTitle, boardContent, createUserId);
      res.status(200).json({ data: createBoard });
    } catch (error) {
      // res.status(400).json({ error: error.message });
      next(error);
    }
  };

  //put기능
  putBoard = async (req, res, next) => {
    // boardId를 파라미터로 받아옴
    const userId = res.locals.user.userId;
    console.log(userId);
    const { boardId } = req.params;
    // 수정할 내용을 구조분해할당으로 정의
    const { boardTitle, boardContent } = req.body;

    try {
      // 서비스 로직에서 boardId, boardTitle, boardContent를 조회하여 해당 게시글을 수정함
      const modifyBoard = await this.boardsService.putBoard(boardId, boardTitle, boardContent, userId);
      res.status(200).json({ data: modifyBoard });
      // 보드 내용이 수정되지 않았을 경우 에러 메시지를 결과로 호출
    } catch (error) {
      // res.status(400).json({ error: error.message });
      next(error);
    }
  };

  //delete 기능
  // 수정 기능과 동일한 기능을 수행함
  deleteBoard = async (req, res, next) => {
    const userId = res.locals.user.userId;
    const { boardId } = req.params;

    try {
      const deleteBoard = await this.boardsService.deleteBoard(boardId, userId);
      res.status(200).json({ data: deleteBoard });
    } catch (error) {
      // res.status(400).json({ error: error.message });
      next(error);
    }
  };

  //보드 상세조회
  getBoard = async (req, res, next) => {
    const { boardId } = req.params;

    try {
      const board = await this.boardsService.getBoard(boardId);
      if (!board) {
        return res.status(400).json({ message: '보드를 찾을 수 없습니다.' });
      }
      res.status(200).json({ data: board });
    } catch (error) {
      // res.status(500).json({ error: error.message });
      next(error);
    }
  };

  // grantBoardPermission = async (req, res, next) => {
  //   const { userId, boardId } = req.params;
  //   const { loginId, authId } = req.body;
  //   const creatorUserId = res.locals.user.userId;
  //   console.log(creatorUserId);

  //   try {
  //     // 보드에 권한을 부여하는 서비스 호출
  //     const grantedPermission = await this.boardsService.grantBoardPermission(
  //       boardId,
  //       userId,
  //       loginId,
  //       authId,
  //       creatorUserId
  //     );

  //     res.status(201).json({ data: grantedPermission });
  //   } catch (error) {
  //     // res.status(400).json({ error: error.message });
  //     next(error);
  //   }
  // };

  grantPermissionAndUpdate = async (req, res, next) => {
    const creatorUserId = res.locals.user.userId;
    const { userId, boardId } = req.params;

    try {
      // 권한을 부여하고 결과를 반환하는 서비스 호출
      const grantedPermissionResult = await this.boardsService.grantPermissionAndUpdate(boardId, userId, creatorUserId);

      res.status(grantedPermissionResult.status).json({ data: grantedPermissionResult });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = BoardsController;
