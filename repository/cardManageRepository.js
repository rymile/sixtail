// const { Cards } = require('../models');

// class cardManageRepository {
//   //생성
//   createCard = async (cardName, cardContent, cardWorker, cardDeadline) => {
//     const createCardData = await Cards.create({
//       cardName,
//       cardContent,
//       userId,
//     });
//     return createCardData;
//   };

//   //수정
//   putCard = async (boardId, boardTitle, boardContent) => {
//     const modifyData = await Boards.update(
//       // 수정할 데이터 정의
//       {
//         boardTitle,
//         boardContent,
//       },
//       //수정할 데이터는 boardId로 한번 더 조회하여 해당 boardId일 경우에만 수정을 진행합니다.
//       {
//         where: {
//           boardId,
//         },
//       }
//     );
//     return modifyData;
//   };

//   //삭제
//   deleteCard = async (boardId) => {
//     const deletedData = await Boards.destroy({
//       where: {
//         boardId: boardId,
//       },
//     });

//     return deletedData;
//   };

//   //조회
//   findBoard = async (boardId) => {
//     const board = await Boards.findOne({ where: { boardId } });
//     return board;
//   };

//   addBoardPermission = async (boardId, userId, loginId, authId, creatorUserId) => {
//     // 보드에 접근 권한을 추가하고 결과를 반환
//     const permissionData = await Auths.create({
//       boardId,
//       userId,
//       loginId,
//       authId,
//       creatorUserId, // 보드를 생성한 사용자의 ID를 추가로 저장
//     });
//     return permissionData;
//   };
//   async getBoardPermission(boardId, userId) {
//     const permission = await Auths.findOne({
//       where: { boardId, userId },
//     });
//     return permission;
//   }
// }

// module.exports = cardManageRepository;
