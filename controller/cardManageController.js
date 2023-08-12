const CardManageService = require('../service/cardManageService');

class CardManageController {
  cardManageService = new CardManageService();

  createCard = async (req, res, next) => {
    const { cardName, cardContent, cardWorker, cardDeadline } = req.body;
    const { columnId } = req.params;
    const userId = res.locals.user;

    const { status, message } = await this.cardManageService.createCard(
      cardName,
      cardContent,
      cardWorker,
      cardDeadline,
      columnId,
      userId
    );

    res.status(status).json(message);
  };

  //put기능
  putCardManage = async (req, res, next) => {
    const { cardName, cardContent, cardWorker, cardDeadline } = req.body;
    const userId = res.locals.user;
    const { cardId } = req.params;

    const { status, message } = await this.cardManageService.putCardManage(
      cardName,
      cardContent,
      cardWorker,
      cardDeadline,
      cardId,
      userId
    );

    res.status(status).json(message);
  };

  //delete 기능
  // 수정 기능과 동일한 기능을 수행함
  deleteCard = async (req, res, next) => {
    const { cardId } = req.params;

    const userId = res.locals.user;

    try {
      const deleteCardManage = await this.cardManageService.deleteCardManage(cardId, userId);
      res.status(200).json({ data: deleteCardManage });
    } catch (error) {
      res.status(500).json({ error: error.message });
      next(error);
    }
  };
  //카드 상세조회
  getBoard = async (req, res, next) => {
    const { cardId } = req.params;

    try {
      const card = await this.cardManageService.findCardManage(cardId);
      if (!cardManage) {
        return res.status(400).json({ message: '카드를 찾을 수 없습니다.' });
      }
      res.status(200).json({ data: cardManage });
    } catch (error) {
      res.status(500).json({ error: error.message });
      next(error);
    }
  };

  // 카드 이동
  patch = async (req, res, next) => {
    const { position } = req.body;

    const userId = res.locals.user;

    const { columnId, cardId } = req.params;

    const { status, message } = await this.columnService.patchCardManage(position, userId, columnId, cardId);

    res.status(status).json(message);
  };
}

module.exports = CardManageController;
