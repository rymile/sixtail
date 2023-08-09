const { Boards, Auths } = require('../models');
const { sequelize } = require('../models');

class BoardsRepository {
  //생성
  createBoard = async (boardTitle, boardContent, userId) => {
    try {
      await sequelize.transaction(async (t) => {
        const createBoardData = await Boards.create({
          boardTitle,
          boardContent,
          userId,
          transaction: t,
        });

        const boardId = createBoardData.boardId;
        const authId = userId;

        await Auths.create({
          boardId,
          authId,
          transaction: t,
        });
      });
    } catch (Error) {
      throw Error;
    }
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

  getAuth = async (userId, boardId) => {
    const auth = await Auths.findOne({ where: { authId: userId, boardId: boardId } });
    return auth;
  };

  //보드조회
  getBoardAuth = async (boardId) => {
    const board = await Boards.findOne({ where: { boardId } });
    return board;
  };

  // 보드 권한 설정
  grantPermission = async (boardId, authId) => {
    // 보드에 접근 권한을 추가하고 결과를 반환
    await Auths.create({
      boardId,
      authId,
    });
  };
}

module.exports = BoardsRepository;
