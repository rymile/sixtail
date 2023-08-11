// const CardManageService = require('../service/cardManageService');

// class CardManageController {
//   cardManageService = new CardManageService();

//   //post기능
//   createCardManage = async (req, res, next) => {
//     const { cardName, cardContent } = req.body;
//     const createUserId = res.locals.user.userId;
//     try {
//       const createCardManage = await this.CardManageService.createCardManage(cardName, cardContent, createUserId);
//       res.status(200).json({ data: createCardManage });
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//       next(error);
//     }
//   };

//   //put기능
//   putCardManage = async (req, res, next) => {
//     // cardId를 파라미터로 받아옴
//     const userId = res.locals.user;
//     const { cardId } = req.params;
//     // 수정할 내용을 구조분해할당으로 정의
//     const { cardName, cardContent } = req.body;

//     try {
//       // 서비스 로직에서 cardId, cardName, cardContent를 조회하여 해당 게시글을 수정함
//       const modifyCardManage = await this.cardManageService.putBoard(cardId, cardName, cardContent, userId);
//       res.status(200).json({ data: modifyCardManage });
//       // 보드 내용이 수정되지 않았을 경우 에러 메시지를 결과로 호출
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//       next(error);
//     }
//   };

//   //delete 기능
//   // 수정 기능과 동일한 기능을 수행함
//   deleteCard = async (req, res, next) => {
//     const { cardId } = req.params;

//     try {
//       const deleteCardManage = await this.cardManageService.deleteCardManage(cardId);
//       res.status(200).json({ data: deleteCardManage });
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//       next(error);
//     }
//   };
//   //카드 상세조회
//   getBoard = async (req, res, next) => {
//     const { cardId } = req.params;

//     try {
//       const card = await this.cardManageService.findCardManage(cardId);
//       if (!cardManage) {
//         return res.status(400).json({ message: '카드를 찾을 수 없습니다.' });
//       }
//       res.status(200).json({ data: cardManage });
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//       next(error);
//     }
//   };
// }

// module.exports = CardManageController;
