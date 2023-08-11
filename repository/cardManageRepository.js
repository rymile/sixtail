// const { Cards } = require('../models');

// class cardManageRepository {
//   //생성
//   createCardManage = async (cardName, cardContent, cardWorker, cardDeadline) => {
//     const createCardData = await Cards.create({
//       cardName,
//       cardContent,
//       cardWorker,
//       cardDeadline,
//       userId,
//     });
//     return createCardData;
//   };

//   //수정
//   putCard = async (cardId, cardName, cardContent, cardWorker, cardDeadline) => {
//     const modifyData = await Cards.update(
//       // 수정할 데이터 정의
//       {
//         cardName,
//         cardContent,
//         cardWorker,
//         cardDeadline,
//       },
//       //수정할 데이터는 cardId로 한번 더 조회하여 해당 cardId일 경우에만 수정을 진행합니다.
//       {
//         where: {
//           cardId,
//         },
//       }
//     );
//     return modifyData;
//   };

//   //삭제
//   deleteCard = async (cardId) => {
//     const deletedData = await Cards.destroy({
//       where: {
//         cardId: cardId,
//       },
//     });

//     return deletedData;
//   };

//   //조회
//   findBoard = async (cardId) => {
//     const card = await Cards.findOne({ where: { cardId } });
//     return card;
//   };
// }

// module.exports = cardManageRepository;
