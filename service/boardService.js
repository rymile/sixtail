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

      return createBoardData;
    } catch (error) {
      throw new ApiError('서버 에러가 발생했습니다.', 411);
    }
  };

  putBoard = async (boardId, boardTitle, boardContent, userId) => {
    try {
      if (!boardContent || !boardTitle) {
        throw new ApiError('보드 제목, 내용, 사용자 ID를 입력해야 합니다.', 411);
      }

      const board = await this.boardsRepository.findBoard(boardId);

      if (!board) {
        throw new ApiError('보드를 찾을 수 없습니다.', 411);
      }
      // if (board.userId !== userId) {
      //   throw new ApiError('보드 수정 권한이 없습니다.', 411);
      // }
      // 레포지토리 로직 수행
      await this.boardsRepository.putBoard(boardId, boardTitle, boardContent);
      return {
        boardId: boardId,
        boardTitle: boardTitle,
        boardContent: boardContent,
        status: 200,
        message: '보드 수정에 성공했습니다.',
      };
    } catch (error) {
      throw new ApiError('캐치에러', 411);
    }
    // 해당하는 postId가 없을 경우 게시글 수정 제한
  };

  // 수정과 동일한 로직
  deleteBoard = async (boardId) => {
    try {
      if (!boardId) {
        throw new ApiError('보드가 생성되지 않았습니다.', 411);
      }
      const deleteData = await this.boardsRepository.deleteBoard(boardId);
      // 레포지토리 로직이 수행되었을 때 deleteDate의 결과값이 1일 경우 게시물의 삭제를 진행
      if (deleteData === 1) {
        return { message: '보드가 삭제되었습니다.' };
      } else {
        throw new ApiError('보드 삭제에 실패했습니다.', 411);
      }
    } catch (error) {
      throw new ApiError('서버 에러가 발생했습니다.', 411);
    }
  };

  findBoard = async (boardId) => {
    try {
      const board = await this.boardsRepository.findBoard(boardId);
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

  grantBoardPermission = async (boardId, creatorUserId, loginId, authId, userId) => {
    // 보드에 권한을 부여하고 결과를 반환하는 레포지토리 메서드 호출
    try {
      const grantedPermission = await this.boardsRepository.addBoardPermission(
        boardId,
        userId,
        loginId,
        authId,
        creatorUserId
      );
      return grantedPermission;
    } catch (error) {
      throw new ApiError(error.message, 409);
    }
  };

  // 새 로직
}

module.exports = BoardsService;
