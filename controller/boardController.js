const BoardsService = require('../service/boardService');

class BoardsController {
  boardsService = new BoardsService();

  getBoard = async (req, res, next) => {
    // 서비스 로직에서 findAllPost 실행
    const board = await this.boardsService.findAllBoard();
    console.log("=>",board)
    // 조회한 결과값을 결과창에 출력
    res.status(200).json({ data: board });
  };


  //post기능
  createBoard = async (req, res) => {
    const { boardTitle, boardContent } = req.body;
    const createUserId = res.locals.user.userId;

    try {
      await this.boardsService.createBoard(boardTitle, boardContent, createUserId);
      res.status(200).json({ message: '보드 생성에 성공했습니다.' });
    } catch (err) {
      console.log(err);
      return res.status(err.status || 500).json({ message: err.message });
    }
  };

  //put기능
  putBoard = async (req, res) => {
    // boardId를 파라미터로 받아옴
    const { userId } = res.locals.user;
    const { boardId } = req.params;
    // 수정할 내용을 구조분해할당으로 정의
    const { boardTitle, boardContent } = req.body;

    try {
      // 서비스 로직에서 boardId, boardTitle, boardContent를 조회하여 해당 게시글을 수정함
      await this.boardsService.putBoard(boardId, boardTitle, boardContent, userId);
      res.status(200).json({ message: '보드 수정에 성공했습니다.' });
      // 보드 내용이 수정되지 않았을 경우 에러 메시지를 결과로 호출
    } catch (err) {
      console.log(err);
      return res.status(err.status || 500).json({ message: err.message });
    }
  };

  //delete 기능
  // 수정 기능과 동일한 기능을 수행함
  deleteBoard = async (req, res) => {
    const { userId } = res.locals.user;
    const { boardId } = req.params;

    try {
      await this.boardsService.deleteBoard(boardId, userId);
      res.status(200).json({ message: '보드 삭제에 성공했습니다.' });
    } catch (err) {
      console.log(err);
      return res.status(err.status || 500).json({ message: err.message });
    }
  };

  //보드 상세조회
  getBoardAuth = async (req, res) => {
    const { userId } = res.locals.user;
    const { boardId } = req.params;

    try {
      const getboard = await this.boardsService.getBoardAuth(userId, boardId);
      return res.status(200).json({ data: getboard });
    } catch (err) {
      console.log(err);
      return res.status(err.status || 500).json({ message: err.message });
    }
  };

  grantPermission = async (req, res) => {
    const creatorUserId = res.locals.user.userId;
    const { userId } = req.body;
    const { boardId } = req.params;

    try {
      // 권한을 부여하고 결과를 반환하는 서비스 호출
      const grantedPermissionResult = await this.boardsService.grantPermission(boardId, userId, creatorUserId);

      res.status(200).json({ message: '초대에 성공 하였습니다.' });
    } catch (err) {
      console.log(err);
      return res.status(err.status || 500).json({ message: err.message });
    }
  };
}

module.exports = BoardsController;
