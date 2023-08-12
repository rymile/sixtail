const { CardManages, sequelize } = require('../models');

class cardManageRepository {
  findgetColumn = async (columnId) => {
    const findcolumn = await CardManages.findAll({ where: { columnId } });
    return findcolumn;
  };

  //생성
  createCard = async (cardName, cardContent, cardWorker, cardDeadline, columnId, userId) => {
    const createCard = await CardManages.create({
      cardName,
      cardContent,
      cardWorker,
      cardDeadline,
      columnId,
      userId,
    });
    return createCard;
  };

  //수정
  putCardManage = async (cardName, cardContent, cardWorker, cardDeadline, cardId, userId) => {
    const t = await sequelize.transaction();

    try {
      const updatedCard = await CardManages.update(
        {
          cardName,
          cardContent,
          cardWorker,
          cardDeadline,
        },
        {
          where: { cardId },
          transaction: t,
        }
      );

      await t.commit();
      return updatedCard;
    } catch (error) {
      await t.rollback();
      throw error;
    }
  };

  //삭제
  deleteServiceCardManage = async (cardId) => {
    const deletedData = await CardManages.destroy({
      where: {
        cardId: { cardId },
      },
    });

    return deletedData;
  };

  //조회
  findBoard = async (cardId) => {
    const card = await CardManages.findOne({ where: { cardId } });
    return card;
  };

  //카드 이동
  patchServiceCardManage = async (position, userId, columnId, cardId) => {
    const transaction = await Columns.sequelize.transaction();
    try {
      const cards = await CardManages.findAll({ where: { cardId } });
      for (let i = 0; i < cards.length - 1; i++) {
        const tempPosition = cards[i].position;
        cards[i].position = cards[i + 1].position;
        cards[i + 1].position = tempPosition;

        await cards[i].save();
        await cards[i + 1].save();
      }

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  };
}
module.exports = cardManageRepository;
