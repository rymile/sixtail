const CardManageRepository = require('../repository/cardManageRepository.js');

class CardManageService {
  cardManageRepository = new CardManageRepository();

  // 카드관리 생성
  createCard = async (cardName, cardContent, cardWorker, cardDeadline, columnId, userId) => {
    try {
      if (!cardName) return { status: 400, mssage: '카드 이름을 확인해주세요.' };
      else if (!columnId) return { status: 400, message: '컬럼을 먼저 생성 해주세요' };

      const findColumn = await this.cardManageRepository.findgetColumn(columnId);
      if (!findColumn) {
        return { status: 400, message: ' 컬럼이 없습니다.' };
      }

      const cardService = await this.cardManageRepository.createCard(
        cardName,
        cardContent,
        cardWorker,
        cardDeadline,
        columnId,
        userId
      );
      return { status: 200, message: '카드가 생성되었습니다.', cardService };
    } catch (error) {
      console.error(error);
      return { status: 500, massge: '서버오류' };
    }
  };

  // 카드관리 수정
  putCardManage = async (cardName, cardContent, cardWorker, cardDeadline, cardId, userId) => {
    try {
      if (!cardName) return { status: 400, message: '카드 이름을 입력하세요.' };
      if (!userId) return { status: 400, message: '로그인이 필요합니다.' };

      const updatedCard = await this.cardManageRepository.putCardManage(
        cardName,
        cardContent,
        cardWorker,
        cardDeadline,
        cardId
      );
      return { status: 200, message: '카드를 수정하였습니다.', updatedCard };
    } catch (error) {
      console.error(error);
      return { status: 500, message: '서버오류' };
    }
  };

  // 카드관리 삭제
  deleteCardManage = async (cardId, userId) => {
    try {
      if (!cardId) return { status: 400, message: '조회된 카드가 없습니다.' };

      const destroyCard = await this.cardManageRepository.deleteServiceCardManage(cardId, userId);
      return { status: 200, message: '카드를 삭제하였습니다.', destroyCard };
    } catch (error) {
      console.error(error);
      return { status: 500, message: '서버오류' };
    }
  };

  // 카드 이동
  patchCardManage = async (position, userId, columnId, cardId) => {
    try {
      // 컬럼 중복
      // const isPositionDuplicate = await this.columnRepository.checkPositionDuplicate(position);

      // if (isPositionDuplicate) {
      //   return { status: 400, message: '동일한 포지션 번호가 이미 존재합니다.' };
      // }

      if (!position) return { status: 400, message: '이동할 카드가 없습니다.' };
      else if (position) return { status: 400, message: '같은 포지션으로 수정이 불가합니다.' };
      else if (!cardId) return { status: 400, message: '조회된 카드가 없습니다.' };
      else if (!updatedCard) return { status: 400, message: '조회된 유저가 없습니다.' };

      const updatedCard = await this.cardManageRepository.patchServiceCardManage(position, userId, columnId, cardId);

      return { status: 200, message: '컬럼을 이동하였습니다.', updatedColumn };
    } catch (error) {
      console.error(error);
      return { status: 500, message: '서버오류' };
    }
  };
}

module.exports = CardManageService;
