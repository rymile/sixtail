const BoardsRepository = require('../repository/boardRepository');
const ApiError = require('../apierror');

class BoardsService {
  boardsRepository = new BoardsRepository();

  //보드 생성
  createBoard = async (boardTitle, boardContent, userId) => {
    try {
      if (!boardContent || !boardTitle || !userId) {
        throw new ApiError('보드 제목, 내용, 사용자 ID를 입력해야 합니다.', 411);
      }

      const createBoardData = await this.boardsRepository.createBoard(boardTitle, boardContent, userId);

      // const creatorUserId = userId;

      return createBoardData;
    } catch (error) {
      throw new ApiError('서버 에러가 발생했습니다.', 411);
    }
  };

  putBoard = async (boardId, boardTitle, boardContent, userId) => {
    try {
      if (!boardContent || !boardTitle) {
        throw new ApiError('보드 제목, 내용을 입력해야 합니다.', 411);
      }

      const board = await this.boardsRepository.getBoard(boardId);

      if (!board) {
        throw new ApiError('보드를 찾을 수 없습니다.', 411);
      }
      if (board.userId !== userId) {
        throw new ApiError('보드 생성자가 아닙니다.', 411);
      }
      await this.boardsRepository.putBoard(boardId, boardTitle, boardContent);

      return {
        boardId: boardId,
        boardTitle: boardTitle,
        boardContent: boardContent,
        status: 200,
        message: '보드 수정에 성공했습니다.',
      };
    } catch (error) {
      throw new ApiError(error.message, 411);
    }
  };

  // 수정과 동일한 로직
  deleteBoard = async (boardId, userId) => {
    try {
      const board = await this.boardsRepository.getBoard(boardId);

      if (!board) {
        throw new ApiError('보드를 찾을 수 없습니다.', 411);
      }
      if (board.userId !== userId) {
        console.log('board.userId', board.userId);
        console.log('userId', userId);
        throw new ApiError('보드 생성자가 아닙니다.', 411);
      }
      await this.boardsRepository.deleteBoard(boardId);

      return {
        status: 200,
        message: '보드 삭제에 성공했습니다.',
      };
    } catch (error) {
      throw new ApiError(error.message, 411);
    }
  };

  getBoard = async (boardId) => {
    try {
      const board = await this.boardsRepository.getBoard(boardId);
      if (!board) {
        throw new ApiError('보드가 없습니다', 411);
      }
      return {
        status: 200,
        message: '보드 조회 완료',
        board,
      };
    } catch (error) {
      return {
        status: 500,
        message: '보드 조회에 실패했습니다.',
      };
    }
  };

  // grantBoardPermission = async (boardId, userId, loginId, authId, creatorUserId) => {
  //   // 보드에 권한을 부여하고 결과를 반환하는 레포지토리 메서드 호출
  //   try {
  //     const grantedPermission = await this.boardsRepository.grantBoardPermission(
  //       boardId,
  //       userId,
  //       loginId,
  //       authId,
  //       creatorUserId
  //     );
  //     return grantedPermission;
  //   } catch (error) {
  //     throw new ApiError(error.message, 409);
  //   }
  // };

  grantPermissionAndUpdate = async (boardId, userIdToGrant, creatorUserId) => {
    try {
      const board = await this.boardsRepository.getBoard(boardId);

      if (!board) {
        throw new ApiError('보드를 찾을 수 없습니다.', 404);
      }

      if (board.userId !== creatorUserId) {
        throw new ApiError('보드 생성자만 권한을 부여할 수 있습니다.', 403);
      }

      // 권한을 부여하고 결과를 반환하는 레포지토리 메서드 호출
      const grantedPermission = await this.boardsRepository.grantPermissionAndUpdate(
        boardId,
        userIdToGrant,
        creatorUserId
      );

      // 보드를 업데이트한 결과 반환
      return {
        status: 200,
        message: '권한 부여 및 보드 업데이트 완료',
        grantedPermission,
      };
    } catch (error) {
      throw new ApiError(error.message, error.statusCode || 500);
    }
  };
}

module.exports = BoardsService;
