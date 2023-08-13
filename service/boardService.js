const BoardsRepository = require('../repository/boardRepository');
const ApiError = require('../apierror');

class BoardsService {
  boardsRepository = new BoardsRepository();

  // 보드 조회
  findAllBoard = async () => {
    const allBoard = await this.boardsRepository.findAllBoard();

    // 조회 후 생성날짜(createdAt)을 기준으로 정렬함
    // sort((a,b) => b - a)
    allBoard.sort((a, b) => {
      return b.createdAt - a.createdAt;
    });

    // 조회한 결과에서 다음의 변수들을 반복해서 조회한다.
    return allBoard.map((board) => {
      return {
        boardTitle: board.boardTitle, // postId: 게시글의 postId
        boardContent: board.boardContent, // title: 게시글의 title
      };
    });
  };

  //보드 생성
  createBoard = async (boardTitle, boardContent, userId) => {
    
    if (!boardContent || !boardTitle || !userId) {
      throw new ApiError('보드 제목, 내용, 사용자 ID를 입력해야 합니다.', 411);
    }

    await this.boardsRepository.createBoard(boardTitle, boardContent, userId);
  };

  putBoard = async (boardId, boardTitle, boardContent, userId) => {
    if (!boardContent || !boardTitle) {
      throw new ApiError('보드 제목, 내용을 입력해야 합니다.', 411);
    }

    const auth = await this.boardsRepository.getAuth(userId, boardId);
    if (!auth) {
      throw new ApiError('보드를 수정할 권한이 없습니다.', 411);
    }

    await this.boardsRepository.putBoard(boardId, boardTitle, boardContent);
  };

  // 수정과 동일한 로직
  deleteBoard = async (boardId, userId) => {
    const board = await this.boardsRepository.getBoardAuth(boardId);
    if (!board) {
      throw new ApiError('보드를 찾을 수 없습니다.', 411);
    }

    if (board.userId !== userId) {
      throw new ApiError('보드 생성자가 아닙니다.', 411);
    }
    await this.boardsRepository.deleteBoard(boardId);
  };

  getBoardAuth = async (userId, boardId) => {
    const auth = await this.boardsRepository.getAuth(userId, boardId);
    if (!auth) {
      throw new ApiError('보드를 조회할 권한이 없습니다.', 411);
    }
    const board = await this.boardsRepository.getBoardAuth(boardId);
    if (!board) {
      throw new ApiError('보드가 없습니다', 411);
    }
    return board;
  };

  grantPermission = async (boardId, userId, creatorUserId) => {
    const board = await this.boardsRepository.getBoardAuth(boardId);

    if (!board) {
      throw new ApiError('보드를 찾을 수 없습니다.', 404);
    }

    if (board.userId !== creatorUserId) {
      throw new ApiError('보드 생성자만 권한을 부여할 수 있습니다.', 403);
    }

    // 권한을 부여하고 결과를 반환하는 레포지토리 메서드 호출
    const authId = userId;
    await this.boardsRepository.grantPermission(boardId, authId);
  };
}
module.exports = BoardsService;
