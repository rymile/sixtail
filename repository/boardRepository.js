const { Boards, Auths } = require('../models');

class BoardsRepository {
  //생성
  createBoard = async (boardTitle, boardContent, userId) => {
    const createBoardData = await Boards.create({
      boardTitle,
      boardContent,
      userId,
    });
    return createBoardData;
  };

  //수정
  putBoard = async (boardId, boardTitle, boardContent) => {
    const modifyData = await Boards.update(
      // 수정할 데이터 정의
      {
        boardTitle,
        boardContent,
      },
      //수정할 데이터는 boardId로 한번 더 조회하여 해당 boardId일 경우에만 수정을 진행합니다.
      {
        where: {
          boardId,
        },
      }
    );
    return modifyData;
  };

  //삭제
  deleteBoard = async (boardId) => {
    const deletedData = await Boards.destroy({
      where: {
        boardId: boardId,
      },
    });

    return deletedData;
  };

  //보드조회
  getBoard = async (boardId) => {
    const board = await Boards.findOne({ where: { boardId } });
    return board;
  };

  // grantBoardPermission = async (boardId, userId, loginId, authId, creatorUserId) => {
  //   // 보드에 접근 권한을 추가하고 결과를 반환
  //   const permissionData = await Auths.create({
  //     boardId,
  //     userId,
  //     loginId,
  //     authId,
  //     creatorUserId,
  //   });
  //   return permissionData;
  // };

  grantPermissionAndUpdate = async (boardId, userIdToGrant, authId, creatorUserId) => {
    // 보드에 접근 권한을 추가하고 결과를 반환
    const permissionData = await Auths.create({
      boardId,
      userId: userIdToGrant,
      authId: authId,
      creatorUserId,
    });

    // 보드 업데이트 로직 수행
    const updatedBoard = await Boards.update(
      {
        userId: userIdToGrant,
      },
      {
        where: { boardId },
      }
    );

    return {
      permissionData,
      updatedBoard,
    };
  };
}

module.exports = BoardsRepository;
